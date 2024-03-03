import { timePassed, textarea, testTime} from "./timer.js";
import { previousData } from "./startAndDisplay.js";
import { restartWithCurrentText } from "./reset.js";

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
    let wordsPerMinute = Math.round((typedWords.length / timePassed) * parseInt(testTime));
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
    let results = JSON.parse(localStorage.getItem('typingResults')) || [];
    const currentDate = new Date();
    const dateTimeString = currentDate.toISOString();
    results.push({ wpm: wpm, acc: acc, dateTime: dateTimeString });

    localStorage.setItem('typingResults', JSON.stringify(results));
}




export function displayResultsInTable() {
    let results = JSON.parse(localStorage.getItem('typingResults')) || [];
    results.reverse();
    const previousDataContainer = document.getElementById('previous-data');
    previousDataContainer.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('typing-results-table');
    const headerRow = document.createElement('tr');
    const headerCells = ['Result', 'WPM', 'ACC', 'Date'];
    headerCells.forEach(cellText => {
        const cell = document.createElement('th');
        cell.textContent = cellText;
        headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);

    results.forEach((result, index) => {
        let adjustedIndex = results.length - index;
        let formattedDateTime = formatDateTime(result.dateTime);

        const row = document.createElement('tr');
        const cells = [
            adjustedIndex,
            result.wpm,
            result.acc,
            formattedDateTime
        ];
        cells.forEach(cellText => {
            const cell = document.createElement('td');
            cell.textContent = cellText;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    previousDataContainer.appendChild(table);
}




function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return dateTime.toLocaleDateString(undefined, options);
}


export function inputData() {
    textarea.addEventListener("input", updateAccuracyAndWPM);

}



function deleteData() {
    restartWithCurrentText();
    localStorage.removeItem('typingResults');
    previousData.classList.add("hide-previous");
}


const deleteDataButton = document.getElementById('deleteDataButton');
deleteDataButton.addEventListener('click', deleteData);