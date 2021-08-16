/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/clients/map.client.js":
/*!***********************************!*\
  !*** ./src/clients/map.client.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAndUpdateData = __webpack_require__(/*! ./showAndUpdateData.client */ \"./src/clients/showAndUpdateData.client.js\")\r\nconst publish_data = __webpack_require__(/*! ./publish_data.client */ \"./src/clients/publish_data.client.js\")\r\nconst trackingUAV = __webpack_require__(/*! ./trackingUAV.client */ \"./src/clients/trackingUAV.client.js\");\r\nconst tracking = __webpack_require__(/*! ./trackingUAV.client */ \"./src/clients/trackingUAV.client.js\");\r\n\r\nmodule.exports = function () {\r\n    // Location start\r\n    window.lat = 21.0065064;\r\n    window.lng = 105.8431323;\r\n    var map;\r\n    var lineCoords = [];\r\n    const sensorGPS = [\r\n        { lat: 21.0066095, lng: 105.8431323 },\r\n        { lat: 21.0065419, lng: 105.8432735 },\r\n        { lat: 21.0064809, lng: 105.8431522 },\r\n        { lat: 21.0065144, lng: 105.8429997 }\r\n    ];\r\n\r\n    // New map\r\n    var initialize = function () {\r\n        map = new google.maps.Map(document.getElementById('map-canvas'), {\r\n            center: { lat: lat, lng: lng },\r\n            zoom: 18\r\n        });\r\n        // Draw path control drone\r\n        var drawingManager = new google.maps.drawing.DrawingManager({\r\n            drawingMode: google.maps.drawing.OverlayType.POLYLINE,\r\n            drawingControl: true,\r\n            drawingControlOptions: {\r\n                position: google.maps.ControlPosition.TOP_CENTER,\r\n                drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON]\r\n            },\r\n            polylineOptions: {\r\n                strokeWeight: 2,\r\n                strokeColor: '#ee9900',\r\n                clickable: false,\r\n                zIndex: 1,\r\n                editable: false\r\n            },\r\n            polygonOptions: {\r\n                editable: false\r\n            }\r\n        });\r\n        drawingManager.setMap(map)\r\n\r\n        google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function (line) {\r\n            path = line.getPath();\r\n            var t = \"\";\r\n            for (var i = 0; i < path.length; i++) {\r\n                t += path.getAt(i) + \"\\n\";\r\n            }\r\n            data = { path: t }\r\n            publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)\r\n        });\r\n\r\n        const image = {\r\n            url: \"/static/image/drone.png\"\r\n        };\r\n        mark = new google.maps.Marker({\r\n            position: { lat: lat, lng: lng },\r\n            map: map,\r\n            icon: image,\r\n            shouldFocus: false\r\n        });\r\n        for (let i = 0; i < sensorGPS.length; i++) {\r\n            newSensor(sensorGPS[i], i)\r\n        }\r\n    };\r\n\r\n    //Set new marker sensor\r\n    function newSensor(position, num) {\r\n        var sensors = new google.maps.Marker({\r\n            position: position,\r\n            map,\r\n        })\r\n        const contentString = '<div id=\"content\">' +\r\n            '<div id=\"siteNotice\">' +\r\n            \"</div>\" +\r\n            `<h4 id=\"firstHeading\">Sensor ${num}</h4>` +\r\n            '<div id=\"bodyContent\">' +\r\n            `<p>State: ON</p>` +\r\n            `<p>LAT: ${position.lat}</p>` +\r\n            `<p>LAT: ${position.lng}</p>` +\r\n            \"(last time update 29/6/2021)</p>\" +\r\n            \"</div>\" +\r\n            \"</div>\";\r\n        const infowindow = new google.maps.InfoWindow({\r\n            content: contentString,\r\n        });\r\n        sensors.addListener(\"click\", () => {\r\n            showAndUpdateData(num)\r\n            infowindow.open({\r\n                anchor: sensors,\r\n                map\r\n            });\r\n        });\r\n    }\r\n\r\n    window.initialize = initialize;\r\n\r\n    // Function to tracking uav position\r\n    // var tracking_btn = $('#tracking-uav')\r\n    trackingUAV(map, lineCoords)\r\n    // var isTracking = false\r\n    // tracking_btn.on('click', () => {\r\n    //     if (!isTracking) {\r\n    //         isTracking = true\r\n    //         tracking_btn.removeClass('btn-success').addClass('btn-danger')\r\n    //         tracking_btn.text('Stop Tracking')\r\n            \r\n    //     }\r\n    //     else if (isTracking) {\r\n    //         isTracking = false\r\n    //         tracking_btn.removeClass('btn-danger').addClass('btn-success')\r\n    //         tracking_btn.text('Start Tracking')\r\n    //         trackingUAV(map, lineCoords, isTracking)\r\n    //     }\r\n    // })\r\n}\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/map.client.js?");

