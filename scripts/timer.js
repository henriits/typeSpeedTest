import { timeLeftText } from './variables.js';

export let timeLeft = 60;
export let timePassed = 0;
let intervalId; // Variable to store the interval ID

export function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timePassed++;
        timeLeftText.textContent = timeLeft;
    } else {
        clearInterval(intervalId); // Clear the interval
        timeLeftText.textContent = "Timer has ended"; // Update the text content
        console.log("Timer has ended");
    }
}

// Function to start the timer and store the interval ID
export function startTimer() {
    intervalId = setInterval(updateTimer, 1000);
}

