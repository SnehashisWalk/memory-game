const cards = document.querySelectorAll(".memory-card");

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", function () {
  cards.forEach((card) => {
    card.classList.remove("img-blur");
    card.addEventListener("click", flipCard);
  });
    shuffle();
  startGame = true;
  startBtn.setAttribute("disabled", true);
});

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", function () {
  shuffle();
  resetBtn.setAttribute("disabled", true);
  startBtn.removeAttribute("disabled");
});

const closeBtn = document.querySelector("#close-btn");
closeBtn.addEventListener("click", handleCloseButton);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let startGame = false;
let gameCounter = 0;

function flipCard() {
  console.log(1);
  if (!startGame) return;
  console.log(2);
  if (lockBoard) return;
  console.log(3);
  if (this === firstCard) return;
  console.log(4);
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click

  secondCard = this;

  //do cards match
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.brand === secondCard.dataset.brand;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  gameCounter++;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  if (gameCounter === 6) {
    gameCounter = 0;
    endGame();
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
    lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

//IIFE(Immediately Invoked Function Expression)

(function cardsBlurred() {
  document.querySelector("#reset-btn").setAttribute("disabled", true);
  cards.forEach((card) => {
    card.classList.add("img-blur");
  });
})();

// (function shuffle() {
//   cards.forEach((card) => {
//     card.classList.add("img-blur");
//     let randomPos = Math.floor(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// })();

function endGame() {
  let modalBg = document.querySelector(".modal-bg");
  setTimeout(() => {
    modalBg.classList.add("bg-active");
  }, 1000);
}

function handleCloseButton() {
  document.querySelector("#reset-btn").removeAttribute("disabled");
  let modalBg = document.querySelector(".modal-bg");
  modalBg.classList.remove("bg-active");
  cards.forEach((card) => {
    card.classList.add("img-blur");
    card.classList.toggle("flip");
  });
  resetBoard();
}

(function onStart() {
  let flipper = 0;
  setInterval(() => {
    flipper === 0
      ? ((document.querySelector(".game-title").style.cssText += "color:white"),
        (flipper = 1))
      : ((document.querySelector(".game-title").style.cssText +=
          "color:#0575e6"),
        (flipper = 0));
  }, 300);
})();
