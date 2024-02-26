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
    const typedWords = text.trim().split(/\s+/); // Split the typed text into words
    const typedCharacters = text.replace(/\s/g, ""); // Remove whitespaces to count characters
    errors = 0;
    inputCount = typedCharacters.length; // Update inputCount with the total number of characters

    let randomTextSpan = document.querySelectorAll(".letter");
    randomTextSpan.forEach((char, index) => {
        let typed = text[index];
        let charText = char.innerText.trim(); // Trim the inner text to remove leading/trailing spaces
        if (typed == null) {
            char.classList.remove("correct");
            char.classList.remove("false");
            char.style.backgroundColor = ""; // Remove any background color
        } else if (typed === charText || (typed === ' ' && charText === '&nbsp;')) {
            char.classList.add("correct");
            char.classList.remove("false");
            char.style.backgroundColor = ""; // Remove any background color
        } else if (typed.trim() !== '') { // Check if typed character is not whitespace
            char.classList.remove("correct");
            char.classList.add("false");
            char.style.backgroundColor = ""; // Remove any background color
            errors++;
        }
        // Check if typed character is a space when there's already a character present
        if (/[a-zA-Z]/.test(charText) && typed === ' ') {
            char.classList.remove("correct");
            char.classList.add("false");
            char.style.backgroundColor = ""; // Remove any background color
            errors++;
        }
    });

    // Apply gray background color to the last typed letter
    if (text.trim() !== "" && /[a-zA-Z]/.test(text[text.length - 1])) {
        let lastTypedCharIndex = text.length - 1;
        let lastTypedChar = randomTextSpan[lastTypedCharIndex];
        lastTypedChar.style.backgroundColor = "lightgray";
    }

    const accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;

    const wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
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

