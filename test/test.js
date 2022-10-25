//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require('../web-application-sql');

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "",
    database: "db",
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    //Mocha test for getAllUsers method in database module.
    describe('#getAllUsers', () => {
        it('should return all of the users in the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of users is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if (resObj.length > 1) {
                    resObj[0].should.have.property('first_name');
                    resObj[0].should.have.property('last_name');
                    resObj[0].should.have.property('contact');
                    resObj[0].should.have.property('email');
                    resObj[0].should.have.property('password');
                    resObj[0].should.have.property('image');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllUsers(response);
        });
    });

   
    describe('#addUser', () => {
        it('should add a user to the database', (done) => {
            //Mock response object for test
            let response = {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that user has been added to database
                let sql = "SELECT first_name FROM users WHERE first_name='" + custName + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err) {//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else {
                        //Check that user has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE first_name='" + custName + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err) {//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else {
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random user details
            let custName = Math.random().toString(36).substring(2, 15);
            let custLName = Math.random().toString(34).substring(2, 15);
            let custPhone = "+4400000";
            let custEmail = "test@mail.com";
            let custPass = "123";
            let custImage = "./image/a.jpg";

            //Call function to add user to database
            db.addUser(custName, custLName, custPhone, custEmail, custPass, custImage, response);
        });
    });
});

//Wrapper for all web service tests
describe('Web Service', () => {

    //Test of GET request sent to /users
    describe('/GET users', () => {
        it('should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);

                    //Check that an array of users is returned
                    resObj.should.be.a('array');

                    //Check that appropriate properties are returned
                    if (resObj.length > 1) {

                        resObj[0].should.have.property('first_name');
                        resObj[0].should.have.property('last_name');
                        resObj[0].should.have.property('contact');
                        resObj[0].should.have.property('email');
                        resObj[0].should.have.property('password');
                        resObj[0].should.have.property('image');
                    }

                    //End test
                    done();
                });
        });
    });
});

