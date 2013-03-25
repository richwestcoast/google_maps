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
    $('#saveState').click(function(){ updatePolyPoints(); })

    drawingManager = createDrawingManager();

    drawingManager.setMap(map);
    
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {

      updatePolyPoints();
      
      coordinatesComplete = [];
      var coordinates = [];

      $.each(polygon.getPath().getArray(), function(o, i){ coordinates.push([i.kb, i.lb]); });
      polysComplete.push(coordinates);
      
      polygon.setMap(null);

      constructPolys();
    });

    loadData();

  })

  function constructPolys(){
    coordinatesComplete = buildGMapCoordinatesFromLatLonArray(polysComplete);
    
    $.each(visiblePolygons, function(increment, polygon){
      if(typeof polygon === 'undefined'){
        return;
      }else{
        polygon.setMap(null);
        console.log('setting map null' + polysComplete.length);
      }
    });
    
    createSimplyPolygon(coordinatesComplete, map)
  }

  function updatePolyPoints(){
    polysComplete = [];
    var coordinates = [];

    $.each(visiblePolygons, function(increment, polygon){
      if(typeof polygon === 'undefined'){
        return;
      }

      if(polygon.getMap()){        

        var vertices = polygon.getPaths();
        console.log(vertices.length);
        for (var i =0; i < vertices.length; i++) {
          coordinates = [];
          $.each(vertices.getAt(i).getArray(), function (inc, polygon){
            coordinates.push([polygon.kb, polygon.lb]);
          });
          polysComplete.push(coordinates);
        }

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
      polysComplete = data;
      constructPolys();
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