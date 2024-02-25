import { displayRandomLines } from "./textFromApi.js";
import { minimumLinesOfText, maximumLinesOfText } from './variables.js';
import { startTimer, resetTimer } from "./timer.js";
import { InputData } from "./input.js";

async function displayText() {
    const text = await displayRandomLines(minimumLinesOfText, maximumLinesOfText);
    return text;
}


async function resetEverything() {
    resetTimer();
    document.getElementById("inputArea").value = ""; // Clear the textarea
    await displayText(); // Fetch and display new text
    document.getElementById("inputArea").focus(); // Focus on the textarea

    // Reattach the event listener to start the timer on key press
    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);
}

async function restartWithCurrentText() {
    resetTimer();
    document.getElementById("inputArea").value = ""; // Clear the textarea
    document.getElementById("inputArea").focus(); // Focus on the textarea

    // Remove .letter classes from all elements
    let letters = document.querySelectorAll(".letter");
    letters.forEach(letter => {
        letter.classList.remove("correct");
        letter.classList.remove("false");
        letter.classList.remove("current")
        letter.style.backgroundColor = "";
    });

    // Reattach the event listener to start the timer on key press
    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);
}



// Event listener to start timer only on the first key press in the input area
function startTimerOnFirstKeyPress() {
    startTimer();
    document.getElementById("inputArea").removeEventListener("input", startTimerOnFirstKeyPress);
}

document.addEventListener("DOMContentLoaded", () => {
    // Focus on the input area when the DOM content is loaded
    document.getElementById("inputArea").focus();

    // Event listener to start timer when any key is pressed in the input area
    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);

    // Event listener for the reset button
    document.getElementById("resetButton").addEventListener("click", resetEverything);
    document.getElementById("restartButton").addEventListener("click", restartWithCurrentText);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            restartWithCurrentText();
        }
        else if (event.key === "Escape") {
            resetEverything();
        }
    });
    InputData();

    // Display initial text
    displayText();
});
