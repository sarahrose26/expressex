//reference fs
var fs = require('fs');

//reads the JSON file
var data = fs.readFileSync('words.json');

//this line parses the raw data to make it readable and interprets it as a JavaScript object
//the console should retrieve the JSON object
var words = JSON.parse(data);
console.log(words);

//just ensure your script is set up correctly
console.log("server is starting");

//imports express package, which is actually a function
var express = require('express');

//making an expres app
var app = express();

//open a listening port and create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}

//use express to host static files. Public is a variable here, which looks for a folder with that name.
app.use(express.static('public'));


//persisting data
//if the user adds a word and a score, it goes into the databse


app.get('/add/:word/:score', addWord);
function addWord(request, response){
	var data = request.params; //score is a parameter
    var word = data.word;	
    var score = Number(data.score);
    words[word] = score;
    //stringify is the opposite of parse
    var data = JSON.stringify(words); 
    //write file to the JSON file
    fs.writeFile('words.json', data, finished);
        function finished(err) {
            console.log('all set')
        } 
    var reply = {
        msg: "Thank you for your word."
    }
	response.send(reply)
}
   
app.get('/all', sendAll);

//callback function to allow a user to send data and receive a response
function sendAll(request, response){
    response.send(words);
}

    
//allows the user to query for the score of a word

app.get('/search/:word/', searchWord);

function searchWord(request, response){
        var word = request.params.word;
        var reply;
        if (words[word]) {
        reply = {
            status: 'found', 
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: 'not found',
            word: word
        }
    }
    
response.send(reply);
}
      