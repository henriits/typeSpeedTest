import { timePassed } from "./timer.js";
import { textarea } from "./timer.js";

const previousWPM = document.querySelector("#previous-wpm-result");
const previousAccuracy = document.querySelector("#previous-accuracy-result");
const errorsElement = document.querySelector("#error");
const accuracyCorrectText = document.querySelector("#accuracy");
const wordsPerMinuteText = document.querySelector("#wpm");
const wpmForGraph = document.querySelector("#wpmForGraph");
const accuracyForGraph = document.querySelector("#accuracyForGraph");
const latestWPMProgress = document.querySelector("#latest-wpm-progress");
const latestAccuracyProgress = document.querySelector("#latest-accuracy-progress");
const previousWPMProgress = document.querySelector("#previous-wpm-progress");
const previousAccuracyProgress = document.querySelector("#previous-accuracy-progress");


let inputCount = 0;
let errors = 0;

export function resetAccuracyAndWPM() {
    inputCount = 0;
    errors = 0;
}

function countInput(text) {
    const typedCharacters = text.replace(/\s/g, ""); // Remove white spaces to count characters
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
    char.style.backgroundColor = "";
}

function setCharFalse(char) {
    char.classList.remove("correct");
    char.classList.add("false");
    char.style.backgroundColor = "";
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

    // Calculate accuracy
    let accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    accuracy = Math.max(0, accuracy); // Ensure accuracy is not negative
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;
    accuracyForGraph.textContent = accuracy;

    // Calculate words per minute
    let wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
    wordsPerMinute = Math.min(200, wordsPerMinute); // Clamp WPM to a maximum of 200
    wordsPerMinute = Math.max(0, wordsPerMinute); // Ensure WPM is not negative
    localStorage.setItem("wpm", wordsPerMinute);
    wordsPerMinuteText.textContent = wordsPerMinute;
    wpmForGraph.textContent = wordsPerMinute;
    errorsElement.textContent = errors;

    updateProgressBar(latestWPMProgress, wordsPerMinute);
    updateProgressBar(latestAccuracyProgress, accuracy);
}



function getStoredAcc() {
    return localStorage.getItem("accuracy")

}

function getStoredWPM() {
    return localStorage.getItem("wpm")
}


export function InputData() {
    textarea.addEventListener("input", updateAccuracyAndWPM);

    const storedAccuracy = getStoredAcc();
    if (storedAccuracy !== null) {
        previousAccuracy.textContent = storedAccuracy;
    }

    const storedWPM = getStoredWPM();
    if (storedWPM !== null) {
        previousWPM.textContent = storedWPM;
    }
    updateProgressBar(previousWPMProgress, storedWPM);
    updateProgressBar(previousAccuracyProgress, storedAccuracy);
}
