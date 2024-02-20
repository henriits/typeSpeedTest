export function InputLetters() {
    const textarea = document.getElementById("inputArea");

    textarea.addEventListener("input", function() {
        const text = textarea.value;
        console.log(text); // Log the current value of the textarea
        const textArray = text.split("")
        console.log(textArray)
    });
}


