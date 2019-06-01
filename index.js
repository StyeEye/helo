const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const controller = require('./server/controller');

const server = express();

server.use(cors());
server.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then(db => {
        server.set("db", db);
        console.log(`Connected to database`);
    });

const port = process.env.PORT || 8040;

server.listen(port, () => {
    console.log(`Starting server on port ${port}`)
});