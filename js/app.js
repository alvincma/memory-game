/*
 * Create a list that holds all of your cards
 */

// Initialize a deck of cards
let cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt',
             'cube', 'anchor', 'leaf', 'bicycle',
             'diamond', 'bomb', 'leaf', 'bomb',
             'bolt', 'bicycle', 'paper-plane-o', 'cube'];

// Initialize a list of "opened" cards to empty list;
let openCards = [];
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Start a new Game
startNewGame();

// Hook up restart listener
const restart = document.querySelector('.restart');
restart.addEventListener('click', startNewGame);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// New game function:
// 1. Shuffle the cards
// 2. Clean up the open cards list
// 3. Loop through each cards and creates its HTML
// 4. Attach the cards' HTML to page
function startNewGame() {
    const gameCards = shuffle(cards);
    // Reset game stats
    openCards = [];
    moves = 0;
    document.querySelector('.moves').textContent = moves;
    const starList = document.querySelectorAll('.stars li i');
    for (let i = 0; i < starList.length; i++) {
        if (starList[i].classList.contains('fa-star-o')) {
            starList[i].classList.replace('fa-star-o', 'fa-star');
        }
    }
    // HTML manipulation
    const deck = document.querySelector('.deck');
    // Remove existing gameCards
    while (deck.hasChildNodes()) {
        deck.removeChild(deck.firstChild);
    }
    const fragment = document.createDocumentFragment();
    for (gameCard of gameCards) {
        const icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-' + gameCard);
        const card = document.createElement('li');
        card.classList.add('card');
        // card.classList.add('open');
        // card.classList.add('show');
        card.appendChild(icon);
        fragment.appendChild(card);
    }
    deck.appendChild(fragment);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
