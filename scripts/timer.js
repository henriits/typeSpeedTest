import { previousData } from "./startAndDisplay.js";
import {
    updateAccuracyAndWPM,
    saveResult,
    displayResultsInTable,
    wordsPerMinuteText,
    accuracyCorrectText,
} from "./input.js";

export const textarea = document.querySelector("#inputArea");
export const timeLeftText = document.querySelector("#time");

export let testTime = 60;
let intervalId;
let timeLeft = testTime;
export let timePassed = 1;

let inputCount = 0;
let errors = 0;

export function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timePassed++;
        timeLeftText.textContent = timeLeft;
        updateAccuracyAndWPM();
    } else {
        clearInterval(intervalId);
        timeLeftText.textContent = "Timer has ended";
        textarea.disabled = true;
        previousData.classList.remove("hide-previous");
        saveResult(
            parseInt(wordsPerMinuteText.textContent),
            parseInt(accuracyCorrectText.textContent)
        );
        displayResultsInTable();
    }
}

export function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}

export function resetTimer() {
    clearInterval(intervalId);
    timeLeft = testTime;
    timePassed = 1;
    timeLeftText.textContent = timeLeft;
    textarea.disabled = false;

    inputCount = 0;
    errors = 0;
    document.querySelector("#inputArea").value = "";
    document.querySelector("#error").textContent = "0";
    document.querySelector("#accuracy").textContent = "0";
    document.querySelector("#wpm").textContent = "0";
}
