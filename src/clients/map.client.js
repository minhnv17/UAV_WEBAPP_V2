const showAndUpdateData = require('./showAndUpdateData.client')
const publish_data = require('./publish_data.client')

module.exports = function () {
    // Location
    window.lat = 21.0065064;
    window.lng = 105.8431323;
    var map;
    const sensorGPS = [
        { lat: 21.0066095, lng: 105.8431323 },
        { lat: 21.0065419, lng: 105.8432735 },
        { lat: 21.0064809, lng: 105.8431522 },
        { lat: 21.0065144, lng: 105.8429997 }
    ];

    //create map
    // New map
    var initialize = function () {
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: { lat: lat, lng: lng },
            zoom: 18
        });
        // Draw path control drone
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON]
            },
            polylineOptions: {
                strokeWeight: 2,
                strokeColor: '#ee9900',
                clickable: false,
                zIndex: 1,
                editable: false
            },
            polygonOptions: {
                editable: false
            }
        });
        drawingManager.setMap(map)   

        google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function (line) {
            path = line.getPath();
            var t = "";
            for (var i = 0; i < path.length; i++) {
                t += path.getAt(i) + "\n";
            }
            data = {path: t}
            publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)
        });

        const image = {
            url: "/static/image/drone.png"
        };
        mark = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            icon: image,
            shouldFocus: false
        });
        for (let i = 0; i < sensorGPS.length; i++) {
            newSensor(sensorGPS[i], i)
        }
    };

    //Set new marker sensor
    function newSensor(position, num) {
        var sensors = new google.maps.Marker({
            position: position,
            map,
        })
        const contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            `<h4 id="firstHeading">Sensor ${num}</h4>` +
            '<div id="bodyContent">' +
            `<p>State: ON</p>` +
            `<p>LAT: ${position.lat}</p>` +
            `<p>LAT: ${position.lng}</p>` +
            "(last time update 29/6/2021)</p>" +
            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        sensors.addListener("click", () => {
            showAndUpdateData(num)
            infowindow.open({
                anchor: sensors,
                map
            });
        });
    }



    window.initialize = initialize;
}