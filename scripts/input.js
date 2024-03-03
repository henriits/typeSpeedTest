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



function updateErrors(text, randomTextSpan) {
    errors = 0;
    randomTextSpan.forEach((char, index) => {
        let typed = text[index];
        let charText = char.innerText.trim();
        if (typed == null) {
            clearCharStyles(char);
        } else if (typed === charText || (typed === ' ' && charText === '&nbsp;') || (/[^\w\s]/.test(charText) && typed === charText)) {
            setCharCorrect(char);
        } else if (typed.trim() !== '') {
            setCharFalse(char);
            errors++;
        }
        if ((/[a-zA-Z"']/).test(charText) && typed === ' ') {
            setCharFalse(char);
            errors++;
        }
        if (/[\W_]/.test(charText) && typed === ' ') {
            setCharFalse(char);
            errors++;
        } 
        if (index === inputCount) {
            char.classList.add("next-character");
        } else {
            char.classList.remove("next-character");
        }
    });

    inputCount = text.length;
}


textarea.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && inputCount > 0) {
        inputCount--;
        updateErrors(textarea.value, document.querySelectorAll(".letter"));
    }
});

textarea.addEventListener("input", (event) => {
    updateErrors(event.target.value, document.querySelectorAll(".letter"));
});



function clearCharStyles(char) {
    char.classList.remove("correct");
    char.classList.remove("false");
    char.style.backgroundColor = "";
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


function updateProgressBar(progressBar, percentage) {
    progressBar.style.width = percentage + "%";
}

export function updateAccuracyAndWPM() {
    const text = textarea.value;
    const typedWords = text.trim().split(/\s+/); // Split the typed text into words
    const randomTextSpan = document.querySelectorAll(".letter");


    updateErrors(text, randomTextSpan);


    // Calculate accuracy
    let accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    accuracy = Math.max(0, accuracy); // Ensure accuracy is not negative
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;
    accuracyForGraph.textContent = accuracy;

    // Calculate words per minute
    let wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
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


export function inputData() {
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
