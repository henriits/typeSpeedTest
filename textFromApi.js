async function getRandomAuthor() {
    let response = await fetch("https://poetrydb.org/author");
    let data = await response.json();
    let authors = data.authors;
    let randomIndex = Math.floor(Math.random() * authors.length);
    let randomAuthor = authors[randomIndex];
    return randomAuthor;
}

async function getRandomLinesFromAuthor(author) {
    let response = await fetch(`https://poetrydb.org/author/${author}/lines`);
    let data = await response.json();
    let lines = data[Math.floor(Math.random() * data.length)].lines;
    return lines;
}

async function displayRandomLetters() {
    let randomAuthor = await getRandomAuthor();
    let randomLines = await getRandomLinesFromAuthor(randomAuthor);

    let container = document.getElementById("lines-go-here");
    container.innerHTML = ""; // Clear previous content

    for (let i = 0; i < randomLines.length; i++) {
        let line = randomLines[i];
        for (let j = 0; j < line.length; j++) {
            let letterDiv = document.createElement("div");
            letterDiv.textContent = line[j];
            container.appendChild(letterDiv);
        }
    }
}

displayRandomLetters();
