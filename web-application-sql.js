//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//Import database functions
const db = require('./database');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Set up application to handle GET requests sent to the users path
app.get('/users', handleGetRequest);//Returns all users

//Set up application to handle POST requests sent to the users path
app.post('/users', handlePostRequest);//Adds a new users

//Start the app listening on port 8080
app.listen(8080);

//Handles GET requests to our web service
function handleGetRequest(request, response){
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'users' we return all users
    if(pathEnd === 'users'){
        //Call function to return all users
        db.getAllUsers(response);
    }
    else{//The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }
}

//Handles POST requests to our web service
function handlePostRequest(request, response){
    //Extract user data
    let newCust = request.body;
    console.log("Data received: " + JSON.stringify(newCust));

    //Call function to add new user
    db.addUser(newCust.first_name, newCust.last_name, newCust.contact, newCust.email, newCust.password, newCust.image, response);
}

//Export server for testing
module.exports = app;

