const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

const apiRoutes = express.Router();

apiRoutes.get('/api/posts', routes.getPosts);
apiRoutes.post('/api/users', routes.createUsers);
apiRoutes.get('/api/users', routes.getUsers);
apiRoutes.post('/api/login', routes.login);

app.use(apiRoutes);

module.exports = app;
