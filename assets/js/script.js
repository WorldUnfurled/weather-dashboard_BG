const key = '4df499f07bd89e71ed347810c57fb5b1';
const preRequestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + localStorage.getItem('newCity') + '&appid=' + key;

let weather;
let temp;
let wind;
let humidity;
let uvi;

const today = new Date();

const days = [String(today)];
const splitDates = [];
const dates = [];

let daySplit;
let newDayString;
let newDaySplit;
let newDaySlicify;

const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const cardDates = [];

let searchForm = $('#search-form');

searchForm.on("submit", function(event){
    event.stopImmediatePropagation();
    localStorage.setItem('newCity', $('#search-input').val());
})

function getForecast() {
    fetch(preRequestURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.coord.lat);
            console.log(data.coord.lon);

            const newURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,minutely&units=imperial&appid=' + key;

            fetch(newURL)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    const forecastObj = {};
                    for (var i = 0; i < 6; i++) {
                        weather = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png'; //Weather
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

                    $('#header-heading').children('h2').text(localStorage.getItem('newCity') + " " + cardDates[0]);
                    $('#header-icon').attr('src', forecastObj[0][0]);

                    for (var i = 0; i < 4; i++) {
                        $('header').children('p').eq(i).children('span').text(forecastObj[0][i+1]);
                    }

                    let cardText;
                    for (i = 0; i < 5; i++) {
                        cardText = "";

                        cardText += '<h3 class="card-text">' + cardDates[i + 1] + '</h3>'
                        cardText += '<img src="' + forecastObj[i + 1][0] + '">'
                        cardText += '<p class="card-text">' + 'Temp: ' + forecastObj[i + 1][1] + '</p>'
                        cardText += '<p class="card-text">' + 'Wind: ' + forecastObj[i + 1][2] + '</p>'
                        cardText += '<p class="card-text">' + 'Humidity: ' + forecastObj[i + 1][3] + '</p>'
            
                        $('#card-container').children('div').eq(i).html(cardText);
                    }

                })
        })
}

function getDate() {

    for (var i = 1; i < 6; i++) {
        newDay = new Date(days[i-1]);
        newDay.setDate(newDay.getDate() + 1);
        newDayString = String(newDay);

        days[i] = "";
        days[i] += newDayString;
    }

    for (var n = 0; n < days.length; n++) {
        newDaySplit = days[n].split(" ");
        newDaySlice = newDaySplit.slice(1, 4);
        splitDates[n] = "";
        splitDates[n] += newDaySlice;
    }

    for (var i = 0; i < splitDates.length; i++) {
        splitDates[i] = splitDates[i].split(",");
        splitDates[i][0] = convertDay(splitDates[i][0]);
    }

    return splitDates;
};

function convertDay(month) { 
    for (var i = 0; i < monthAbbr.length; i++) {
        if (month === monthAbbr[i]) {
            return String(i + 1);
        }
    }
}

function makeCardDates() {
    for (var i = 0; i < getDate().length; i++) {
        cardDates.push(getDate()[i][0] + "/" + getDate()[i][1] + "/" + getDate()[i][2]);
    }
}

makeCardDates();
getForecast();