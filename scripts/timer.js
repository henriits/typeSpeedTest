import { timeLeftText} from './variables.js';

export let timeLeft = 60;
export let timePassed = 0;

export function updateTimer() {
    timeLeft--;
    timePassed++;

    timeLeftText.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        console.log("Timer has ended");
    }
}
