const express = require('express');
const cors = require('cors');
const routes = require('./router');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

class App{
    constructor(){
        this.server = express();

        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());
        
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);

    }
}

module.exports = new App().server;