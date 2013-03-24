  //console.log(paths);

  var coordinatesComplete = [];
  var experimentContainer = [];
  var polysComplete = [];
  var drawingManager;
  var map;

  //Created from drawing manager////
  var initialPolys = [];
  //////////////////////////////////

  $('document').ready(function(){
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: new google.maps.LatLng(-33.14215, 18.02749),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    $('#save').click(function(){ saveData(); });


    drawingManager = createDrawingManager();

    drawingManager.setMap(map);
    
    var experimentCoords = [];
    experimentCoords.push([-33.13751525671927,18.024959564208984]);
    experimentCoords.push([-33.14161182340876,18.02103281021118]);
    experimentCoords.push([-33.143965466013846,18.02279233932495]);
    experimentCoords.push([-33.14434276162883,18.032383918762207]);
    experimentCoords.push([-33.1390245403791,18.031225204467773]);
    experimentCoords.push([-33.137173867530166,18.02779197692871]);
    experimentContainer.push(experimentCoords);
    
    var experimentCoords = [];
    experimentCoords.push([-33.14258203487882,18.025367259979248]);
    experimentCoords.push([-33.13954559656774,18.024466037750244]);
    experimentCoords.push([-33.13924015021168,18.027019500732422]);
    experimentCoords.push([-33.14071346989043,18.02959442138672]);
    experimentCoords.push([-33.1423304996018,18.028135299682617]);
    experimentContainer.push(experimentCoords);  
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      console.log(polygon);
      coordinatesComplete = [];
      //console.log(polygon);
      var polys = [];
      var coordinates = [];

      coordinates = polygon.getPath().getArray();

      $.each(coordinates, function(o, i){ polys.push([i.kb, i.lb]); });
      
      polysComplete.push(polys);

      //polysComplete.push(polys);
      //console.log(polysComplete.toString());
      coordinatesComplete = buildGMapCoordinatesFromLatLonArray(polysComplete);
      console.log(coordinatesComplete);
      polygon.setMap(null);
      $.each(initialPolys, function(i, o){
        console.log(o.setMap(null));
      });
      initialPolys.push(createSimplyPolygon(coordinatesComplete, map))
      //createSimplyPolygon(coordinatesComplete, map)
    });
    
    console.log(buildGMapCoordinatesFromLatLonArray(experimentContainer));
    initialPolys.push(createSimplyPolygon(buildGMapCoordinatesFromLatLonArray(experimentContainer), map));
  })

  function buildGMapCoordinatesFromLatLonArray(coords){
    var coordinatesComplete = [];
    
    $.each(coords, function(o, i){
      coordinates = [];
      $.each(i, function(o, coord){
        coordinates.push(new google.maps.LatLng(coord[0], coord[1]));
      });
      coordinatesComplete.push(coordinates);
      //console.log(coordinates);
    });
    return coordinatesComplete;
  }

  function createSimplyPolygon(polygons, map){
    //console.log(polygons);
    var poly = new google.maps.Polygon({
      paths: polygons,
      editable: true,
    });

    console.log(poly);

    poly.setMap(map);
    return poly;
  }


  function saveData(){
    $.each(initialPolys,function(){ 
      console.log( "New polygon:" + this.getPath().getArray().toString() ); 
    })
  }

  function createDrawingManager(){
    return new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]},
      polygonOptions: {
        strokeWeight: 1,
        editable: true
      }
    });
  }


/*var poly = new google.maps.Polygon({
      paths: paths,
      strokeWeight: 3,
      fillColor: '#55FF55',
      fillOpacity: 0.5
    });*/