var key = '4df499f07bd89e71ed347810c57fb5b1';
var city;
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=imperial&appid=" + key;


var getForecast = function() {
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (var i = 0; i < 6; i++) {
                console.log(data);
                console.log(data.daily[i].weather[0].main); //Weather
                console.log(data.daily[i].temp.day); //Temperature
                console.log(data.daily[i].wind_speed); //Wind Speed
                console.log(data.daily[i].humidity); //Humidity
                console.log(data.daily[i].uvi); //UV Index
            }
        })
}

getForecast();

var day = new Date();
var tommorow = new Date(day);
tommorow.setDate(tommorow.getDate() + 1);

console.log(day);
console.log(tommorow);