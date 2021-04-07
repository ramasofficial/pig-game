'use strict';

// Players scores
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');
// Players current scores
const currentScorePlayer0El = document.querySelector('#current--0');
const currentScorePlayer1El = document.querySelector('#current--1');
// Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Dice
const dice = document.querySelector('.dice');
// Buttons: new, hold, roll
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

// Define variables
const winScore = 30;
let currentPlayer, currentScore, totalScore, playing;

// Start the new game
const initGame = function () {
  currentScore = 0;
  currentPlayer = 0;
  totalScore = [0, 0];
  playing = true;

  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  currentScorePlayer0El.textContent = 0;
  currentScorePlayer1El.textContent = 0;

  dice.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initGame();

// Click new game button
btnNew.addEventListener('click', initGame);

const resetScore = function () {
  currentScore = 0;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    totalScore[currentPlayer];
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
};

// Switch player
const switchPlayer = function () {
  resetScore();
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentPlayer = currentPlayer == 0 ? 1 : 0;
};

// Click hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[currentPlayer] += currentScore;

    if (totalScore[currentPlayer] >= winScore) {
      resetScore();
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// Click roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    let random = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${random}.png`;

    // Show dice
    dice.classList.remove('hidden');

    if (random == 1) {
      totalScore[currentPlayer] = 0;
      switchPlayer();
    } else {
      // Add dice to current player
      currentScore += random;
      document.querySelector(
        `#current--${currentPlayer}`
      ).textContent = currentScore;
    }
  }
});
