"use strict"

// Selecting elements
const player0Element = getElementByClass(".player--0")
const player1Element = getElementByClass(".player--1")

const diceElement = getElementByClass(".dice")
const newGameButton = getElementByClass(".btn--new")
const rollDiceButton = getElementByClass(".btn--roll")
const holdButton = getElementByClass(".btn--hold")

// State variables
const scores = [0, 0]
let currentScore = 0
let activePlayer = 0 // Should only be 0 or 1
let isGameActive = true

const clickListenerType = "click"

// Register click listeners
holdButton.addEventListener(clickListenerType, holdGame)
newGameButton.addEventListener(clickListenerType, initializeGame)
rollDiceButton.addEventListener(clickListenerType, rollDice)

initializeGame()

function initializeGame() {

	hideDice()

	resetTotalScores()
	resetCurrentScores()

	// Reset the player who won (=== active player)
	getElementByClass(`.player--${activePlayer}`).classList.remove("player--winner")

	resetActivePlayer()

	// Activate the game
	isGameActive = true

}

// Switch player functionality
function switchPlayer() {

	// Reset the current score
	currentScore = 0
	getElementById(`current--${activePlayer}`).textContent = currentScore.toString()

	// Toggle the active player
	player0Element.classList.toggle("player--active")
	player1Element.classList.toggle("player--active")
	activePlayer = activePlayer === 0 ? 1 : 0

}

function resetTotalScores() {

	const allTotalPlayerScores = getAllElementsByClass(".score")

	allTotalPlayerScores.forEach((value, key) => {

		value.textContent = "0"
		scores[key] = 0

	})

}

function resetCurrentScores() {

	const allCurrentPlayerScores = getAllElementsByClass(".current-score")
	allCurrentPlayerScores.forEach(value => value.textContent = "0")
	currentScore = 0

}

function resetActivePlayer() {

	activePlayer = 0
	player0Element.classList.add("player--active")
	player1Element.classList.remove("player--active")

}

function holdGame() {

	if (isGameActive) {

		// Add current score to active player's score
		scores[activePlayer] += currentScore
		getElementById(`score--${activePlayer}`).textContent = scores[activePlayer].toString()

		// Check if player's score is >= 100 and finish the game
		if (scores[activePlayer] >= 100) {

			isGameActive = false
			getElementByClass(`.player--${activePlayer}`).classList.add("player--winner")
			getElementByClass(`.player--${activePlayer}`).classList.remove("player--active")

			hideDice()

		} else {

			switchPlayer()

		}

	}

}

function rollDice() {

	if (isGameActive) {

		// Generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1

		// Display dice
		diceElement.classList.remove("hidden")
		diceElement.src = `assets/images/dice-${dice}.png`

		// Check for rolled 1: if true, switch to next player
		if (dice !== 1) {

			// Add dice to the current score
			currentScore += dice
			getElementById(`current--${activePlayer}`).textContent = currentScore

		} else {

			switchPlayer()

		}

	}

}

// Cleanup functions
function getAllElementsByClass(elementClass) {

	return document.querySelectorAll(elementClass)

}

function getElementById(elementId) {

	return document.getElementById(elementId)

}

function getElementByClass(elementClass) {

	return document.querySelector(elementClass)

}

function hideDice() {

	diceElement.classList.add("hidden")

}
