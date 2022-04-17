require('dotenv').config();
const http = require ('http');
const cors = require ('cors');
const morgan = require ('morgan');
const express = require ('express');
const mongoose = require ('mongoose');
const methodOverride = require ('method-override');
const pageRouter = require ('./router/pageRouter');
const app = express ();

mongoose.connect (process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true}).then((res) => console.log ('Connected to DB')).catch((error) => console.log (error))
app.listen (process.env.PORT || 8081, (error) => {error ? console.log(error) : console.log(`listening... port is active`)});
app.use (morgan (':method :url :status :res[content-length] - :response-time ms'))
app.use (cors ());
app.use (methodOverride ('_method'));
app.use (express.json());
app.use (express.urlencoded ({extended: true}));            // Что то вроде боди-парсера, но экспрессовское
app.use (pageRouter);

// Глобальная ошибка 404
app.use ((req, res) => {
    res
    .sendStatus (404)
    .redirect ('/404')
})