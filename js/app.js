/*
 * Get the Entered name
 */

 let name = document.getElementById('game-name');
 let submitButton = document.getElementById('submit');
 let welcomeContainer = document.getElementById('welcome');
 let gameContainer = document.getElementById('game');



 function submitName() {
   welcomeContainer.style.display = "none";
   gameContainer.style.display = "flex";
   let welcomeContent = document.getElementsByClassName("welcomeName")[0];
   welcomeContent.textContent = "Welcome, " + name.value ;
 };

/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cardList = [...card];

/*
 * Varibles to hold deck,moves,time etc
 */
let deck = document.getElementsByClassName('deck')[0];
let moves = document.getElementsByClassName('moves')[0]
let openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(){
  //Shuffle cards
  cardList = shuffle(cardList);
  deck.innerHTML = "";
  moves.value = 0;
  for(let card of cardList){
      //Clear deck
      card.classList.remove("show","open","matched");
      deck.appendChild(card)
  }
}

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


window.onload = displayCards();

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

 deck.addEventListener("click", function(event){
   if(event.target.type != "deck"){
     showCard(event);
     clickedCard(event);
   }
 });

 //Display card's symbol when clicked
 function showCard(event){
    event.target.classList.add("open","show");
 }

 //Store openCards to array
 function clickedCard(event){
   openCards.push(event.target);
   if(openCards.length === 2){
     if(openCards[0].children[0].classList.value === openCards[1].children[0].classList.value){
               cardsMatched();
           } else {
               cardsUnmatched();
           }
     }
 }

 //Lock the cards for matched cardsMatched
 function cardsMatched(){
   openCards[0].classList.add("match","locked");
   openCards[1].classList.add("match","locked");
   openCards = [];
 }

 //Lock the cards for matched cardsMatched
 function cardsUnmatched(){
   openCards[0].classList.remove("show", "open");
   openCards[1].classList.remove("show", "open");
   openCards = [];
 }
