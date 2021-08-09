function subscribe_data(sensor_num) {
    var entityId;
    switch (sensor_num) {
        case 0:
            entityId = "23f06860-dd67-11eb-bb75-a1672e109977"
            break
        case 1:
            entityId = "21905a70-de3a-11eb-bb75-a1672e109977"
            break
        case 2:
            entityId = "64f8f9c0-de3a-11eb-bb75-a1672e109977"
            break
        case 3:
            entityId = "b5688f10-de3a-11eb-bb75-a1672e109977"
            break
        default:
            entityId = "23f06860-dd67-11eb-bb75-a1672e109977"
    }
    return new Promise((resolve, reject) => {
        var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2Mjg1MjE1OTksImV4cCI6MTYzMDMyMTU5OX0.MrabIj_IPQ79wvlZzX31bREesWwitWU_vpmPg8meW9Qt-VrFdhvifMkCzcYOyzCNx_x1Dz7H6g4mWt3z1QMamQ";
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
}

module.exports = subscribe_data
