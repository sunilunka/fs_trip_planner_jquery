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
        

    if(days.length === 0){
      var day = new DayItinerary();
      days.push(day);
      day[category].push(selected);
      $(".day-buttons").append(' <button class="btn btn-circle day-btn">' + (days.length) + '</button> ');
      $('#' + category).append(newItineraryItem);
    } else {
      var dayNumber = $(document).find(".current-day").text()
      if(days[dayNumber - 1][category].indexOf(selected) === -1){
        days[dayNumber - 1][category].push(selected);
        $('#' + category).append(newItineraryItem);
      } else {
        console.error("You have already added that event!");
      }
    }
    var locations = [];
    if(category == "Hotels"){
      all_hotels.forEach(function(h){

        if(h.name == selected){
          locations.push({hotel: h.place[0].location});
          
        }
      })
    } else if (category == "Restaurants"){
      all_restaurants.forEach(function(h){
        if(h.name == selected){
          locations.push({restaurant: h.place[0].location});
        }
      })
    } else if (category == "Activities"){
      all_activities.forEach(function(h){
        if(h.name == selected){
          locations.push({activity: h.place[0].location});
        }
      })
    }

    locations.forEach(function(obj){
      for(var key in obj){
        if(key === 'hotel'){
          drawLocation(obj[key],{
            icon: '/images/lodging_0star.png'
          })
        } else if(key === 'restaurant'){
          drawLocation(obj[key],{
            icon: '/images/restaurant.png'
          })
        } else if(key === 'activity'){
          drawLocation(obj[key],{
            icon: '/images/star-3.png'
          })
        }
      }
    });


  })


  $(".day-buttons").on("click", ".day-btn", function(){
    if(!$(this).hasClass("current-day")){
      $(this).siblings(".current-day").removeClass("current-day");
      $(this).addClass("current-day");
    } 

    var dayNumber = $(document).find(".current-day").text();
    $("#Hotels").empty();
    $("#Restaurants").empty();
    $("#Activities").empty();
    marker.setMap(null);

    $('#day-title span').text("Day " + dayNumber);

    console.log(days);
    // First we get current-day.text() and then get days[current-day.text() - 1]
    var dayToDisplay = days[$(document).find(".current-day").text() - 1]
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
    // console.log($(this));
    // if($(this).hasClass("current-day")){
    //    console.log("#add-day-btn has current-day class")
    //   $(this).removeClass("current-day");
    //   console.log($(this));
    // };

    // $(this).removeClass("current-day");
    $(".day-buttons").append(' <button class="btn btn-circle current-day day-btn" id='+ days.length +'>' + (days.length) + '</button> ')
    $(".day-buttons").find(".day-btn");

  })

  $("#day-itinerary").on("click", ".remove", function(){
    // console.log($(this));
      var dayToDisplay = days[$(document).find(".current-day").text() - 1]
      var category = $(this).closest('ul').attr("id");
      var categoryValue = $(this).siblings(".title").text();
      if(dayToDisplay[category].indexOf(categoryValue) > -1){
        var idx = dayToDisplay[category].indexOf(categoryValue);
        dayToDisplay[category].splice(idx, 1);
      }

      $(this).closest(".itinerary-item").remove();
  })

  $("#day-title").on("click", ".remove", function(){
    // console.log($(this));
      var dayToDisplay = days[$(document).find(".current-day").text() - 1]
      var dayNumber = $(document).find(".current-day").text();
      days.splice(dayNumber-1, 1);

      $("#Hotels").empty();
      $("#Restaurants").empty();
      $("#Activities").empty();

      $("#" + dayNumber ).remove();


  });




























});