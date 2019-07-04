
const uuid = require('uuid/v1');
const driver = require('../neo4j');
const session = driver.session();

var firebase = require("firebase/app");


require("firebase/auth");


const firebaseConfig = {
    apiKey: "AIzaSyDKejyIt6V2ymKyT5rElniQre98BxX_ZYE",
    authDomain: "databasecourse-f0022.firebaseapp.com",
    databaseURL: "https://databasecourse-f0022.firebaseio.com",
    projectId: "databasecourse-f0022",
    storageBucket: "databasecourse-f0022.appspot.com",
    messagingSenderId: "514995572745",
    appId: "1:514995572745:web:4a3921cc0674a51a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


exports.helloworld = function (req, res) {
    res.send('You are in the dream world welcome to get crazy');
}


exports.signIn = function (req, res) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      res.send();
}


exports.signUp = function (req, res) {

    var query = [
        'Merge (u:User{email: {emailId}})',
        'On Create set u.uuid={id}, u.username= {username}, u.phone= {phone}, u.dob= {dob}',
        'Return u'
    ].join('\n');


    var params = {
        id: uuid(),
        emailId: req.body.email,
        password: req.body.password,
        username: req.body.username,
        phone: req.body.phone,
        dob: req.body.dob
    }

    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject());
            },
            onCompleted: function () {
                session.close();
                firebase.auth().createUserWithEmailAndPassword(params.emailId, params.password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);
                    // ...
                  });
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}