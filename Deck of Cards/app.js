// ****************************
// Promises
// ****************************

let CARDS_API_URL = "https://deckofcardsapi.com/api/deck";
/*
// 1. request a single card from a newly shuffled deck
$.get(`${CARDS_API_URL}/new/shuffle/?deck_count=1`).then(resp => {
    $.get(`${CARDS_API_URL}/${resp.deck_id}/draw/?count=1`).then(response => {
        //console.log(response);
        console.log(`${response.cards[0].value} OF ${response.cards[0].suit}`);
        console.log("-----------");
    });
});


// 2. Get 2 from a newly shuffled deck. 
$.get(`${CARDS_API_URL}/new/shuffle/?deck_count=1`).then(resp => {
    $.get(`${CARDS_API_URL}/${resp.deck_id}/draw/?count=1`).then(response => {
        console.log(response.remaining);
        console.log(`${response.cards[0].value} OF ${response.cards[0].suit}`)
    });
    $.get(`${CARDS_API_URL}/${resp.deck_id}/draw/?count=1`).then(response => {
        console.log(`${response.cards[0].value} OF ${response.cards[0].suit}`)
        console.log(response.remaining);
    });
});
*/

// 3. get 4 facts on your favorite number. 
const cards = document.getElementById("cards");
let deck_id = ""

$.get(`${CARDS_API_URL}/new/shuffle/?deck_count=1`).then(resp => {
    deck_id = resp.deck_id;
    $("#btnCard").removeClass("disabled");
});


$(document).on("click", "#btnCard", giveCard);

function giveCard() {
    $.get(`${CARDS_API_URL}/${deck_id}/draw/?count=1`).then(response => {
        
        let alt = `${response.cards[0].value} OF ${response.cards[0].suit}`
        createImage(response.cards[0].image, alt)
        if ( response.remaining == 0 ){
            $("#btnCard").hide();
        }
    });
}

function createImage(url, alt){
    const image = document.createElement("img");
    image.setAttribute("src", url);
    image.setAttribute("alt", alt);

    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 30 - 15;
    let randomY = Math.random() * 30 - 15;
    image.style.transform = 'translateX('+randomX+'px) rotate(' + angle + 'deg) translateY('+randomY+'px)';

    cards.appendChild(image);
}
