var key = '4df499f07bd89e71ed347810c57fb5b1';
var city;
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=" + key;


var n = function() {
    fetch(requestURL)
        .then(function (data) {
            console.log(data);
        })
}

n();
