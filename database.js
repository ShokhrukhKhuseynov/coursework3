//Import the mysql module and create a connection pool with user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
     connectionLimit: 1,
        host: "localhost",
        user: "root",
        password: "",
        database: "db",
        debug: false
});

//Gets all users
exports.getAllUsers = (response) => {
    //Build query
    let sql = "SELECT * FROM users";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
        }
    });
};


//Adds a new user to database 
exports.addUser = (f_name, l_nmae, phone, email, password, image, response) => {
    let id = 0;
    //Build query
    let sql = 'INSERT INTO users VALUES (' + id + ', "' + f_name + '", "' + l_nmae + '", "' + phone + '", "' + email + '", "' + password + '", "' + image +'")';
    
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            response.send("{result: 'User added successfully'}");
        }
    });
    id++;
}

