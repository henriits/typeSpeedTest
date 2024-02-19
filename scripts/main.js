import { displayRandomLetters } from "./textFromApi.js";


async function displayRandom() {
    let text = await displayRandomLetters(15, 20); // Display min lines, max lines
    return text
}

displayRandom(); // Call the async function to start the process
