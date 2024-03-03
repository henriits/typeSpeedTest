import { inputData } from "./input.js";
import { resetEverything, restartWithCurrentText } from "./reset.js";
import { startTimerOnFirstKeyPress, displayText } from "./startAndDisplay.js";


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#inputArea").focus();
    document.querySelector("#inputArea").addEventListener("input", startTimerOnFirstKeyPress);
    const letterContainer = document.querySelector(".letter-divs");
    letterContainer.addEventListener("click", function () {
        document.querySelector("#inputArea").focus();
    });

    document.querySelector("#resetButton").addEventListener("click", resetEverything);
    document.querySelector("#restartButton").addEventListener("click", restartWithCurrentText);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            restartWithCurrentText();
            inputData();
        }
        else if (event.key === "Escape") {
            resetEverything();
            inputData();
        }
    });
    inputData();
    displayText();
});
