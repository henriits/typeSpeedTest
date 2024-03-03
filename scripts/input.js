import { timePassed } from "./timer.js";
import { textarea } from "./timer.js";


const errorsElement = document.querySelector("#error");
const accuracyCorrectText = document.querySelector("#accuracy");
const wordsPerMinuteText = document.querySelector("#wpm");




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


// Function to calculate accuracy
function calculateAccuracy(inputCount, errors) {
    let accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    accuracy = Math.max(0, accuracy); // Ensure accuracy is not negative
    return accuracy;
}

// Function to update accuracy in UI and localStorage
function updateAccuracy(accuracy) {
    localStorage.setItem("accuracy", accuracy);
    accuracyCorrectText.textContent = accuracy;
    accuracyForGraph.textContent = accuracy;
}

// Function to calculate words per minute
function calculateWordsPerMinute(typedWords, timePassed) {
    let wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
    wordsPerMinute = Math.max(0, wordsPerMinute); // Ensure WPM is not negative
    return wordsPerMinute;
}

// Function to update words per minute in UI and localStorage
function updateWordsPerMinute(wordsPerMinute) {
    localStorage.setItem("wpm", wordsPerMinute);
    wordsPerMinuteText.textContent = wordsPerMinute;
    wpmForGraph.textContent = wordsPerMinute;
}

// Function to update error count in UI
function updateErrorsCount(errors) {
    errorsElement.textContent = errors;
}

// Refactored main function
export function updateAccuracyAndWPM() {
    const text = textarea.value;
    const typedWords = text.trim().split(/\s+/); // Split the typed text into words
    const randomTextSpan = document.querySelectorAll(".letter");

    updateErrors(text, randomTextSpan);

    const accuracy = calculateAccuracy(inputCount, errors);
    updateAccuracy(accuracy);

    const wordsPerMinute = calculateWordsPerMinute(typedWords, timePassed);
    updateWordsPerMinute(wordsPerMinute);

    updateErrorsCount(errors);

}







export function inputData() {
    textarea.addEventListener("input", updateAccuracyAndWPM);

}
