const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const auth = require('../middlewares/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/api/posts', auth, routes.getPosts);
apiRoutes.post('/api/users', auth, routes.createUsers);
apiRoutes.get('/api/users', auth, routes.getUsers);
apiRoutes.post('/api/login', routes.login);

app.use(apiRoutes);

module.exports = app;
