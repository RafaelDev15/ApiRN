const {Router} = require('express');
const multer = require('multer');
const configUploads = require('./config/upload');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const RequestController = require('./controllers/RequestController');

const routes = new Router();

const upload = multer(configUploads);

routes.post('/user', UserController.store);
routes.post('/auth', SessionController.store);
routes.post('/request', upload.single('image'), RequestController.store);

routes.get('/request/:user', RequestController.show);
routes.get('/request_status/:user/:status', RequestController.index);

routes.delete('/request/:request_id', RequestController.destroy);

module.exports = routes;