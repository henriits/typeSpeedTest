import { resetTimer } from "./timer.js";
import { resetAccuracyAndWPM } from "./input.js";
import {
    previousData,
    displayText,
    startTimerOnFirstKeyPress,
} from "./startAndDisplay.js";

export async function resetEverything() {
    resetTimer();
    resetAccuracyAndWPM();
    previousData.classList.add("hide-previous");
    document.querySelector("#inputArea").value = "";
    await displayText();
    document.querySelector("#inputArea").focus();

    document
        .querySelector("#inputArea")
        .addEventListener("input", startTimerOnFirstKeyPress);
}
export async function restartWithCurrentText() {
    resetTimer();
    resetAccuracyAndWPM();
    previousData.classList.add("hide-previous");
    document.querySelector("#inputArea").value = "";
    document.querySelector("#inputArea").focus();

    let letters = document.querySelectorAll(".letter");
    letters.forEach((letter) => {
        letter.classList.remove("correct");
        letter.classList.remove("false");
        letter.classList.remove("current");
        letter.style.backgroundColor = "";
    });
    document
        .querySelector("#inputArea")
        .addEventListener("input", startTimerOnFirstKeyPress);
    document.querySelectorAll(".letter").forEach(function (element) {
        element.classList.remove("next-character");
    });
}
