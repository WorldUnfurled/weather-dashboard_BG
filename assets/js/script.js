var key = '4df499f07bd89e71ed347810c57fb5b1';
var city;
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=" + key;


var getForecast = function() {
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var weather;
            var temp;
            var wind;
            var humidity;
            var uvi;

            var forecastObj = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: []
            };
            for (var i = 0; i < 6; i++) {
                weather = data.daily[i].weather[0].main; //Weather
                temp = data.daily[i].temp.day; //Temperature
                wind = data.daily[i].wind_speed; //Wind Speed
                humidity = data.daily[i].humidity; //Humidity
                uvi = data.daily[i].uvi; //UV Index

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

var day = new Date();
var tommorow = new Date(day);
tommorow.setDate(tommorow.getDate() + 1);

console.log(day);
console.log(tommorow);