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
let matches = 0;
let ratings = 3;

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
    matches = 0;
    ratings = 3;
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
        card.setAttribute('data-card-type', gameCard);
        card.appendChild(icon);
        card.addEventListener('click', openCard);
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
function openCard(event) {
    // Check if the card is already opened or matched
    let card = null;
    if (event.target.nodeName === 'LI') {
        card = event.target;
    } else {
        card = event.target.parentNode;
    }
    if (card.classList.contains('match') || card.classList.contains('open')) {
        return;
    }
    showCard(card);
    addToOpenCards(card);
    checkMatchCards();
    checkWin();
}

function showCard(card) {
    card.classList.add('open', 'show');
}

function addToOpenCards(card) {
    // Sanity check, the open cards should be less than
    if (openCards.length > 2) {
        return;
    }
    openCards.push(card);
}

function checkMatchCards() {
    if (openCards.length !== 2) {
        // First card added to open cards, no need to check
        return;
    }

    // Increase move counts
    document.querySelector('.moves').textContent = ++moves;

    // Check if opened cards match
    if (openCards[0].getAttribute('data-card-type') === openCards[1].getAttribute('data-card-type')) {
        lockCards();
    } else {
        removeAndHideCards()
    }

    // Change star ratings
    changeStarRatings();
}

function lockCards() {
    // Change the style of card to match
    for (let i = 0; i < openCards.length; i++) {
        // Remove previous style
        openCards[i].classList.remove('open', 'show');
        openCards[i].classList.add('match');
        openCards[i].classList.add('same-icon');
    }
    matches++;
    setTimeout(function() {
        for (let j = 0; j < openCards.length; j++) {
            openCards[j].classList.remove('same-icon');
        }
        openCards.pop();
        openCards.pop();
    }, 1000);
}

function removeAndHideCards() {
    // Change the style of card to mismatch
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].style.background = 'orange';
        openCards[i].classList.add('different-icon');
        // Remove previous style
    }
    setTimeout(function() {
        for (let j = 0; j < openCards.length; j++) {
            openCards[j].classList.remove('open', 'show', 'different-icon');
            // Restore default background of the card
            openCards[j].style.background = '';
        }
        openCards.pop();
        openCards.pop();
    }, 1000);
}

/*
 * Use simple algorithm to change the star ratings.
 *
 * 8 - 12 moves: 3 stars
 * 13 - 20 moves: 2 stars
 * 20 and above: 1 star
 */
function changeStarRatings() {
    if (moves >= 13 && moves <= 20 && ratings === 3) {
        // Reduce to 2 stars
        ratings = 2;
        displayStars(ratings);
    } else if (moves >= 20 && ratings === 2) {
        // Reduce to 1 star
        ratings = 1;
        displayStars(ratings);
    }
}

function displayStars(ratings) {
    const starList = document.querySelectorAll('.stars li i');
    for (let i = 0; i < starList.length; i++) {
        if (i >= ratings) {
            if (starList[i].classList.contains('fa-star')) {
                starList[i].classList.replace('fa-star', 'fa-star-o');
            }
        }
    }
}

function checkWin() {
    if (matches === 8) {
        setTimeout(displayCongrat, 500);
    }
}

function displayCongrat() {
    alert('Congratulations! You\'ve won the game!');
}
