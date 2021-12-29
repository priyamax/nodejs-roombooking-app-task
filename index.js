const express = require("express");
const dotenv = require("dotenv");
const mongo = require('./shared/connect');
const Router = require('./routes/route');

dotenv.config();
const app = express();

app.use(express.json());
mongo.connect();

app.use('/', Router);

app.listen(process.env.PORT || 3000);

