import { displayRandomLines } from "./textFromApi.js";
import { minimumLinesOfText, maximumLinesOfText } from './variables.js';
import { startTimer, resetTimer } from "./timer.js";
import { InputLetters } from "./input.js";

async function displayText() {
    const text = await displayRandomLines(minimumLinesOfText, maximumLinesOfText);
    return text;
}

async function resetEverything() {
    resetTimer();
    document.getElementById("inputArea").value = "";
    await displayText();
}

document.addEventListener("DOMContentLoaded", () => {
    // Event listener to start timer when click on input area
    document.querySelector('#inputArea').addEventListener("focus", startTimer);

    // Event listener for the reset button
    document.getElementById("resetButton").addEventListener("click", resetEverything);

    // Call InputLetters to initialize input recognition
    InputLetters();

    // Display initial text
    displayText();
});
