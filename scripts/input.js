export function InputLetters() {
    const textarea = document.getElementById("inputArea");

    textarea.addEventListener("input", function() {
        const text = textarea.value;
        console.log(text); // Log the current value of the textarea
    });
}

// Call the function to start logging input letters
