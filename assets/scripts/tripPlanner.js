$(document).ready(function() {

  console.log($(document).find('.current-day').length);

  $('#events .btn-circle').on('click', function(){
    var selected = $(this).siblings('select').val();
    var newItineraryItem = '<div class="itinerary-item"><span class="title">'+ selected +'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'
    var category = $(this).siblings('h4').text();
    $('#' + category).append(newItineraryItem);
  })


});