import { displayRandomLetters } from "./textFromApi.js";
import { minimumLinesOfText, maximumLinesOfText, startButton, } from './variables.js';
import { startTimer } from "./timer.js";

document.addEventListener('DOMContentLoaded', async () => {
    async function displayRandom() {
        let text = await displayRandomLetters(minimumLinesOfText, maximumLinesOfText);
        return text;
    }

    await displayRandom();
});



// Add event listener to the startButton
startButton.addEventListener("click", startTimer);
