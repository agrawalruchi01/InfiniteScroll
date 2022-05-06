const quoteContainer = document.getElementById("quote-container");
const quotetxt = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

let apiQuotes = []

// Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    author.textContent = quote.author;
    quotetxt.textContent = quote.text;
    complete();
}

// get quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(response.json);
        newQuote();
    }catch(error) {
        alert(error);
       //catch error here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `http://twitter.com/intent/tweet/?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

//show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//on Load
getQuotes();