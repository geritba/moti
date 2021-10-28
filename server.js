const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const port = 3000

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let locDate = { temp: "Temp", pershkrimi: "Pershkrimi", vendndodhja: "Vendndodhja", lageshtia: "Lageshtia ", ndjesia: "Ndjehet si ", shpejtesia: "Shpejtesia" };
    res.render("index", { locDate: locDate,});
});

app.post("/", async (req, res) => {
    try {
        const vendndodhja = await req.body.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${vendndodhja}&appid=${process.env.APIKEY}&units=metric`;
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

app.listen(port, () => {
    console.log('Serveri u ndez ne porten: '+port);
});