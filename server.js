//Import the express, body-parser, mysql, express-session modules
const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mysql = require('mysql');

//Creates connection to the database
let connectionPool = mysql.createPool(
    {
        connectionLimit: 1,
        host: "localhost",
        user: "root",
        password: "",
        database: "db",
        debug: false
    }
);
//The express module is a function. When it is executed it returns an app object
const app = express();
app.use(bodyParser.json());
app.use(
    expressSession({
        secret: 'cst2120 secret',
        cookie: { maxAge: 600000 },
        resave: false,
        saveUninitialized: true
    })
);

//Set up application to handle GET requests sent to the user path
app.get('/data', getdata);
app.get('/checklogin', checklogin);
app.get('/logout', logout);
//Set up application to handle POST requests sent to the user path
app.post('/login', login);
app.post('/register', register);
app.post('/post', savepost);
app.post('/edit', editdata);
app.post('/deleteP', deletePost);
app.post('/image', saveImage);
app.post('/deleteI', deleteImg);
app.post('/friend', addFriend);
app.post('/deleteUsr',removeUser);


app.use(express.static('public'));

//Start the app listening on port 8080
app.listen(8080);

//Saves data to the database
function register(request, response) {
    let id = 0;

    let newUser = request.body;

    let sql1 = 'SELECT * FROM users WHERE email = ' + '"' + newUser.email + '"';

    connectionPool.query(sql1, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {

            if (result.length > 0) {
                response.send("Email address already exist! Please try other one");
            }
            else {
                let sql = 'INSERT INTO users VALUES (' + id + ', "' + newUser.fname + '", "' + newUser.lname + '", "' + newUser.phone + '", "' + newUser.email + '", "' + newUser.password + '", "./image/a.jpg")';

                connectionPool.query(sql, (err, result) => {
                    if (err) {
                        console.error("Error executing query: " + JSON.stringify(err));
                    }
                    else {
                        id++;
                        response.send("User added successfully");
                    }
                }
                );
            }
        }
    }
    );
}

//Checks a user in database
function login(request, response) {

    let usrlogin = request.body;

    let sql = 'SELECT * FROM users WHERE email = ' + '"' + usrlogin.email + '"';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            if (result.length > 0 && usrlogin.email === result[0].email && usrlogin.password == result[0].password) {
                request.session.username = result[0].email;
                response.send('{"login":true, "message": "Login successfully", "name": ' + '"' + result[0].first_name + '"}');
            }
            else {
                response.send('{"login": false, "message": "Email-Address or password incorrect."}');
            }
        }
    }
    );

}

function checklogin(request, response) {
    if (!("username" in request.session)) {
        response.send('{"login": false}');
    }
    else {
        response.send('{"login": true, "id": "' + request.session.username + '" }');
    }
}

function logout(request, response) {
    request.session.destroy(err => {
        if (err) {
            response.send('{"error": ' + JSON.stringify(err) + '}');
        }
        else {
            response.send('{"login":false}');
            resp1 = '';
        }
    }
    );
}

var resp1 = '';
//Data structure that will be accessed using the web service
var friendSet = new Set();

