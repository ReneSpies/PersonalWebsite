"use strict"

let secretNumber = getRandomNumber()
let score = 20
let highScore = 0

document.querySelector(".check").addEventListener("click", check)
document.querySelector(".again").addEventListener("click", playAgain)

function check() {

	const guess = Number(document.querySelector(".guess").value)

	if (!guess) { // When there is no input

		setTextContent(".message", "⛔ No number")

	} else if (guess === secretNumber) { // When the player wins

		setTextContent(".message", "🎉 Correct Number")
		setTextContent(".number", secretNumber.toString())
		setBackgroundColor("body", "#60b347")
		setWidth(".number", "30rem")

		if (score > highScore) {

			highScore = score
			setTextContent(".high-score", highScore)

		}

	} else if (guess !== secretNumber) { // When the guess is wrong

		if (score > 1) {

			setTextContent(".message", guess > secretNumber ? "📈 Too High!" : "📉 Too Low!")
			score--
			setTextContent(".score", score.toString())

		} else {

			setTextContent(".message", "💥 You lost!")
			setTextContent(".score", "0")
		}

	}

}

function playAgain() {

	score = 20
	secretNumber = getRandomNumber()

	setTextContent(".message", "Start guessing...")
	setTextContent(".score", score.toString())
	setTextContent(".number", "?")
	document.querySelector(".guess").value = ""
	setBackgroundColor("body", "#222")
	setWidth(".number", "15rem")

}

function setTextContent(element, message) {

	document.querySelector(element).textContent = message

}

function setBackgroundColor(element, color) {

	document.querySelector(element).style.backgroundColor = color

}

function setWidth(element, width) {

	document.querySelector(element).style.width = width

}

function getRandomNumber() {

	return Math.trunc(Math.random() * 20) + 1

}