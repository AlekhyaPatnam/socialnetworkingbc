var app = require('../app');
var controller = require('../controllers/index');

app.get('/', controller.helloworld);

app.post('/api/signin', controller.signIn);
app.post('/api/signup', controller.signUp);