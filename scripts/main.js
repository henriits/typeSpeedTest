import { displayRandomLetters } from "./textFromApi.js";
import { minimumLinesOfText, maximumLinesOfText} from './variables.js';
import { updateTimer } from "./timer.js";

document.addEventListener('DOMContentLoaded', async () => {
    async function displayRandom() {
        let text = await displayRandomLetters(minimumLinesOfText, maximumLinesOfText);
        return text;
    }

    await displayRandom();

    async function startTimer(){
        setInterval(updateTimer, 1000);
    }

    startTimer()



});