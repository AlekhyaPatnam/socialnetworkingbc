
const uuid = require('uuid/v1');
const driver = require('../neo4j');
const session = driver.session();

exports.helloworld = function (req, res) {
    res.send('You are in the dream world welcome to get crazy');
}