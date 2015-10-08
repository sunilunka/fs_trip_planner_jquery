$(document).ready(function() {

  var days = [];


  function DayItinerary() {
    this.Hotels = []
    this.Restaurants = [],
    this.Activities = []
  };

  // Start with one day.

  function checkDuplicates(){

  }


  $('#events .btn-circle').on('click', function(){
    var selected = $(this).siblings('select').val();
    var newItineraryItem = '<div class="itinerary-item"><span class="title">'+ selected +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
    var category = $(this).siblings('h4').text();
    $('#' + category).append(newItineraryItem);

    if(days.length === 0){
      var day = new DayItinerary()
      days.push(day);
      day[category].push(selected)
    } else {
      var dayNumber = $(document).find(".current-day").text()
      if(days[dayNumber - 1][category].indexOf(selected) === -1){
        days[dayNumber - 1][category].push(selected);
      } else {
        console.error("You have already added that event!");
      }
    }
  })


  $(".day-buttons").on("click", ".day-btn", function(){
    if(!$(this).hasClass("current-day")){
      $(this).siblings(".current-day").removeClass("current-day");
      $(this).addClass("current-day");
    };

    $("#Hotels").empty();
    $("#Restaurants").empty();
    $("#Activities").empty();

    console.log(days);
    // First we get current-day.text() and then get days[current-day.text() - 1]
    var dayToDisplay = days[$(document).find(".current-day").text() - 1]
    console.log(dayToDisplay);
    for(var key in dayToDisplay){
      console.log(key)
      dayToDisplay[key].forEach(function(evt){
        var newItineraryItem = '<div class="itinerary-item"><span class="title">'+ evt +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
        $('#' + key).append(newItineraryItem);
      })
    };
      
    
  })

  $("#add-day-btn").on("click", function(){
    days.push(new DayItinerary());

    $(".day-buttons").append(' <button class="btn btn-circle day-btn">' + (days.length) + '</button> ')

  })

});