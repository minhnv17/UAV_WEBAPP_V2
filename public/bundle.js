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

eval("const showAndUpdateData = __webpack_require__(/*! ./showAndUpdateData.client */ \"./src/clients/showAndUpdateData.client.js\")\nconst publish_data = __webpack_require__(/*! ./publish_data.client */ \"./src/clients/publish_data.client.js\")\n\nmodule.exports = function () {\n    // Location\n    window.lat = 21.0065064;\n    window.lng = 105.8431323;\n    var map;\n    const sensorGPS = [\n        { lat: 21.0066095, lng: 105.8431323 },\n        { lat: 21.0065419, lng: 105.8432735 },\n        { lat: 21.0064809, lng: 105.8431522 },\n        { lat: 21.0065144, lng: 105.8429997 }\n    ];\n\n    //create map\n    // New map\n    var initialize = function () {\n        map = new google.maps.Map(document.getElementById('map-canvas'), {\n            center: { lat: lat, lng: lng },\n            zoom: 18\n        });\n        // Draw path control drone\n        var drawingManager = new google.maps.drawing.DrawingManager({\n            drawingMode: google.maps.drawing.OverlayType.POLYLINE,\n            drawingControl: true,\n            drawingControlOptions: {\n                position: google.maps.ControlPosition.TOP_CENTER,\n                drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON]\n            },\n            polylineOptions: {\n                strokeWeight: 2,\n                strokeColor: '#ee9900',\n                clickable: false,\n                zIndex: 1,\n                editable: false\n            },\n            polygonOptions: {\n                editable: false\n            }\n        });\n        drawingManager.setMap(map)   \n\n        google.maps.event.addDomListener(drawingManager, 'polylinecomplete', function (line) {\n            path = line.getPath();\n            var t = \"\";\n            for (var i = 0; i < path.length; i++) {\n                t += path.getAt(i) + \"\\n\";\n            }\n            data = {path: t}\n            publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)\n        });\n\n        const image = {\n            url: \"/static/image/drone.png\"\n        };\n        mark = new google.maps.Marker({\n            position: { lat: lat, lng: lng },\n            map: map,\n            icon: image,\n            shouldFocus: false\n        });\n        for (let i = 0; i < sensorGPS.length; i++) {\n            newSensor(sensorGPS[i], i)\n        }\n    };\n\n    //Set new marker sensor\n    function newSensor(position, num) {\n        var sensors = new google.maps.Marker({\n            position: position,\n            map,\n        })\n        const contentString = '<div id=\"content\">' +\n            '<div id=\"siteNotice\">' +\n            \"</div>\" +\n            `<h4 id=\"firstHeading\">Sensor ${num}</h4>` +\n            '<div id=\"bodyContent\">' +\n            `<p>State: ON</p>` +\n            `<p>LAT: ${position.lat}</p>` +\n            `<p>LAT: ${position.lng}</p>` +\n            \"(last time update 29/6/2021)</p>\" +\n            \"</div>\" +\n            \"</div>\";\n        const infowindow = new google.maps.InfoWindow({\n            content: contentString,\n        });\n        sensors.addListener(\"click\", () => {\n            showAndUpdateData(num)\n            infowindow.open({\n                anchor: sensors,\n                map\n            });\n        });\n    }\n\n\n\n    window.initialize = initialize;\n}\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/map.client.js?");

/***/ }),

/***/ "./src/clients/publish_data.client.js":
/*!********************************************!*\
  !*** ./src/clients/publish_data.client.js ***!
  \********************************************/
/***/ ((module) => {

eval("async function postData(url = '', data = {}) {\n    // Default options are marked with *\n    const response = await fetch(url, {\n        method: 'POST', // *GET, POST, PUT, DELETE, etc.\n        mode: 'cors', // no-cors, *cors, same-origin\n        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached\n        credentials: 'same-origin', // include, *same-origin, omit\n        headers: {\n        'Content-Type': 'application/json'\n        // 'Content-Type': 'application/x-www-form-urlencoded',\n    },\n        redirect: 'follow', // manual, *follow, error\n        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url\n        body: JSON.stringify(data) // body data type must match \"Content-Type\" header\n    });\n    return response.json(); // parses JSON response into native JavaScript objects\n}\n\nmodule.exports = postData\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/publish_data.client.js?");

/***/ }),

