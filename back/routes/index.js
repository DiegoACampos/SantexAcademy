const Express = require('express');
const userRoutes = require('./user-routes');
const couseRoutes = require('./course-routes');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// Rutas
app.use('/user', userRoutes);
app.use('/course', couseRoutes);

// use=
app.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
