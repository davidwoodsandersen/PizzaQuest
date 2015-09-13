// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



// ------------------------------------------------------
// ------Alan's google maps js ---------------------------
// -------------------------------------------------------

$(document).ready(function(){

  var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var acOptions = {
    types: ['establishment']
  };
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
  autocomplete.bindTo('bounds',map);
  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infoWindow.close();
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
    infoWindow.open(map, marker);
    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);

    });
  });






});

//------ the "find my location" map function----------



  // -------init function
  var map;
  var service;
  var infoWindow;


  function handleSearchResults(results, status){
    console.log(results);
    var marker;
    for(var i = 0; i < results.length; i ++){
        marker = new google.maps.Marker({
        position: results[i].geometry.location,
        map: map,
        icon: 'http://files.softicons.com/download/toolbar-icons/fatcow-hosting-extra-icons-2-by-fatcow/png/32x32/pizza.png',
        name: results[i].name,
        rating: results[i].rating
      });

      marker.addListener('click', function(){
          console.log("name: " + this.name + " rating " + this.rating);
      });

      // infoWindow = new google.maps.InfoWindow();
      // google.maps.event.addListener(marker, 'click', function(){
      //   infoWindow.setContent(place.name);
      // });
        }



  }


  function performSearch(){
    // defining the search parameters (in this case pizza!!!!!)
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


$(document).ready(function(){
  $('.pick').click(function(){
    navigator.geolocation.getCurrentPosition(init);
  });

});


  // ------------------------------------------------------
  // ------this is the end of Alan's google maps js ---------------------------
  // -------------------------------------------------------
