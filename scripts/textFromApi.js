let container = document.getElementById("lines-go-here");


async function getRandomAuthor() {
    let response = await fetch("https://poetrydb.org/author");
    let data = await response.json();
    let authors = data.authors;
    let randomIndex = Math.floor(Math.random() * authors.length);
    let randomAuthor = authors[randomIndex];
    return randomAuthor;
}

async function getRandomLinesFromAuthor(author, lineCount) {
    let response = await fetch(`https://poetrydb.org/author/${author}/lines`);
    let data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.length);
    let lines = data[randomIndex].lines.slice(0, lineCount);
    return lines;
}

export async function displayRandomLines(minLineCount, maxLineCount) {
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
    
}




