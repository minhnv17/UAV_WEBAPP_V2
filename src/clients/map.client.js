module.exports = function() {
    // Location
    window.lat = 21.0066095;
    window.lng = 105.8431323;
    var map;
    // var mark;
    // var lineCoords = [];
    // var markers = [];
    // var newnum;
    const sensorGPS = [
        {lat: 21.0066095, lng: 105.8431323},
        {lat: 21.0065419, lng: 105.8432735},
        {lat: 21.0064809, lng: 105.8431522},
        {lat: 21.0065144, lng: 105.8429997}
    ];

    //create map
    // New map
    var initialize = function() {
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            center:{lat:lat,lng:lng},
            zoom:18
        });
        const image = {
            url: "/static/image/drone.png"
        };
        mark = new google.maps.Marker({
            position:{lat:lat, lng:lng}, 
            map:map,
            icon: image,
            shouldFocus: false
        });
        for (let i = 0; i<sensorGPS.length; i++){
            newSensor(sensorGPS[i], i)
        }
    };
    window.initialize = initialize;

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
        // sensors.addListener("click", () => {
        //     showAndUpdateData(num)
        //     infowindow.open({
        //         anchor: sensors,
        //         map
        //     });
        // });
    }
}