//Gets all the data from database and sends it
function getdata(request, response) {
    var resp = '';
    let sql = 'SELECT users.*, posts.message, images.path, friends.friend_id FROM (((users LEFT JOIN posts ON users.id = posts.user_id) LEFT JOIN images ON users.id = images.user_id) LEFT JOIN friends ON users.id = friends.user_id) WHERE users.email ="' + request.session.username + '";';
    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            if (result.length > 0) {
                var set = new Set();
                resp += '{"message": "User exist",' + ' "id": ' + '"' + result[0].id + '", "fname": ' + '"' + result[0].first_name + '", "lname": "' + result[0].last_name + '", "contact": "' + result[0].contact + '", "password": "' + result[0].password + '", "image": "' + result[0].image + '", "posts" : [';
                let postSet = new Set();
                for (item of result) {
                    postSet.add(item.message);
                }
                for (item of postSet) {
                    resp += '"' + item + '",';
                }
                resp = resp.slice(0, (resp.length - 1));
                resp += '], "images" : [';


                let imgSet = new Set();
                for (item of result) {
                    imgSet.add(item.path);
                }
                for (item of imgSet) {
                    resp += '"' + item + '",';
                }
                resp = resp.slice(0, (resp.length - 1));
                resp += '], "friends" : [';

                for (let item of result) {
                    set.add(item.friend_id);
                }

                friendSet = set;

                for (item of friendSet) {

                        let sql1 = 'SELECT users.*, posts.message, images.path FROM ((users LEFT JOIN posts ON users.id = posts.user_id) LEFT JOIN images ON users.id = images.user_id) WHERE users.id="' + item + '";';

                        connectionPool.query(sql1, (err, result) => {
                            if (err) {
                                console.error("Error executing query: " + JSON.stringify(err));
                            }
                            else {
                                if (result.length > 0) {

                                    resp1 += '{"id": ' + '"' + result[0].id + '", "fname": ' + '"' + result[0].first_name + '", "lname": "' + result[0].last_name + '", "contact": "' + result[0].contact + '", "password": "' + result[0].password + '", "image": "' + result[0].image + '", "posts" : [';

                                    let postSet = new Set();
                                    for (item of result) {
                                        postSet.add(item.message);
                                    }
                                    for (item of postSet) {
                                        resp1 += '"' + item + '",';
                                    }
                                    resp1 = resp1.slice(0, (resp1.length - 1));

                                    resp1 += '], "images" : [';
                                    let imgSet = new Set();
                                    for (item of result) {
                                        imgSet.add(item.path);
                                    }
                                    for (item of imgSet) {
                                        resp1 += '"' + item + '",';
                                    }
                                    resp1 = resp1.slice(0, (resp1.length - 1));
                                    resp1 += ']},';

                                }
                            }
                        });

                }
                resp += resp1;
                
                resp = resp.slice(0, (resp.length - 1));
                response.send(resp);
            }
            else {
                response.send('{"message": "getdat() User does not exist"}');
            }
        }
    }
    );

}

//Saves new data into database.
function savepost(request, response) {

    let id = 0;
    let post = request.body;

    let sql = 'INSERT INTO posts VALUES (' + id + ', "' + post.message + '", "' + post.usrId + '")';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("Please insert text");
        }
        else {
            id++;
            response.send("Post added successfully");
        }
    }
    );

}

//Upgrades database with new data.
function editdata(request, response) {

    let newUser = request.body;
    let sql1 = 'UPDATE users SET first_name = ' + '"' + newUser.fname + '", last_name = "' + newUser.lname + '", contact = "' + newUser.phone + '", password = "' + newUser.password + '", image = "./image/' + newUser.image + '" WHERE email = "' + request.session.username + '"';

    connectionPool.query(sql1, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
    }
    );
}

//Deletes data from database.
function deletePost(request, response) {

    let msg = request.body;

    let sql = 'DELETE FROM posts WHERE message = ' + '"' + msg.message + '"';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
    }
    );
}

//Saves new data to the database
function saveImage(request, response) {

    let id = 0;
    let img = request.body;

    let sql = 'INSERT INTO images VALUES (' + id + ', "./image/' + img.path + '", "' + img.usrId + '")';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
            response.send("Please insert text");
        }
        else {
            id++;
            response.send("Post added successfully");
        }
    }
    );
}

//Deletes data from database.
function deleteImg(request, response) {

    let msg = request.body;

    let sql = 'DELETE FROM images WHERE path="' + msg.path + '"';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
        }
    }
    );
}

//Saves new data to the database
function addFriend(request, response) {

    let user = request.body;
    let id = 0;
    let frId;

    let sql = 'SELECT * FROM users WHERE first_name="' + user.fname + '" AND last_name="' + user.lname + '"';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            if (result.length > 0) {
                let sql1 = 'INSERT INTO friends VALUES (' + id + ',' + user.id + ',' + result[0].id + ')';
                connectionPool.query(sql1, (err, result) => {
                    if (err) {
                        response.error("Error executing query: " + JSON.stringify(err));
                    }
                    else {
                        id++;
                        response.send("Successfully added user");
                    }
                }
                );
            } else {
                response.send("There is no user with these names");
            }
        }
    }
    );
}

//Deletes data from database.
function removeUser(request, response){

    let user = request.body;
    let sql = 'DELETE FROM friends WHERE friend_id=' + user.fid + ';';

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            resp1 = '';
        }
    }
    );
}