  function initialize(container) {
  var options = {
        mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN],
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
  }
  map = new google.maps.Map(document.getElementById('map'));
  map.setCenter(new google.maps.LatLng(-33.14215, 18.02749));
  map.setZoom(16);
  map.setMapTypeId( google.maps.MapTypeId.ROADMAP );

// with is not so good as it add a new element in scope chain
// but i like the syntax

  with(MapToolbar){
      with(buttons){
        $hand = document.getElementById("hand_b");
        $shape = document.getElementById("shape_b");
        $line = document.getElementById("line_b");
        $placemark = document.getElementById("placemark_b");
      }
      $featureTable = document.getElementById("featuretbody");
      select("hand_b");
  }
  
  MapToolbar.polyClickEvent = google.maps.event.addListener(map, 'click',  function(event){
    if( !MapToolbar.isSelected(MapToolbar.buttons.$shape) && !MapToolbar.isSelected(MapToolbar.buttons.$line) ) return;
      if(MapToolbar.currentFeature){
        MapToolbar.addPoint(event, MapToolbar.currentFeature);
      }
  });
}



  function simplePolygon(){
    // create an array with the coordinates for the county boundary, note that the 1st and last are the same point
    var countyCoordinates = [
      new google.maps.LatLng(-33.13755119234615, 18.028113842010498),
      new google.maps.LatLng(-33.137119963852605, 18.02682638168335),
      new google.maps.LatLng(-33.13762306355574, 18.02558183670044),
      new google.maps.LatLng(-33.138180063434554, 18.024916648864746),
      new google.maps.LatLng(-33.13893470279252, 18.023886680603027),
      new google.maps.LatLng(-33.13981510717552, 18.02354335784912),
      new google.maps.LatLng(-33.140623634032785, 18.02330732345581),
      new google.maps.LatLng(-33.14148605446983, 18.02302837371826),
      new google.maps.LatLng(-33.14225863224737, 18.022964000701904),
      new google.maps.LatLng(-33.14339053624281, 18.023178577423096),
      new google.maps.LatLng(-33.144360728046216, 18.023629188537598),
      new google.maps.LatLng(-33.14520514551376, 18.024444580078125),
      new google.maps.LatLng(-33.145851927864996, 18.02528142929077),
      new google.maps.LatLng(-33.1463370114995, 18.026440143585205),
      new google.maps.LatLng(-33.1466065012487, 18.02727699279785),
      new google.maps.LatLng(-33.14700175138351, 18.02854299545288),
      new google.maps.LatLng(-33.14619328329481, 18.029165267944336),
      new google.maps.LatLng(-33.145528537285365, 18.02759885787964),
      new google.maps.LatLng(-33.14484581992512, 18.026118278503418),
      new google.maps.LatLng(-33.144091231399095, 18.025259971618652),
      new google.maps.LatLng(-33.14301323653332, 18.02504539489746),
      new google.maps.LatLng(-33.14159385642852, 18.024744987487793),
      new google.maps.LatLng(-33.14040802759921, 18.025002479553223),
      new google.maps.LatLng(-33.13932998748558, 18.025689125061035),
      new google.maps.LatLng(-33.138737059778336, 18.026440143585205),
      new google.maps.LatLng(-33.13834177241466, 18.027169704437256),
      new google.maps.LatLng(-33.13755119234615, 18.028113842010498),
    ];

    // create an instance of Polyline using the county coordinates with desired color, opacity and width(weight) and add to the map
    var countyLine = new google.maps.Polyline({
      path: countyCoordinates,
      strokeColor: "#ff00ff",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    countyLine.setMap(map);
  }
  /*
  var map;
  var creator;

  function initialize() {
      var mapOptions = {
        center: new google.maps.LatLng(-33.14215, 18.02749),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map_canvas"),
          mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  /////////////////////////////////


  function interactiveEditor(){
    creator = new PolygonCreator(map);
  } */