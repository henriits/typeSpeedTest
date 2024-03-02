import { InputData } from "./input.js";
import { resetEverything, restartWithCurrentText } from "./reset.js";
import { startTimerOnFirstKeyPress, displayText } from "./startAndDisplay.js";


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inputArea").focus();
    document.getElementById("inputArea").addEventListener("input", startTimerOnFirstKeyPress);
    const letterContainer = document.querySelector(".letter-divs");
    letterContainer.addEventListener("click", function () {
        document.getElementById("inputArea").focus();
    });

    document.getElementById("resetButton").addEventListener("click", resetEverything);
    document.getElementById("restartButton").addEventListener("click", restartWithCurrentText);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            restartWithCurrentText();
            InputData();
        }
        else if (event.key === "Escape") {
            resetEverything();
            InputData();
        }
    });
    InputData();
    displayText();
});
