//container1 - search text and search button
var searchTextEl = document.querySelector(".searchText");
var searchButtonEl = document.querySelector(".searchButton");
//container1 - today's weather and city name
var cityNameEl = document.querySelector("#cityName");
var todaysDateEl = document.querySelector("#todaysDate");
var tempTodayEl = document.querySelector("#tempToday");
var windTodayEl = document.querySelector("#windToday");
var humidityTodayEl = document.querySelector("#humidityToday");
var uviTodayEl = document.querySelector("#uviToday");

var iconURL = "https://openweathermap.org/img/wn/";

//container2 -
var prevSearchUlEl = document.getElementById("prevSearchList");
// console.log(prevSearchUlEl);
//eventaully make a li with search history

//container2 - 5 day forecast
var DateEl = document.querySelectorAll(".Date"); //this will create an array for the 5 future dates
var futureTempEl = document.querySelectorAll(".Temp"); //this will create an array for the 5 future temps
var futureWindEl = document.querySelectorAll(".Wind"); //this will create an array for the 5 future winds
var futureHumidityEl = document.querySelectorAll(".Humidity"); //this will create an array for the 5 future humidities

var searchArray = JSON.parse(localStorage.getItem("searchArray"));

//lat and long starting variables

if (searchArray !== null) {
  for (var i = 0; i < searchArray.length; i++) {
    var newLi = document.createElement("li");
    newLi.textContent = searchArray[i];
    newLi.addEventListener("click", function (liEvent, parent) {
      // searchTextEl.value = liEvent.srcElement.textContent;
      getWeatherAPI(liEvent.srcElement.textContent);
      // searchTextEl.value = "";
    });
    prevSearchUlEl.appendChild(newLi);
  }
} else {
  searchArray = [];
}

function getWeatherAPI(citySearch) {
  var requestUrl =
    // "http://api.openweathermap.org/data/2.5/weather?q=denver&units=imperial&exclude=minutely&appid=2a1cb33a158e817c9b2231f9a660bba7";
    //request for specific city's data; input the search text into the url to find data

    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&units=imperial&exclude=minutely&appid=2a1cb33a158e817c9b2231f9a660bba7";
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //from the data, pull out the lat and lon
      var lat = data.coord.lat;
      var long = data.coord.lon;
      console.log(lat);
      console.log(long);

      //with the returned data pull out city name and other info and update the text.content of cityNameEl
      var dateToday = new Date(data.dt * 1000);
      todaysDateEl.textContent = dateToday.toLocaleString();

      var city = data.name;
      var desc = data.weather[0].description;
      var icon = data.weather[0].icon;

      console.log(city);
      cityNameEl.textContent = city + " - " + desc;
      var todayImageIconEl = document.createElement("img");
      todayImageIconEl.src = iconURL + icon + ".png";
      cityNameEl.appendChild(todayImageIconEl);

      var todayTemp = data.main.temp;
      tempTodayEl.textContent = "Temp: " + todayTemp + "* F";

      var todayWind = data.wind.speed;
      windTodayEl.textContent = "Wind Speeds: " + todayWind + " mph";
      var todayHumidity = data.main.humidity;
      humidityTodayEl.textContent = "Humidity: " + todayHumidity + "%";

      //request the next set of info using lat and lon
      var requestLatLong =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=imperial&exclude=minutely&appid=2a1cb33a158e817c9b2231f9a660bba7";
      console.log(requestLatLong);

      //return the data requested
      fetch(requestLatLong)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          var todayUVI = data.current.uvi;
          if (todayUVI <= 2) {
            uviTodayEl.className = "text-success";
          } else if (todayUVI > 2 && todayUVI <= 7) {
            uviTodayEl.className = "text-warning";
          } else {
            uviTodayEl.className = "text-danger";
          }
          uviTodayEl.textContent = "UV Index: " + todayUVI;

          for (var i = 0; i < 5; i++) {
            var futureDate = new Date(data.daily[i].dt * 1000);

            DateEl[i].textContent = futureDate.toLocaleDateString();
            var forecastIconNum = data.daily[i].weather[0].icon;

            var forecastIconEL = document.createElement("img");
            forecastIconEL.src = iconURL + forecastIconNum + ".png";
            DateEl[i].appendChild(forecastIconEL);

            var forecastTemp = data.daily[i].temp.day;
            futureTempEl[i].textContent = forecastTemp + "* F";

            var forecastWind = data.daily[i].wind_speed;
            futureWindEl[i].textContent = forecastWind + " mph";
            var forecastHumidity = data.daily[i].humidity;
            futureHumidityEl[i].textContent = forecastHumidity + "%";
          }
        });
    });
}

// var prevSearchUlEl = document.querySelector("#prevSearchList");

// getWeatherAPI();
searchButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  //create/update an array of all of the previous searches and store in local storage

  var storeCity = searchTextEl.value;
  console.log(storeCity);
  if (!searchArray.includes(storeCity)) {
    searchArray.push(storeCity);
    var newLi = document.createElement("li");
    newLi.textContent = storeCity;
    newLi.addEventListener("click", function (liEvent, parent) {
      // searchTextEl.value = liEvent.srcElement.textContent;
      getWeatherAPI(liEvent.srcElement.textContent);
      // searchTextEl.value = "";
    });
    prevSearchUlEl.appendChild(newLi);
  }

  console.log(searchArray);
  localStorage.setItem("searchArray", JSON.stringify(searchArray));

  // var newLi = document.createElement("li");
  // newLi.textContent = searchTextEl.value;
  // console.log(prevSearchUlEl);
  // console.log(newLi);

  // newLi.addEventListener("click", function (liEvent, parent) {
  //   searchTextEl.value = liEvent.srcElement.textContent;
  //   getWeatherAPI();
  // });
  // prevSearchUlEl.appendChild(newLi);

  //thus is where to store history

  getWeatherAPI(searchTextEl.value);
  searchTextEl.value = "";
});

// localStorage.removeItem();
// localStorage.clear();
// fetch(
//   "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=2a1cb33a158e817c9b2231f9a660bba7"
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
