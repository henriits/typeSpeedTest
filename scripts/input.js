import { timePassed } from "./timer.js";
import { textarea, errorsElement, accuracyCorrectText, wordsPerMinuteText, previousWPM, previousAccuracy } from "./variables.js";

let inputCount = 0;

function updateAccuracyAndWPM() {
    const text = textarea.value;
    const textArray = text.split("");
    let errors = 0;
    inputCount++;

    let randomTextSpan = document.querySelectorAll(".letter");
    randomTextSpan.forEach((char, index) => {
        let typed = textArray[index];
        let charText = char.innerText.trim(); // Trim the inner text to remove leading/trailing spaces
        if (typed == null) {
            char.classList.remove("correct");
            char.classList.remove("false");
        } else if (typed.trim() === charText) { // Trim the typed character for comparison
            char.classList.add("correct");
            char.classList.remove("false");
        } else {
            char.classList.remove("correct");
            char.classList.add("false");
            errors++;
        }
    });


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

