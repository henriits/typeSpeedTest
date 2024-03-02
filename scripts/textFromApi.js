const container = document.getElementById("lines-go-here");

async function getRandomAuthor() {
    try {
        const response = await fetch("https://poetrydb.org/author");
        const data = await response.json();
        const authors = data.authors;
        const randomIndex = Math.floor(Math.random() * authors.length);
        const randomAuthor = authors[randomIndex];
        return randomAuthor;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw error;
    }
}

async function getRandomLinesFromAuthor(author, lineCount) {
    try {
        const response = await fetch(`https://poetrydb.org/author/${author}/lines`);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const lines = data[randomIndex].lines.slice(0, lineCount);
        return lines;
    } catch (error) {
        console.error("Error fetching lines for author:", error);
        throw error;
    }
}

export async function displayRandomLines(minLineCount, maxLineCount) {
    try {
        const randomAuthor = await getRandomAuthor();
        let randomLines = await getRandomLinesFromAuthor(randomAuthor, maxLineCount);

        if (randomLines.length < minLineCount) {
            randomLines = await getRandomLinesFromAuthor(randomAuthor, minLineCount);
        }

        container.innerHTML = ""; // Clear previous content

        for (let i = 0; i < randomLines.length; i++) {
            const line = randomLines[i];
            for (let j = 0; j < line.length; j++) {
                const letterSpan = document.createElement("span");
                letterSpan.classList.add("letter");
                if (line[j] === ' ') {
                    letterSpan.innerHTML = '&nbsp;';
                } else {
                    letterSpan.textContent = line[j].toLowerCase();
                }
                container.appendChild(letterSpan);
            }
        }
    } catch (error) {
        console.error("Error displaying random lines:", error);
    }
}
