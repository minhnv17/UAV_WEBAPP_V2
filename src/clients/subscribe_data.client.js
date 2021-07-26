function subscribe_data(entityId) {
    return new Promise((resolve, reject) => {
        var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaW5oLm5uMjgwMzk5QGdtYWlsLmNvbSIsInNjb3BlcyI6WyJURU5BTlRfQURNSU4iXSwidXNlcklkIjoiYmJhYTFlNTAtZDY1My0xMWViLTkzODEtYWIyYTFhOGRhYWYwIiwiZmlyc3ROYW1lIjoiTmd1eWVuIiwibGFzdE5hbWUiOiJOaGF0IExpbmgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJiYTgyOGU0MC1kNjUzLTExZWItOTM4MS1hYjJhMWE4ZGFhZjAiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIiwiaXNzIjoidGhpbmdzYm9hcmQuaW8iLCJpYXQiOjE2MjY2ODM2OTMsImV4cCI6MTYyODQ4MzY5M30.xZ9pfUfUajQ4h7TUhMeTbX6z0shas91epHGp-hVMTDoRYjITybPr-brRp9WM2h8ddEHNUDupRziF4tBaSge4Aw";
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
