const cors = require('cors');
var express = require('express');
var https = require('https');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const WebSocket = require('ws');
var app = express();
var bodyParser = require('body-parser');
var db = require('./models');
var cron = require('node-cron');
var apiRoutes = require('./app/routes/apiRoutes.js');
const url = require('url');

const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(cors({
  origin: function(origin, callback){
    console.log('cors');
    return callback(null, true);
  }
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

console.log('apiRoutes');
apiRoutes(app, db);

 
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
      console.log('starting'); 

    });
});
