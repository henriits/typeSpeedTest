import { timeLeftText ,textarea, previousData} from './variables.js';

let intervalId; // Variable to store the interval ID
export let timeLeft = 10;
export let timePassed = 0;

// Variables tracking input count and errors
let inputCount = 0;
let errors = 0;

export function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timePassed++;
        timeLeftText.textContent = timeLeft;
    } else {
        clearInterval(intervalId); // Clear the interval
        timeLeftText.textContent = "Timer has ended"; // Update the text content
        console.log("Timer has ended");
        textarea.disabled = true // Disable textarea when timer runs out
        previousData.classList.remove("hide-previous")
    }
}

// Function to start the timer and store the interval ID
export function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}


export function resetTimer() {
    clearInterval(intervalId);
    timeLeft = 60;
    timePassed = 0;
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
