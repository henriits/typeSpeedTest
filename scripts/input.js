import { textarea,errorsElement,} from "./variables.js";


let inputCount = 0;
let errors = 0;


export function InputLetters() {
 // Select the HTML element representing the error count


    textarea.addEventListener("input", function() {
        const text = textarea.value;
        const textArray = text.split("");
        inputCount++;
        errors = 0;

        let randomTextSpan = document.querySelectorAll(".letter");
        randomTextSpan.forEach((char, index) => {
            let typed = textArray[index];
            if (typed == null) {
                char.classList.remove("correct");
                char.classList.remove("false");
            } else if (typed === char.innerText) {
                char.classList.add("correct");
                char.classList.remove("false");
            } else {
                char.classList.remove("correct");
                char.classList.add("false");
                errors++;
            }
        });

        // Update the error count in the HTML
        errorsElement.textContent = errors;
    });
}
