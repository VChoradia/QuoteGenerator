const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loader
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Show quote
function hideLoader() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote API
async function getQuote() {

    const proxyUrl = 'https://mysterious-basin-47309.herokuapp.com/'; //to get rid of cors errors - personalized proxyUrl
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en';

    try {
        showLoader();
       const response = await fetch(proxyUrl + apiUrl); 
       //this will fetch or save the data from apiUrl only after apiUrl is fully loaded
       const data = await response.json(); 
       //data will store the json formatted data from response

       //for quotes which have unknown authors
       if (data.quoteAuthor === '') {
         quoteAuthor.innerText= '-- Anonymous --';
       } else {
        quoteAuthor.innerText= '-- '+ data.quoteAuthor + ' --';
       }
      
       //to decrease the size of fonts..for better view
       if(data.quoteText.length < 120) {
           quoteText.classList.add('long-quote');
       } else {
        quoteText.classList.remove('long-quote');
       }
       quoteText.innerText = data.quoteText;
       
       hideLoader(); 

    } catch (err) {
        getQuote();
    }
}

//tweet functionality
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`; //use `` in order to pass js in links
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();