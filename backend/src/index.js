const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const {setupWebsocket} = require('./websocket');
require('dotenv').config();

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})


app.use(cors()); // libera o acesso para todo tipo de aplicação.
// para o express receber em formato json
app.use(express.json());
app.use(routes);

server.listen(3333);
