var mqtt = require('mqtt')

exports.publish = (req, res) => {
    var data = req.body
    data = JSON.stringify(data)
    var client  = mqtt.connect('mqtt://demo.thingsboard.io',{
        username: "WHLwNcC2wBhHqfGnYiOV"
    })
    client.on('connect', function () {
        client.publish('v1/devices/me/telemetry', data)
        client.end()
    })
    res.send("Publish data success!!")
}
