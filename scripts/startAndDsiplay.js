import { displayRandomLines } from "./textFromApi.js";
import { startTimer } from "./timer.js";



export let minimumLinesOfText = 8;
export let maximumLinesOfText = 15;
export let previousData = document.getElementById("previous-data");

export async function displayText() {
    const text = await displayRandomLines(minimumLinesOfText, maximumLinesOfText);
    return text;
}


export function startTimerOnFirstKeyPress() {
    startTimer();
    document.getElementById("inputArea").removeEventListener("input", startTimerOnFirstKeyPress);
}
