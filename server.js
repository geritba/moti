const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const app = express();
import rateLimit from 'express-rate-limit';
import Weather from './service/Weather';
const port = 3000
require("dotenv").config();

const limiter = rateLimit({
    windowMs: 1000,
    max: 5
})
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    const locDate = Weather.OpenWeatherApi(data, vendndodhja);
res.render("index", { locDate });
});

app.post("/", async (req, res) => {
    try {
        const vendndodhja = await req.body.city;
        const url = `${process.env.BASE_URL}q=${vendndodhja}&appid=${process.env.APIKEY}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        let locDate = {};
        locDate.temp = Math.floor(data.main.temp);
        locDate.pershkrimi = data.weather[0].description;
        locDate.ndjesia = data.main.feels_like;
        locDate.lageshtia = data.main.humidity;
        locDate.shpejtesia = data.wind.speed;
        locDate.vendndodhja = vendndodhja;
        console.log(locDate);
        res.render("index", { locDate: locDate,});
    } catch (err) {
        console.log(err);
        res.status(400).json({ data: 'nuk u gjet rezultat!' })
    }
});

app.listen(process.env.PORT || port, () => {
    console.log('Serveri u ndez...');
});