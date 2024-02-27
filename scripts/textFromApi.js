let container = document.getElementById("lines-go-here");

async function getRandomAuthor() {
    try {
        let response = await fetch("https://poetrydb.org/author");
        let data = await response.json();
        let authors = data.authors;
        let randomIndex = Math.floor(Math.random() * authors.length);
        let randomAuthor = authors[randomIndex];
        return randomAuthor;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw error; // Re-throw the error to be handled elsewhere if needed
    }
}

async function getRandomLinesFromAuthor(author, lineCount) {
    try {
        let response = await fetch(`https://poetrydb.org/author/${author}/lines`);
        let data = await response.json();
        let randomIndex = Math.floor(Math.random() * data.length);
        let lines = data[randomIndex].lines.slice(0, lineCount);
        return lines;
    } catch (error) {
        console.error("Error fetching lines for author:", error);
        throw error; // Re-throw the error to be handled elsewhere if needed
    }
}

export async function displayRandomLines(minLineCount, maxLineCount) {
    try {
        let randomAuthor = await getRandomAuthor();
        let randomLines = await getRandomLinesFromAuthor(randomAuthor, maxLineCount);

        // Ensure at least minLineCount lines are displayed
        if (randomLines.length < minLineCount) {
            randomLines = await getRandomLinesFromAuthor(randomAuthor, minLineCount);
        }

        container.innerHTML = ""; // Clear previous content

        for (let i = 0; i < randomLines.length; i++) {
            let line = randomLines[i];
            for (let j = 0; j < line.length; j++) {
                let letterSpan = document.createElement("span");
                letterSpan.classList.add("letter"); // Add a class to each span
                if (line[j] === ' ') {
                    // For whitespace characters, create a space div
                    letterSpan.innerHTML = '&nbsp;';
                } else {
                    // For non-whitespace characters, set textContent to lowercase
                    letterSpan.textContent = line[j].toLowerCase();
                }
                container.appendChild(letterSpan);
            }
        }
    } catch (error) {
        console.error("Error displaying random lines:", error);
        // You can handle the error here, such as displaying a message to the user
    }
}
