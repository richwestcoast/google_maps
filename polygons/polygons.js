  var coordinatesComplete = [];
  var experimentContainer = [];
  var polysComplete = [];
  var visiblePolys = [];
  var polysCompleteTemp = [];
  var drawingManager;
  var map;

  //Created from drawing manager////
  var visiblePolygons = [];
  //////////////////////////////////

  $('document').ready(function(){
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: new google.maps.LatLng(53.762108,-2.705383),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    $('#save').click(function(){ saveData(); });
    $('#load').click(function(){ loadData(); });

    drawingManager = createDrawingManager();

    drawingManager.setMap(map);
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      
      coordinatesComplete = [];
      var coordinates = [];

      $.each(polygon.getPath().getArray(), function(o, i){ coordinates.push([i.kb, i.lb]); });
      
      polysComplete.push(coordinates);

      updatePolyPoints();

      coordinatesComplete = buildGMapCoordinatesFromLatLonArray(polysComplete);

      console.log(coordinatesComplete);
      polygon.setMap(null);
      $.each(visiblePolygons, function(increment, polygon){
        
        polygon.setPath([new google.maps.LatLng(25.774252, -80.190262)]);
        polygon.setMap(null);

        console.log('setting map null' + polysComplete.length);
      });
      //visiblePolygons = [];
      
      createSimplyPolygon(coordinatesComplete, map)
      

    });
  })

  function updatePolyPoints(){
    //polysComplete = [];
    var coordinates = [];

    $.each(visiblePolygons, function(increment, polygon){
      console.log();
      if(polygon.getPath().getArray().length <= 1){ console.log('skip this poly (map = null)'); }
      else{
          coordinates = [];
          $.each(polygon.getPath().getArray(), function(o, i){ coordinates.push([i.kb, i.lb]); });
          polysComplete.push(coordinates);
      }
    })
  }

  function buildGMapCoordinatesFromLatLonArray(coords){
    var coordinatesComplete = [];
    
    $.each(coords, function(o, i){
      coordinates = [];
      $.each(i, function(o, coord){
        coordinates.push(new google.maps.LatLng(coord[0], coord[1]));
      });
      coordinatesComplete.push(coordinates);
    });
    return coordinatesComplete;
  }

  function createSimplyPolygon(polygons, map){
    var poly = new google.maps.Polygon({
      paths: polygons,
      editable: true,
    });

    poly.setMap(map);
    visiblePolygons.push(poly);
    console.log('created new poly');
  }

  function saveData(){
    updatePolyPoints();
    $.ajax({
      url: "coords.php",
      context: document.body,
      data: { coords: polysComplete }
    }).done(function(data) {
      console.log(data);
    });
  }

  function loadData(){
   $.ajax({
      url: "coords.php",
      context: document.body,
    }).done(function(jsonData) {
      console.log(jsonData);
      var data = $.parseJSON(jsonData);
      $.each(data, function(i,o){
        console.log(o);
      });
      console.log(polysComplete);
    }); 
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

    /*
    var poly = new google.maps.Polygon({
      paths: paths,
      strokeWeight: 3,
      fillColor: '#55FF55',
      fillOpacity: 0.5
    });
    */



    /*
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
  
    //console.log(buildGMapCoordinatesFromLatLonArray(experimentContainer));
    //initialPolys.push(createSimplyPolygon(buildGMapCoordinatesFromLatLonArray(experimentContainer), map));

    */