/***/ }),

/***/ "./src/clients/publish_data.client.js":
/*!********************************************!*\
  !*** ./src/clients/publish_data.client.js ***!
  \********************************************/
/***/ ((module) => {

eval("async function postData(url = '', data = {}) {\r\n    // Default options are marked with *\r\n    const response = await fetch(url, {\r\n        method: 'POST', // *GET, POST, PUT, DELETE, etc.\r\n        mode: 'cors', // no-cors, *cors, same-origin\r\n        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\r\n        credentials: 'same-origin', // include, *same-origin, omit\r\n        headers: {\r\n        'Content-Type': 'application/json'\r\n    },\r\n        redirect: 'follow', // manual, *follow, error\r\n        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url\r\n        body: JSON.stringify(data) // body data type must match \"Content-Type\" header\r\n    });\r\n    return response.json(); // parses JSON response into native JavaScript objects\r\n}\r\n\r\nmodule.exports = postData\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/publish_data.client.js?");

/***/ }),

/***/ "./src/clients/showAndUpdateData.client.js":
/*!*************************************************!*\
  !*** ./src/clients/showAndUpdateData.client.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const subscribe_data = __webpack_require__(/*! ./subscribe_data.client */ \"./src/clients/subscribe_data.client.js\")\r\n\r\nfunction showAndUpdateData(sensor_num){\r\n    var info_sensor = $('.data-sensor')\r\n    $('.data-sensor .pos-1').text(`Sensor number ${sensor_num}`)\r\n    subscribe_data(sensor_num)\r\n    .then((res)=>{\r\n        $('#key1').text(`Dust: ${res.Dust1[0][1]}`)\r\n        $('#key2').text(`Humidity: ${res.Humidity1[0][1]}`)\r\n        $('#key3').text(`Pressure: ${res.Pressure1[0][1]}`)\r\n        $('#key4').text(`Temperature: ${res.Temperature1[0][1]}`)    \r\n        $('#key5').text(`PoF: ${res.PoF[0][1]}%`)\r\n        $('#key6').text(`CoF: ${res.CoF[0][1]}`)\r\n        $('#key7').text(`inspection_plan: ${res.inspection_plan[0][1]}`)\r\n    })\r\n    info_sensor.show()\r\n}\r\n\r\nmodule.exports = showAndUpdateData\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/showAndUpdateData.client.js?");

/***/ }),

/***/ "./src/clients/subscribe_data.client.js":
/*!**********************************************!*\
  !*** ./src/clients/subscribe_data.client.js ***!
  \**********************************************/
/***/ ((module) => {

eval("function subscribe_data(sensor_num) {\r\n    var entityId;\r\n    switch (sensor_num) {\r\n        case 0:\r\n            entityId = \"23f06860-dd67-11eb-bb75-a1672e109977\"\r\n            break\r\n        case 1:\r\n            entityId = \"21905a70-de3a-11eb-bb75-a1672e109977\"\r\n            break\r\n        case 2:\r\n            entityId = \"64f8f9c0-de3a-11eb-bb75-a1672e109977\"\r\n            break\r\n        case 3:\r\n            entityId = \"b5688f10-de3a-11eb-bb75-a1672e109977\"\r\n            break\r\n        default:\r\n            entityId = \"23f06860-dd67-11eb-bb75-a1672e109977\"\r\n    }\r\n    return new Promise((resolve, reject) => {\r\n        var token = \"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2Mjg1MjE1OTksImV4cCI6MTYzMDMyMTU5OX0.MrabIj_IPQ79wvlZzX31bREesWwitWU_vpmPg8meW9Qt-VrFdhvifMkCzcYOyzCNx_x1Dz7H6g4mWt3z1QMamQ\";\r\n        var webSocket = new WebSocket(\"wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=\" + token);\r\n        webSocket.onopen = function () {\r\n            var object = {\r\n                tsSubCmds: [\r\n                    {\r\n                        entityType: \"DEVICE\",\r\n                        entityId: entityId,\r\n                        scope: \"LATEST_TELEMETRY\",\r\n                        cmdId: 10\r\n                    }\r\n                ],\r\n                historyCmds: [],\r\n                attrSubCmds: []\r\n            };\r\n            var data = JSON.stringify(object);\r\n            webSocket.send(data);\r\n        };\r\n\r\n        webSocket.onmessage = function (event) {\r\n            var received_msg = event.data;\r\n            received_msg = JSON.parse(received_msg)\r\n            received_msg = received_msg.data\r\n            resolve(received_msg)\r\n        };\r\n        webSocket.onclose = function (event) {\r\n            console.log(\"Connection is closed! Please reload...\");\r\n        };\r\n    })\r\n}\r\n\r\nmodule.exports = subscribe_data\r\n\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/subscribe_data.client.js?");

/***/ }),

