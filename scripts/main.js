import { displayRandomLetters } from "./textFromApi.js";



document.addEventListener('DOMContentLoaded', async () => {

    async function displayRandom() {
        let text = await displayRandomLetters(15, 20); // Display min lines, max lines
        return text;
    }

    await displayRandom(); // Call the async function to start the process
});
