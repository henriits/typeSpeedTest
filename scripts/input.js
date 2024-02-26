import { timePassed } from "./timer.js";
import { textarea } from "./timer.js";

export let previousWPM = document.getElementById("previous-wpm-result")
export let previousAccuracy = document.getElementById("previous-accuracy-result")
export const errorsElement = document.getElementById("error");
export let accuracyCorrectText = document.getElementById("accuracy")
export let lettersWrongText = document.querySelector("#error")
export let wordsPerMinuteText = document.getElementById("wpm")

let inputCount = 0;
let errors = 0;

export function resetAccuracyAndWPM() {
    inputCount = 0;
    errors = 0;
}



function updateAccuracyAndWPM() {
    const text = textarea.value;
    const textArray = text.split("");

    inputCount++;

    let randomTextSpan = document.querySelectorAll(".letter");
    randomTextSpan.forEach((char, index) => {
        let typed = textArray[index];
        let charText = char.innerText.trim(); // Trim the inner text to remove leading/trailing spaces
        if (typed == null) {
            char.classList.remove("correct");
            char.classList.remove("false");
            char.style.backgroundColor = ""; // Remove any background color
        } else if (typed.trim() === charText) { // Trim the typed character for comparison
            char.classList.add("correct");
            char.classList.remove("false");
            char.style.backgroundColor = ""; // Remove any background color
        } else {
            char.classList.remove("correct");
            char.classList.add("false");
            char.style.backgroundColor = ""; // Remove any background color
            errors++;
        }
    });

    // Apply gray background color to the last typed character
    if (textArray.length > 0) {
        let lastTypedCharIndex = textArray.length - 1;
        let lastTypedChar = randomTextSpan[lastTypedCharIndex];
        lastTypedChar.style.backgroundColor = "lightgray";
    }



    const lettersThatAreTypedCorrect = inputCount - errors;
    const accuracy = Math.round((lettersThatAreTypedCorrect / inputCount) * 100);
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;

    const wordsPerMinute = Math.round((lettersThatAreTypedCorrect / 5) / timePassed * 60);
    localStorage.setItem("wpm", wordsPerMinute);
    wordsPerMinuteText.textContent = wordsPerMinute;
    errorsElement.textContent = errors;

}

export function InputData() {
    textarea.addEventListener("input", updateAccuracyAndWPM);

    const storedAccuracy = localStorage.getItem("accuracy");
    if (storedAccuracy !== null) {
        previousAccuracy.textContent = storedAccuracy;
    }

    const storedWPM = localStorage.getItem("wpm");
    if (storedWPM !== null) {
        previousWPM.textContent = storedWPM;
    }
}

