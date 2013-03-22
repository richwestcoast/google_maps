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

  function initialize() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: new google.maps.LatLng(38.8714, -77.0556),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    /*var poly = new google.maps.Polygon({
      paths: paths,
      strokeWeight: 3,
      fillColor: '#55FF55',
      fillOpacity: 0.5
    });*/

    //simplePolygon(paths, map);

    

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

    
    
    var polysComplete = [];
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      console.log(polygon);
      var polys = [];
      var coordinates = [];

      coordinates = polygon.getPath().getArray();

      $.each(coordinates, function(o, i){ polys.push([i.kb, i.lb]); });

      //console.log(polys);
      
      polysComplete.push(polys);

      //polysComplete.push(polys);
      console.log(polysComplete.toString());
      var coordinatesComplete = buildGMapCoordinatesFromLatLonArray(polysComplete);
      //simplePolygon(coordinatesComplete, map)
    });

    var experimentContainer = [];
    var experimentCoords = [];
    /*experimentCoords.push([38.872886, -77.054720]);
    experimentCoords.push([38.872602, -77.058046]);
    experimentCoords.push([38.870080, -77.058604]);
    experimentCoords.push([38.868894, -77.055664]);
    experimentCoords.push([38.870598, -77.053346]);*/
    experimentCoords.push([38.877486,-77.064092]);
    experimentCoords.push([38.874396,-77.064049]);
    experimentCoords.push([38.874095,-77.056796]);
    experimentCoords.push([38.877720,-77.057418]);
    experimentContainer.push(experimentCoords.reverse());
    //,,,
    var experimentCoords = [];
    /*experimentCoords.push([38.871684, -77.056780]);
    experimentCoords.push([38.871867, -77.055449]);
    experimentCoords.push([38.870915, -77.054891]);
    experimentCoords.push([38.870113, -77.055836]);
    experimentCoords.push([38.870581, -77.057037]);*/
    experimentCoords.push([38.876801,-77.061946]);
    experimentCoords.push([38.875064,-77.062182]);
    experimentCoords.push([38.874914,-77.059693]);
    experimentCoords.push([38.876751,-77.059586]);
    /*experimentCoords.push([38.871857,-77.05666]);
    experimentCoords.push([38.871867, -77.055449]);
    experimentCoords.push([38.870113, -77.055836]);
    experimentCoords.push([38.87133,-77.05701]);*/
    experimentContainer.push(experimentCoords);   
    
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
      strokeWeight: 3,
      fillColor: '#55FF55',
      fillOpacity: 0.5
    });

    poly.setMap(map);
  }