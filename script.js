function getUV(lat,lon){
  var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=321f01b5370831c8a95c71d93ecaa99f&lat=${lat}&lon=${lon}`;
    $.ajax({
    url: uvQueryURL,
    method: "GET"
  }).then(function (uvData) {
    let uvResult =  uvData;
    $("#weather-results").append("<p> UV: " + uvData.value + "</p>")
  });
}
function clear() {
  $("#weather-results").empty();
}
$("#run-search").on("click", function (event) {
  event.preventDefault();

  clear();
  // Build the query URL for the ajax request to the NYT API
  var searchCity = $("#search-term")
    .val()
    .trim();
  // queryURL is the url we'll use to query the API
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=321f01b5370831c8a95c71d93ecaa99f`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (result) {
    console.log(result)
    $("#weather-results").append("<p> Temp: " + result.main.temp + "</p>")
    $("#weather-results").append("<p> Wind Speed: " + result.wind.speed + "</p>")
    getUV(result.coord.lat, result.coord.lon)

    var queryFiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=321f01b5370831c8a95c71d93ecaa99f`;
    $.ajax({
      url: queryFiveDayURL,
      method: "GET"
    }).then(function (fiveDayResult) {
      console.log(fiveDayResult)
      let currentDay = 0;
      for (let i = 0; i < fiveDayResult.list.length; i = i +7 ){
        currentDay++;
        console.log(fiveDayResult.list[i])
        $("#weather-results").append(`<p> Temp ${currentDay+1}: ${fiveDayResult.list[i].main.temp}</p>`)
        $("#weather-results").append(`<p> Wind Speed ${currentDay+1}: ${fiveDayResult.list[i].wind.speed}</p>`)
  }
     });
        });
});
//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
