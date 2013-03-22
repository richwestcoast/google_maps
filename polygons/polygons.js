/*function initialize(container) {
  
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

  //

  var drawingManager = new google.maps.drawing.DrawingManager({
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
  drawingManager.setMap(map);

  var polys = [];
  var polysComplete = [];

  google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
    
    var polys = [];

    var coordinates = (polygon.getPath().getArray());

    coordinates.push(coordinates[0]);
    polys.push(coordinates);
    //polysComplete.push(polys);
    console.log(polys.toString());
    simplePolygon(polys)
  });

  function interactiveEditor(){
    creator = new PolygonCreator(map);
  }


}  */



  var paths = [[
    new google.maps.LatLng(38.872886, -77.054720),
    new google.maps.LatLng(38.872602, -77.058046),
    new google.maps.LatLng(38.870080, -77.058604),
    new google.maps.LatLng(38.868894, -77.055664),
    new google.maps.LatLng(38.870598, -77.053346)
  ], [
    new google.maps.LatLng(38.871684, -77.056780),
    new google.maps.LatLng(38.871867, -77.055449),
    new google.maps.LatLng(38.870915, -77.054891),
    new google.maps.LatLng(38.870113, -77.055836),
    new google.maps.LatLng(38.870581, -77.057037)
  ]];

  //console.log(paths);

  var coordinatesComplete = [];
  var experimentContainer = [];
  var initialPolys = [];
  var drawingManager;
  var map;

  function initialize() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: new google.maps.LatLng(-33.14215, 18.02749),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    /*var poly = new google.maps.Polygon({
      paths: paths,
      strokeWeight: 3,
      fillColor: '#55FF55',
      fillOpacity: 0.5
    });*/

    //simplePolygon(paths, map);

    

    drawingManager = new google.maps.drawing.DrawingManager({
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

    drawingManager.setMap(map);

    
    
    var polysComplete = [];
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
      initialPolys.push(simplePolygon(coordinatesComplete, map))
      //simplePolygon(coordinatesComplete, map)
    });

    

    
    var experimentCoords = [];
    /*experimentCoords.push([38.872886, -77.054720]);
    experimentCoords.push([38.872602, -77.058046]);
    experimentCoords.push([38.870080, -77.058604]);
    experimentCoords.push([38.868894, -77.055664]);
    experimentCoords.push([38.870598, -77.053346]);*/
    experimentCoords.push([-33.13751525671927,18.024959564208984]);
    experimentCoords.push([-33.14161182340876,18.02103281021118]);
    experimentCoords.push([-33.143965466013846,18.02279233932495]);
    experimentCoords.push([-33.14434276162883,18.032383918762207]);
    experimentCoords.push([-33.1390245403791,18.031225204467773]);
    experimentCoords.push([-33.137173867530166,18.02779197692871]);
    
    experimentContainer.push(experimentCoords);
    //,,,
    var experimentCoords = [];
    /*experimentCoords.push([38.871684, -77.056780]);
    experimentCoords.push([38.871867, -77.055449]);
    experimentCoords.push([38.870915, -77.054891]);
    experimentCoords.push([38.870113, -77.055836]);
    experimentCoords.push([38.870581, -77.057037]);*/
    experimentCoords.push([-33.14258203487882,18.025367259979248]);
    experimentCoords.push([-33.13954559656774,18.024466037750244]);
    experimentCoords.push([-33.13924015021168,18.027019500732422]);
    experimentCoords.push([-33.14071346989043,18.02959442138672]);
    experimentCoords.push([-33.1423304996018,18.028135299682617]);
    
    /*experimentCoords.push([38.871857,-77.05666]);
    experimentCoords.push([38.871867, -77.055449]);
    experimentCoords.push([38.870113, -77.055836]);
    experimentCoords.push([38.87133,-77.05701]);*/
    experimentContainer.push(experimentCoords);   
    console.log(buildGMapCoordinatesFromLatLonArray(experimentContainer));
    simplePolygon(buildGMapCoordinatesFromLatLonArray(experimentContainer), map);

    //poly.setMap(map);
  }

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

  function simplePolygon(polygons, map){
    //console.log(polygons);
    var poly = new google.maps.Polygon({
      paths: polygons,
      editable: true,
    });

    console.log(poly);

    poly.setMap(map);
    return poly;
  }

