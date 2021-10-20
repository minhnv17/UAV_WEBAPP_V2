function tracking(map, lineCoords) {
    var trackingUAV = new Promise((resolve, reject) => {
        var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2MzQ3MTUyNzQsImV4cCI6MTYzNjUxNTI3NH0.NSfw4O7ZcikO7brENcDc1oOhvmrXI92FyWIANxQWxeTfrrHivfA5746oXb5KWpd2WiAsE6VkqjQIz3ICy-iErA";
        var entityId = "e526c210-dd65-11eb-bb75-a1672e109977"
        var webSocket = new WebSocket("wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=" + token);
        webSocket.onopen = function () {
            var object = {
                tsSubCmds: [
                    {
                        entityType: "DEVICE",
                        entityId: entityId,
                        scope: "LATEST_TELEMETRY",
                        cmdId: 10
                    }
                ],
                historyCmds: [],
                attrSubCmds: []
            };
            var data = JSON.stringify(object);
            webSocket.send(data);
        };

        webSocket.onmessage = function (event) {
            var received_msg = event.data;
            received_msg = JSON.parse(received_msg)
            received_msg = received_msg.data
            resolve(received_msg)
        };
        webSocket.onclose = function (event) {
            console.log("Connection is closed! Please reload...");
        };
    })

    trackingUAV
        .then((res) => {
            var gps = {
                lat: parseFloat(res.Lat_UAV[0][1]),
                lng: parseFloat(res.Lon_UAV[0][1])
            }
            console.log(gps)
            setGPS(gps)
            redraw(gps, map, lineCoords)
        })
        .catch(err => console.log(err))
}

// Draw map
var redraw = function (payload, map, lineCoords) {
    if (payload != null) {
        lat = payload.lat;
        lng = payload.lng;
        // map.setCenter({lat:lat, lng:lng, alt:0});
        mark.setPosition({ lat: lat, lng: lng, alt: 0 });
        lineCoords.push(new google.maps.LatLng(lat, lng));
        var lineCoordinatesPath = new google.maps.Polyline({
            path: lineCoords,
            geodesic: true,
            strokeColor: '#2E10FF'
        });
        lineCoordinatesPath.setMap(map);
    }
};

//set new GPS drone
function setGPS(gps) {
    document.getElementById("lat").innerHTML = gps.lat;
    document.getElementById("lng").innerHTML = gps.lng;
}
module.exports = tracking