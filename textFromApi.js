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
    let lines = data[Math.floor(Math.random() * data.length)];
    return lines;
}

getRandomAuthor()
    .then(async randomAuthor => {
    //console.log("Random Author:", randomAuthor);
    let randomLines = await getRandomLinesFromAuthor(randomAuthor);
    console.log("Random Lines:", randomLines);
    let p = document.getElementById("lines-go-here")
    p.innerHTML = randomLines.lines
});
