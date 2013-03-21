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
}