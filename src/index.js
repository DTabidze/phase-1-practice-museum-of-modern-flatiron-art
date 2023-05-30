console.log('Write your code here');

document.addEventListener('DOMContentLoaded', () => {
    const URL = 'http://localhost:3000/current-exhibits'
    fetch (URL)
    .then (response => response.json()
    .then (exhibitElement => showExhibitElement(exhibitElement))
    )
})

function showExhibitElement (exhibitElement) {
    console.log (exhibitElement[0]);
    console.log (typeof(exhibitElement));
    const artistName = document.querySelector("h3");
    const main = document.querySelector("main.two-columns")
    const divMain = main.querySelector("div");
    console.log(artistName);
    artistName.textContent += ' ' + exhibitElement[0]['artist_name'];
    //divMain.appendChild(artistName);
    const exhibitTitle = document.querySelector('h2#exhibit-title');
    exhibitTitle.textContent = `Current Exhibit Title: ${exhibitElement[0]['title']}`

    const ticketSold = document.querySelector("p#tickets-bought");
    ticketSold.textContent = `${exhibitElement[0]['tickets_bought']} Tickets Bought`

    const exhibitDescription = document.querySelector("p#exhibit-description");
    exhibitDescription.textContent = `${exhibitElement[0]["description"]}`;

    const commentArray = exhibitElement[0].comments;
    const commentsDiv = document.querySelector('div#comments-section');
    console.log(commentArray);
    for (let i=0; i<commentArray.length;i++) {   
        const pTagComments = document.createElement("p");
        pTagComments.textContent = commentArray[i];
        commentsDiv.appendChild(pTagComments);
    }

    const exhibitImg = document.querySelector("img#exhibit-image");
    exhibitImg.src = exhibitElement[0]["image"];

    const buyTicketsBtn = document.querySelector("button#buy-tickets-button");
    buyTicketsBtn.addEventListener ('click', event => incSoldTickets (event,exhibitElement[0]));

    const addCommentForm = document.querySelector("form#comment-form");
    addCommentForm.addEventListener('submit',event => addComment(event,exhibitElement[0]));

}

function incSoldTickets (event,element) {
    //console.log (element['tickets_bought'],typeof(element['tickets_bought']))
    const soldTickets = +event.target.nextElementSibling.textContent.split(' ')[0] + 1           //element['tickets_bought'] + 1;
    const soldTicketsUpdate = event.target.nextElementSibling;

    //const tickets = parseInt(soldTickets.textContent.split(' ')[0]);
    console.log(soldTickets,soldTicketsUpdate);
    console.log(event.target)
    console.log(element);
    const updatedTickets = {tickets_bought: soldTickets}
    const URL = `http://localhost:3000/current-exhibits/${element.id}`;
    fetch (URL, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(updatedTickets)
    })
    .then (response => response.json())
    .then (updatedExhib => soldTicketsUpdate.textContent = `${soldTickets} Tickets Bought`)
    .catch (error => alert(error.massage))
}

function addComment (event,element) {
    event.preventDefault();
    //console.log(element);
    const currentComment = event.target.elements['comment-input'].value;   //access input text value inside submit form
    const comment = document.createElement('p');
    comment.textContent = currentComment;
    document.querySelector('div#comments-section').appendChild(comment);
    const updatedComment = element['comments'];
    updatedComment.push(currentComment);
    console.log (element);
    const updateData = {"comments":updatedComment}
    const URL = `http://localhost:3000/current-exhibits/${element.id}`;
    fetch (URL, {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(updateData)
    })
    .then (response => response.json())
    .then (data => event.target.elements['comment-input'].value = '')
    .catch (error => alert(error.massage))


    // console.log(event.target);
    // console.log(currentComment);
}