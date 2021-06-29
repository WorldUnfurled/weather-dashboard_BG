var key = '4df499f07bd89e71ed347810c57fb5b1';
var city;
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=" + key;

var weather;
var temp;
var wind;
var humidity;
var uvi;

var day = new Date();

var days = [[day]];
var forecastObj = {};


function getForecast() {
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            for (var i = 0; i < 6; i++) {
                weather = data.daily[i].weather[0].main; //Weather
                temp = data.daily[i].temp.day; //Temperature
                wind = data.daily[i].wind_speed; //Wind Speed
                humidity = data.daily[i].humidity; //Humidity
                uvi = data.daily[i].uvi; //UV Index

                forecastObj[i] = [];

                forecastObj[i].push(weather);
                forecastObj[i].push(temp);
                forecastObj[i].push(wind);
                forecastObj[i].push(humidity);
                forecastObj[i].push(uvi);
            }

            console.log(forecastObj);
        })
}

getForecast();

function getday() {
    for (var i = 1; i < 6; i++) {
        newDay = new Date(days[i-1]);
        console.log(days[i-1]);
        // console.log(newDay);
        newDay.setDate(newDay.getDate() + 1);
        // console.log(newDay);
        days[i] = [];
        days[i].push(newDay);
    }
    console.log(days);
};

getday();