/***/ "./src/clients/showAndUpdateData.client.js":
/*!*************************************************!*\
  !*** ./src/clients/showAndUpdateData.client.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const subscribe_data = __webpack_require__(/*! ./subscribe_data.client */ \"./src/clients/subscribe_data.client.js\")\n\nfunction showAndUpdateData(sensor_num){\n    var info_sensor = $('.data-sensor')\n    $('.data-sensor .pos-1').text(`Sensor number ${sensor_num}`)\n    subscribe_data(sensor_num)\n    .then((res)=>{\n        $('#key1').text(`Dust: ${res.Dust1[0][1]}`)\n        $('#key2').text(`Humidity: ${res.Humidity1[0][1]}`)\n        $('#key3').text(`Pressure: ${res.Pressure1[0][1]}`)\n        $('#key4').text(`Temperature: ${res.Temperature1[0][1]}`)    \n        $('#key5').text(`PoF: ${res.PoF[0][1]}%`)\n        $('#key6').text(`CoF: ${res.CoF[0][1]}`)\n        $('#key7').text(`inspection_plan: ${res.inspection_plan[0][1]}`)\n    })\n    info_sensor.show()\n}\n\nmodule.exports = showAndUpdateData\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/showAndUpdateData.client.js?");

/***/ }),

/***/ "./src/clients/subscribe_data.client.js":
/*!**********************************************!*\
  !*** ./src/clients/subscribe_data.client.js ***!
  \**********************************************/
/***/ ((module) => {

eval("function subscribe_data(sensor_num) {\n    var entityId;\n    switch (sensor_num) {\n        case 0:\n            entityId = \"23f06860-dd67-11eb-bb75-a1672e109977\"\n            break\n        case 1:\n            entityId = \"21905a70-de3a-11eb-bb75-a1672e109977\"\n            break\n        case 2:\n            entityId = \"64f8f9c0-de3a-11eb-bb75-a1672e109977\"\n            break\n        case 3:\n            entityId = \"b5688f10-de3a-11eb-bb75-a1672e109977\"\n            break\n        default:\n            entityId = \"23f06860-dd67-11eb-bb75-a1672e109977\"\n    }\n    return new Promise((resolve, reject) => {\n        var token = \"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2Mjg1MjE1OTksImV4cCI6MTYzMDMyMTU5OX0.MrabIj_IPQ79wvlZzX31bREesWwitWU_vpmPg8meW9Qt-VrFdhvifMkCzcYOyzCNx_x1Dz7H6g4mWt3z1QMamQ\";\n        var webSocket = new WebSocket(\"wss://demo.thingsboard.io/api/ws/plugins/telemetry?token=\" + token);\n        webSocket.onopen = function () {\n            var object = {\n                tsSubCmds: [\n                    {\n                        entityType: \"DEVICE\",\n                        entityId: entityId,\n                        scope: \"LATEST_TELEMETRY\",\n                        cmdId: 10\n                    }\n                ],\n                historyCmds: [],\n                attrSubCmds: []\n            };\n            var data = JSON.stringify(object);\n            webSocket.send(data);\n        };\n\n        webSocket.onmessage = function (event) {\n            var received_msg = event.data;\n            received_msg = JSON.parse(received_msg)\n            received_msg = received_msg.data\n            resolve(received_msg)\n        };\n        webSocket.onclose = function (event) {\n            console.log(\"Connection is closed! Please reload...\");\n        };\n    })\n}\n\nmodule.exports = subscribe_data\n\n\n//# sourceURL=webpack://uav_webapp_v2/./src/clients/subscribe_data.client.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const publish_data = __webpack_require__(/*! ./clients/publish_data.client */ \"./src/clients/publish_data.client.js\")\nconst map = __webpack_require__(/*! ./clients/map.client */ \"./src/clients/map.client.js\")\nmap()\n\n/* Publish data */\n$('#btn-publish').on('click', () => {\n    node = $('#new-node').val()\n    data = { route: node }\n    publish_data('https://minh-api.herokuapp.com/api/v1/publish', data)\n})\n\n$('#flying').on('click', fly_API)\nfunction fly_API() {\n    input_fly = $('.publish-data')\n    if (input_fly.is(\":visible\")) {\n        input_fly.hide()\n    }\n    else if (input_fly.is(\":hidden\")) {\n        input_fly.show()\n    }\n}\n\n// Draw map\nvar redraw = function (payload) {\n    if (payload != null) {\n        lat = payload.lat;\n        lng = payload.lng;\n        // map.setCenter({lat:lat, lng:lng, alt:0});\n        mark.setPosition({ lat: lat, lng: lng, alt: 0 });\n        lineCoords.push(new google.maps.LatLng(lat, lng));\n        var lineCoordinatesPath = new google.maps.Polyline({\n            path: lineCoords,\n            geodesic: true,\n            strokeColor: '#2E10FF'\n        });\n        lineCoordinatesPath.setMap(map);\n    }\n};\n\n//set new GPS drone\nfunction setGPS(gps) {\n    document.getElementById(\"lat\").innerHTML = gps.lat;\n    document.getElementById(\"lng\").innerHTML = gps.lng;\n}\n\n// Navbar\nconst linkColor = document.querySelectorAll(\".nav__link\");\nfunction colorLink() {\n    linkColor.forEach(l => l.classList.remove(\"active\"))\n    this.classList.add(\"active\")\n}\nlinkColor.forEach(l => l.addEventListener(\"click\", colorLink))\n\n\n//# sourceURL=webpack://uav_webapp_v2/./src/index.js?");

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