let inputCount = 0;
let errors = 0;


export function InputLetters() {
    const textarea = document.getElementById("inputArea");

    textarea.addEventListener("input", function() {
        const text = textarea.value;
        console.log(text); // Log the current value of the textarea
        const textArray = text.split("")
        console.log(textArray)
        inputCount++;
        console.log(inputCount)
        errors = 0;

        let randomTextSpan = document.querySelectorAll(".letter"); // Target spans with the added class
        
        console.log(randomTextSpan)

    });
}

