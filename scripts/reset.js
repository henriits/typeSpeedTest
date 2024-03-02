import { resetTimer } from "./timer.js";
import { resetAccuracyAndWPM } from "./input.js";
import { previousData, displayText, startTimerOnFirstKeyPress } from "./startAndDisplay.js";

export async function resetEverything() {
    resetTimer();
    resetAccuracyAndWPM();
    previousData.classList.add("hide-previous");
    document.getElementById("inputArea").value = "";
    await displayText();
    document.getElementById("inputArea").focus();

    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);
}
export async function restartWithCurrentText() {
    resetTimer();
    resetAccuracyAndWPM();
    previousData.classList.add("hide-previous");
    document.getElementById("inputArea").value = "";
    document.getElementById("inputArea").focus();


    let letters = document.querySelectorAll(".letter");
    letters.forEach(letter => {
        letter.classList.remove("correct");
        letter.classList.remove("false");
        letter.classList.remove("current");
        letter.style.backgroundColor = "";
    });
    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);
}
