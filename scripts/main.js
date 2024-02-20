import { displayRandomLines } from "./textFromApi.js";
import { minimumLinesOfText, maximumLinesOfText, startButton, } from './variables.js';
import { startTimer } from "./timer.js";
import { InputLetters } from "./input.js";

document.addEventListener('DOMContentLoaded', async () => {
    async function displayText() {
        let text = await displayRandomLines(minimumLinesOfText, maximumLinesOfText);
        return text;
    }

    await displayText();
});



//event listener to the startButton
startButton.addEventListener("click", startTimer);
//event listener to start timer when click on input area, later maybe improve to only start once typing..
document.querySelector('#inputArea').addEventListener("focus", startTimer);

//this needs calling, for input to be recognized
InputLetters();