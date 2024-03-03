import { previousData } from "./startAndDisplay.js";
import { updateAccuracyAndWPM } from "./input.js";

export const textarea = document.querySelector("#inputArea");
export const timeLeftText = document.querySelector("#time")

let intervalId;
export let timeLeft = 60;
export let timePassed = 1;

// Variables tracking input count and errors
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
        textarea.disabled = true // Disable textarea when timer runs out
        previousData.classList.remove("hide-previous")
    }
}

export function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}


export function resetTimer() {
    clearInterval(intervalId);
    timeLeft = 60;
    timePassed = 1;
    timeLeftText.textContent = timeLeft;
    textarea.disabled = false

    // Reset input count ,errors and text
    inputCount = 0;
    errors = 0;
    document.getElementById("inputArea").value = "";
    document.getElementById("error").textContent = "0";
    document.getElementById("accuracy").textContent = "0";
    document.getElementById("wpm").textContent = "0";
}
