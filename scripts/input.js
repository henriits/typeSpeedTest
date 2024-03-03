import { timePassed } from "./timer.js";
import { textarea } from "./timer.js";


export const errorsElement = document.querySelector("#error");
export const accuracyCorrectText = document.querySelector("#accuracy");
export const wordsPerMinuteText = document.querySelector("#wpm");




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


function calculateAccuracy(inputCount, errors) {
    let accuracy = inputCount > 0 ? Math.round(((inputCount - errors) / inputCount) * 100) : 100;
    accuracy = Math.max(0, accuracy);
    return accuracy;
}

function updateAccuracy(accuracy) {
    accuracyCorrectText.textContent = accuracy;
}

function calculateWordsPerMinute(typedWords, timePassed) {
    let wordsPerMinute = Math.round((typedWords.length / timePassed) * 60);
    wordsPerMinute = Math.max(0, wordsPerMinute);
    return wordsPerMinute;
}

function updateWordsPerMinute(wordsPerMinute) {
    wordsPerMinuteText.textContent = wordsPerMinute;
}


function updateErrorsCount(errors) {
    errorsElement.textContent = errors;
}


export function updateAccuracyAndWPM() {
    const text = textarea.value;
    const typedWords = text.trim().split(/\s+/);
    const randomTextSpan = document.querySelectorAll(".letter");

    updateErrors(text, randomTextSpan);

    const accuracy = calculateAccuracy(inputCount, errors);
    updateAccuracy(accuracy);

    const wordsPerMinute = calculateWordsPerMinute(typedWords, timePassed);
    updateWordsPerMinute(wordsPerMinute);

    updateErrorsCount(errors);


}



export function saveResult(wpm, acc) {
    // Retrieve previous results from local storage or initialize an empty array
    let results = JSON.parse(localStorage.getItem('typingResults')) || [];

    // Get current date and time
    const currentDate = new Date();
    const dateTimeString = currentDate.toISOString(); // Convert to ISO string for easy storage and retrieval

    // Add current result with date and time to the array
    results.push({ wpm: wpm, acc: acc, dateTime: dateTimeString });

    // Store the updated array back to local storage
    localStorage.setItem('typingResults', JSON.stringify(results));
}


export function displayResults() {
    let results = JSON.parse(localStorage.getItem('typingResults')) || [];

    // Reverse the order of results array
    results.reverse();

    // Display results however you want, for example, in a list
    results.forEach((result, index) => {
        // Calculate the adjusted index based on the reversed order
        let adjustedIndex = results.length - index;

        console.log(`Result ${adjustedIndex}: WPM - ${result.wpm}, ACC - ${result.acc}`);
    });
}




export function inputData() {
    textarea.addEventListener("input", updateAccuracyAndWPM);

}