/***/ "./src/clients/trackingUAV.client.js":
/*!*******************************************!*\
  !*** ./src/clients/trackingUAV.client.js ***!
  \*******************************************/
/***/ ((module) => {

eval("function tracking(map, lineCoords) {\r\n    var trackingUAV = new Promise((resolve, reject) => {\r\n        var token = \"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2Mjg1MjE1OTksImV4cCI6MTYzMDMyMTU5OX0.MrabIj_IPQ79wvlZzX31bREesWwitWU_vpmPg8meW9Qt-VrFdhvifMkCzcYOyzCNx_x1Dz7H6g4mWt3z1QMamQ\";\r\n        var entityId = \"e526c210-dd65-11eb-bb75-a1672e109977\"\r\n        var webSocket = new WebSocket(\"wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=\" + token);\r\n        webSocket.onopen = function () {\r\n            var object = {\r\n                tsSubCmds: [\r\n                    {\r\n                        entityType: \"DEVICE\",\r\n                        entityId: entityId,\r\n                        scope: \"LATEST_TELEMETRY\",\r\n                        cmdId: 10\r\n                    }\r\n                ],\r\n                historyCmds: [],\r\n                attrSubCmds: []\r\n            };\r\n            var data = JSON.stringify(object);\r\n            webSocket.send(data);\r\n        };\r\n\r\n        webSocket.onmessage = function (event) {\r\n            var received_msg = event.data;\r\n            received_msg = JSON.parse(received_msg)\r\n            received_msg = received_msg.data\r\n            resolve(received_msg)\r\n        };\r\n        webSocket.onclose = function (event) {\r\n            console.log(\"Connection is closed! Please reload...\");\r\n        };\r\n    })\r\n\r\n    trackingUAV\r\n        .then((res) => {\r\n            var gps = {\r\n                lat: parseFloat(res.Lat_UAV[0][1]),\r\n                lng: parseFloat(res.Lon_UAV[0][1])\r\n            }\r\n            setGPS(gps)\r\n            redraw(gps, map, lineCoords)\r\n            tracking(map, lineCoords)\r\n        })\r\n        .catch(err => console.log(err))\r\n}\r\n\r\n// Draw map\r\nvar redraw = function (payload, map, lineCoords) {\r\n    if (payload != null) {\r\n        lat = payload.lat;\r\n        lng = payload.lng;\r\n        // map.setCenter({lat:lat, lng:lng, alt:0});\r\n        mark.setPosition({ lat: lat, lng: lng, alt: 0 });\r\n        lineCoords.push(new google.maps.LatLng(lat, lng));\r\n        var lineCoordinatesPath = new google.maps.Polyline({\r\n            path: lineCoords,\r\n            geodesic: true,\r\n            strokeColor: '#2E10FF'\r\n        });\r\n        lineCoordinatesPath.setMap(map);\r\n    }\r\n};\r\n\r\n//set new GPS drone\r\nfunction setGPS(gps) {\r\n    document.getElementById(\"lat\").innerHTML = gps.lat;\r\n    document.getElementById(\"lng\").innerHTML = gps.lng;\r\n}\r\nmodule.exports = tracking\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/trackingUAV.client.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const publish_data = __webpack_require__(/*! ./clients/publish_data.client */ \"./src/clients/publish_data.client.js\")\r\nconst map = __webpack_require__(/*! ./clients/map.client */ \"./src/clients/map.client.js\")\r\nmap()\r\n\r\n/* Publish data */\r\n$('#btn-publish').on('click', () => {\r\n    node = $('#new-node').val()\r\n    data = { route: node }\r\n    publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)\r\n})\r\n\r\n$('#flying').on('click', fly_API)\r\nfunction fly_API() {\r\n    input_fly = $('.publish-data')\r\n    if (input_fly.is(\":visible\")) {\r\n        input_fly.hide()\r\n    }\r\n    else if (input_fly.is(\":hidden\")) {\r\n        input_fly.show()\r\n    }\r\n}\r\n\r\n\r\n\r\n// Navbar\r\nconst linkColor = document.querySelectorAll(\".nav__link\");\r\nfunction colorLink() {\r\n    linkColor.forEach(l => l.classList.remove(\"active\"))\r\n    this.classList.add(\"active\")\r\n}\r\nlinkColor.forEach(l => l.addEventListener(\"click\", colorLink))\r\n\n\n//# sourceURL=webpack://uav_webapp_v2/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;