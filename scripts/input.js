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
        randomTextSpan.forEach((char, index) => {
            let typed = textArray[index];
            if (typed == null) {
                char.classList.remove("correct");
                char.classList.remove("false"); // Remove both classes when there's no typed character
            } else if (typed === char.innerText) {
                char.classList.add("correct");
                char.classList.remove("false"); // Remove "false" class when typed character matches
            } else {
                char.classList.remove("correct"); // Remove "correct" class if typed character doesn't match
                char.classList.add("false");
            }
        });


    });
}

