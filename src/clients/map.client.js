const subscribe_data = require('./subscribe_data.client')

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

        const image = {
            url: "/static/image/drone.png"
        };
        var mark = new google.maps.Marker({
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

    function showAndUpdateData(sensor_num){
        var info_sensor = $('.data-sensor')
        $('.data-sensor .pos-1').text(`Sensor number ${sensor_num}`)
        subscribe_data(sensor_num)
        .then((res)=>{
            $('#key1').text(`Dust: ${res.Dust1[0][1]}`)
            $('#key2').text(`Humidity: ${res.Humidity1[0][1]}`)
            $('#key3').text(`Pressure: ${res.Pressure1[0][1]}`)
            $('#key4').text(`Temperature: ${res.Temperature1[0][1]}`)    
            $('#key5').text(`PoF: ${res.PoF[0][1]}%`)
            $('#key6').text(`CoF: ${res.CoF[0][1]}`)
            $('#key7').text(`inspection_plan: ${res.inspection_plan[0][1]}`)
        })
        info_sensor.show()
    }

    window.initialize = initialize;
}