// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){

  var apiToken = $('#api-token').val();
  $.ajaxSetup({
      headers: {
          "token": apiToken
      }
  });
  console.log(apiToken)

  $('.pick').click(function(){
       navigator.geolocation.getCurrentPosition(init);
       $('.loading-gif-container').show()
  });

  $(document).on('click', '#addFromMap', grabRestInfo);

//makes an ajax post to visits api when clicking add visit button from dashboard
  $("#submit-visit").click(function(){
      $.post("/api/visits",
        {
          visit: {

          review: $("#restaurant-review").val(),
          restaurant_name: $("#restaurant-name").val(),
          restaurant_id: $("#restaurant-id").val()
          }

      },
      //upon successful post, clear the values from fields
      function(data, status){
        $("#restaurant-review").val("")
        $("#restaurant-name").val("")
        $("#restaurant-id").val("")
        $("#modal").toggle();
        //updates points total on dashboard page
        $('.dashboard-total').text(  parseInt($('.dashboard-total').text() ) + 100  );
      });
  });



  var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var acOptions = {
    types: ['establishment']
  };



  // var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
  // autocomplete.bindTo('bounds',map);
  // var infoWindow = new google.maps.InfoWindow();
  // var marker = new google.maps.Marker({
  //   map: map
  // });
  //
  // google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //   infoWindow.close();
  //   var place = autocomplete.getPlace();
  //   if (place.geometry.viewport) {
  //     map.fitBounds(place.geometry.viewport);
  //   } else {
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(17);
  //   }
  //   marker.setPosition(place.geometry.location);
  //   infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  //   infoWindow.open(map, marker);
  //   google.maps.event.addListener(marker,'click',function(e){
  //
  //     infoWindow.open(map, marker);
  //
  //   });
  // });



  // Add an event to OPEN the modal
  $("#open-modal").on("click", function() {
    console.log("You clicked the open button!");
    $("#modal").toggle();
  });

  // Add an event to CLOSE the modal
  $("#close-modal").on("click", function() {
    console.log("You clicked the close button.");
    $("#modal").toggle();
    // location.reload();
  });
});

function grabRestInfo (){
  restname =  $('#restname').text()
  restid = $('#restid').text()
  console.log(restname)
  console.log(restid)
  console.log(restname)

  $('#restaurant-id').val(restid);
  $('#restaurant-name').val(restname);
};

//------ the "find my location" map function----------
  // -------init function
  var map;
  var service;
  var infoWindow;
  // var marker;

  var infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  infoWindow.addListener('click', function(){
    console.log('hey there buddy');
  });

  function handleSearchResults(results, status){
    console.log(results);

    for(var i = 0; i < results.length; i ++){
        var marker = new google.maps.Marker({
          position: results[i].geometry.location,
          map: map,
          icon: 'http://www.yespizza.hu/favicon.ico',
          name: results[i].name,
          id: results[i].id,
          rating: results[i].rating,
          vicinity: results[i].vicinity
        });

        marker.addListener('click', function(){
          var contentString =
            "<h3 id=\"restname\">" + this.name + "</h3>" +
            "<h5 style=\"display: none\" id=\"restid\">" + this.id + "</h5>" +
            "<p> Rating: " + this.rating + "/5</p>" +
            "<i>" + this.vicinity + "</i></br></br>" +
            "<button id=\"addFromMap\" href='/users/dashboard'>'I Ate Here'</button>";

          // Because the infowindow's content will point to the last result's name
          // the way is being built in the loop, we have to monkeypatch the
          // infowindow content, everytime we click on a marker. This is not the ideal way
          // maybe add to your list of things you can refactor later.
          infoWindow.setContent(contentString);

          // Instead of marker, we should use the 'this' object
          // to refer to actual marker being clicked
          infoWindow.open(map, this);
        });
      }
    }

  function performSearch(){
    // defining the search parameters (in this case pizza!!!!!)
    $('.loading-gif-container').hide()
    console.log('fire in the sky!');
    var request = {
      bounds: map.getBounds(),
      keyword: "pizza"
    };
    service.nearbySearch(request, handleSearchResults);
  }

// ----------beginning of init function
  function init(location){
    console.log(location);

  // object that described how we want the map to look
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var mapOptions = {
      center : currentLocation,
      zoom: 15,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };

  // this is the line that creates the map
    map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    var marker = new google.maps.Marker({
      position: currentLocation,
      map : map
    });

    service = new google.maps.places.PlacesService(map);

    // need this line to ensure that the map loads BEFORE trying to set bounds to it!
    // the reason we put "once" is so that if I zoom in and out it doens't re-run the function!
    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);

    // this allows them to refresh the search if they want to zoom out and do it again
    $('#refresh').click(performSearch);

//shows circle radius around current location
    var circleOptions = {
      strokeColor: "#0000FF",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: "blue",
      fillOpacity: 0.1,
      map: map,
      center: currentLocation,
      radius: 800
    };
    circle = new google.maps.Circle(circleOptions);
  }

  // ---------------end of init----------
