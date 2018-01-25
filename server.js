//create this object to persist data
//var words = 

//reference fs
var fs = require('fs');

//include this after we make the json file
var data = fs.readFileSync('words.json');

//this line parses the raw data to make it readable and interprets it as a JavaScript object
var words = JSON.parse(data);
console.log(words);

//just ensure your script is set up correctly
console.log("server is starting");

//imports express package, which is actually a function
var express = require('express');

//making an expres app
var app = express();

//open a default port to test your app
//var server = app.listen(3000);

//you can also create a callback function here to get information back in the terminal and verify it's working.
var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}
//use express to host static files. Public is a variable here, which looks for a folder
app.use(express.static('public'));

//setting up routes to make a get request and get information back with a callback function

//app.get('/flower', sendFlower);

////every web transaction has a request and a response
//function sendFlower(request, response) {
//   response.send("I love flowers, too")
//

//now :__ is a variable
//app.get('/search/:information', sayHello);
//////every web transaction has a request and a response
//function sayHello(request, response){
//	var data = request.params; //information is a parameter 
////    //response allows us to get data back
//	response.send('Hello ' + data.information + ' hi')
//}


//allows us to use a get request to change data displayed
//app.get('/search/:information/:num', sayHello);
////
//function sayHello(request, response){
//	var data = request.params; //information is a parameter 
//	var num = data.num;
//	var reply = '';	for (var i = 0; i < num; i++){
//		reply += 'Hello'+ data.information + ' hi.';
//}
//	response.send(reply)
//}


//persisting data
//run line 79 first

//if the user adds a word and a score, it goes into the databse

//add a question mark to score if you want score to be optional
app.get('/add/:word/:score', addWord);
function addWord(request, response){
	var data = request.params; //score is a parameter
    var word = data.word;	
    var score = Number(data.score);
    words[word] = score;
    var data = JSON.stringify(words); 
    fs.writeFile('words.json', data, finished);
        function finished(err) {
            console.log('all set')
        } 
    var reply = {
        msg: "Thank you for your word."
    }
	response.send(reply)
}

    //stringify
   
    
app.get('/all', sendAll);
//
////callback function to allow a user to send data and receive a response
function sendAll(request, response){
    response.send(words);
}

//takes in user data and puts it into the word object above
    
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
      