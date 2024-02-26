import { timePassed } from "./timer.js";
import { textarea } from "./timer.js";

export let previousWPM = document.getElementById("previous-wpm-result")
export let previousAccuracy = document.getElementById("previous-accuracy-result")
export const errorsElement = document.getElementById("error");
export let accuracyCorrectText = document.getElementById("accuracy")
export let lettersWrongText = document.querySelector("#error")
export let wordsPerMinuteText = document.getElementById("wpm")
export let wpmForGraph = document.getElementById("wpmForGraph")
export let accuracyForGraph = document.getElementById("accuracyForGraph")



const latestWPMProgress = document.getElementById("latest-wpm-progress");
const latestAccuracyProgress = document.getElementById("latest-accuracy-progress");
const previousWPMProgress = document.getElementById("previous-wpm-progress");
const previousAccuracyProgress = document.getElementById("previous-accuracy-progress");

let inputCount = 0;
let errors = 0;

export function resetAccuracyAndWPM() {
    inputCount = 0;
    errors = 0;
}

function countInput(text) {
    const typedCharacters = text.replace(/\s/g, ""); // Remove whitespaces to count characters
    inputCount = typedCharacters.length;
}

function updateErrors(text, randomTextSpan) {
    errors = 0;
    randomTextSpan.forEach((char, index) => {
        let typed = text[index];
        let charText = char.innerText.trim(); // Trim the inner text to remove leading/trailing spaces
        if (typed == null) {
            clearCharStyles(char);
        } else if (typed === charText || (typed === ' ' && charText === '&nbsp;')) {
            setCharCorrect(char);
        } else if (typed.trim() !== '') { // Check if typed character is not whitespace
            setCharFalse(char);
            errors++;
        }
        // Check if typed character is a space when there's already a character present
        if (/[a-zA-Z]/.test(charText) && typed === ' ') {
            setCharFalse(char);
            errors++;
        }
    });
}

function clearCharStyles(char) {
    char.classList.remove("correct");
    char.classList.remove("false");
    char.style.backgroundColor = ""; // Remove any background color
}

function setCharCorrect(char) {
    char.classList.add("correct");
    char.classList.remove("false");
    char.style.backgroundColor = ""; // Remove any background color
}

function setCharFalse(char) {
    char.classList.remove("correct");
    char.classList.add("false");
    char.style.backgroundColor = ""; // Remove any background color
}

function applyLastTypedCharStyle(text, randomTextSpan) {
    if (text.trim() !== "" && /[a-zA-Z]/.test(text[text.length - 1])) {
        let lastTypedCharIndex = text.length - 1;
        let lastTypedChar = randomTextSpan[lastTypedCharIndex];
        lastTypedChar.style.backgroundColor = "lightgray";
    }
}
function updateProgressBar(progressBar, percentage) {
    progressBar.style.width = percentage + "%";
}

function updateAccuracyAndWPM() {
    const text = textarea.value;
    const typedWords = text.trim().split(/\s+/); // Split the typed text into words
    const randomTextSpan = document.querySelectorAll(".letter");

    countInput(text);
    updateErrors(text, randomTextSpan);
    applyLastTypedCharStyle(text, randomTextSpan);

    const accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;
    accuracyForGraph.textContent = accuracy;

    const wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
    localStorage.setItem("wpm", wordsPerMinute);
    wordsPerMinuteText.textContent = wordsPerMinute;
    wpmForGraph.textContent = wordsPerMinute;
    errorsElement.textContent = errors;


    updateProgressBar(latestWPMProgress, wordsPerMinute);
    updateProgressBar(latestAccuracyProgress, accuracy); 


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
    updateProgressBar(previousWPMProgress, storedWPM);
    updateProgressBar(previousAccuracyProgress, storedAccuracy); 
}
