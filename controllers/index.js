
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

    console.log(req.body);

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    var query = [
        'Match (u:User{email: {email}})',
        'Return u'
    ].join('\n');


    var params = {
        email: req.body.email
    }

    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject().u.properties);
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}


exports.signUp = function (req, res) {
    console.log("her", req.body);
    
    var query = [
        'Merge (u:User{email: {emailId}})',
        'On Create set u.uuid={id}, u.username= {username}, u.dob= {dob}',
        'Return u'
    ].join('\n');


    var params = {
        id: uuid(),
        emailId: req.body.email,
        password: req.body.password,
        username: req.body.firstname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        dob: req.body.dob
    }

    firebase.auth().createUserWithEmailAndPassword(params.emailId, params.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // ...
      });
    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject());
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}


exports.sendConnection = function (req, res) {

    var query = [
        'Match (a:User{email: {sid}})',
        'Match (b:User{email: {rid}})',
        'Create (a)-[r:Has_Connection{status: false, uuid: {id}}]->(b)',
        'Return a,b,r'
    ].join('\n');

    var params = {
        sid: req.body.sid,
        rid: req.body.rid,
        id: uuid()
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.getConnections = function (req, res) {
    var query = [
        'Match (a:User{email: {sid}})-[r:Has_Connection{status: false}]-(b)',
        'Return b'
    ].join('\n');

    var params = {
        sid: req.query.sid
    }

    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject().b.properties);
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}


exports.myConnections = function (req, res) {
    var query = [
        'Match (a:User{email: {sid}})-[r:Has_Connection{status: true}]-(b)',
        'Return b'
    ].join('\n');

    var params = {
        sid: req.query.sid
    }

    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject().b.properties);
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.makeConnection = function (req, res) {

    var query = [
        'Match (a:User{email: {sid}})',
        'Match (b:User{email: {rid}})',
        'Match (a)-[r:Has_Connection]-(b)',
        'Set r.status=true',
        'Return a,b,r'
    ].join('\n');

    var params = {
        sid: req.body.sid,
        rid: req.body.rid
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.deleteConnection = function (req, res) {

    var query = [
        'Match (a:User{email: {sid}})',
        'Match (b:User{email: {rid}})',
        'Match (a)-[r:Has_Connection]-(b)',
        'Delete r'
    ].join('\n');

    var params = {
        sid: req.body.sid,
        rid: req.body.rid
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.createStatus = function (req, res) {

    var query = [
        'Match (u:User{email: {email}})',
        'Create (u)-[r:Has_Post{uuid: {rid}}]->(p:Post{uuid: {id}, content: {content}, date: {date}})',
        'Return u,p,r'
    ].join('\n');

    var params = {
        email: req.body.email,
        rid: uuid(),
        id: uuid(),
        content: req.body.content,
        date: req.body.date
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.getposts = function (req, res) {

    var query = [
        'Match (u:User{email: {email}})-[r:Has_Post]->(p:Post)',
        'Match (u:User{email: {email}})-[r1:Has_Connection{status: true}]-(b:User)-[r2:Has_Post]->(p1:Post)',
        'Return u,p,p1,b'
    ].join('\n');


    var params = {
        email: req.query.email
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.getusers = function (req, res) {
    var query = [
        'Match (u:User)',
        'return u'
    ].join('\n');

    var data = [];

    session
        .run(query)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject().u.properties);
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.createChild = function (req, res) {
    var query = [
        'Match (p:User{email: {parentEmail}})',
        'Create (u:User{email: {emailId}, uuid:{id}, username: {username}, dob: {dob}, child: true})',
        'Create (p)-[r:Has_Child]->(u)',
        'Return u'
    ].join('\n');


    var params = {
        id: uuid(),
        emailId: req.body.email,
        parentEmail: req.body.pemail,
        password: req.body.password,
        username: req.body.firstname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        dob: req.body.dob
    }

    firebase.auth().createUserWithEmailAndPassword(params.emailId, params.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // ...
      });
    var data = [];

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject());
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

exports.getChildConnections = function (req, res) {

    var query = [
        'Match (u:User {email: {email}})-[r:Has_Child]->(c:User)-[q:Has_Connection{status: false}]-(b:User)',
        'Return c,b'
    ].join('\n');

    var params = {
        email: req.query.email
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
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })

}

exports.getChild = function (req, res) {
    var query = [
        'Match (u:User {email: {email}})-[r:Has_Child]->(c:User)',
        'Return c'
    ].join('\n')

    var data = [];

    var params = {
        email: req.query.email
    }

    session
        .run(query, params)
        .subscribe({
            onNext: function (records) {
                data.push(records.toObject().c.properties);
            },
            onCompleted: function () {
                session.close();
                res.send(data);
            },
            onError: function (error) {
                console.log(error);
                res.send(error);
            }
        })
}

