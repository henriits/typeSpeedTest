import { displayRandomLines } from "./textFromApi.js";
import { startTimer } from "./timer.js";

export const minimumLinesOfText = 8;
export const maximumLinesOfText = 15;
export const previousData = document.querySelector("#previous-data");

export async function displayText() {
    const text = await displayRandomLines(
        minimumLinesOfText,
        maximumLinesOfText
    );
    return text;
}

export function startTimerOnFirstKeyPress() {
    startTimer();
    document
        .querySelector("#inputArea")
        .removeEventListener("input", startTimerOnFirstKeyPress);
}
