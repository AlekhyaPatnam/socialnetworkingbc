var app = require('../app');
var controller = require('../controllers/index');

app.get('/', controller.helloworld);

app.post('/api/signin', controller.signIn);
app.post('/api/signup', controller.signUp);
app.post('/api/createStatus', controller.createStatus);

app.get('/api/getposts', controller.getposts);

app.get('/api/users', controller.getusers);

app.post('/api/createchild', controller.createChild);

app.get('/api/getchildern', controller.getChild);

app.get('/api/myconnections', controller.myConnections);

app.post('/api/sendconnection', controller.sendConnection);

app.get('/api/getConnections', controller.getConnections);

app.post('/api/makeconnection', controller.makeConnection);

app.post('/api/deleteConnection', controller.deleteConnection);

app.get('/api/childConnects', controller.getChildConnections);