const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./server/controller');

const server = express();

server.use(cors());
server.use(bodyParser.json());

const port = process.env.PORT || 8040;

server.listen(port, () => {
    console.log(`Starting server on port ${port}`)
});