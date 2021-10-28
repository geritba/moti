export default class Weather {
    constructor(temp, pershrkimi, ndjesia, lageshtia, shpejtesia, vendndodhja) {
         this.temp = temp;
        this.pershkrimi = pershkrimi;
        this.ndjesia = ndjesia;
        this.lageshtia = lageshtia;
        this.shpejtesia = shpejtesia;
        this.vendndodhja = vendndodhja;
    }
    static OpenWeatherApi(data, place) {
    const { main, wind, weather } = data;
       
    return new Weather(main.temp, weather[0].description, main.feels_like, main.humidity, wind.speed, place);
    }
    }