var mqtt = require('mqtt')

exports.publish = (req, res) => {
    var data = req.body
    data = JSON.stringify(data)
    var client  = mqtt.connect('mqtt://demo.thingsboard.io',{
        username: "4oEJi3aA5Gya2hpY3jRU"
    })
    console.log(data)
    client.on('connect', function () {
        console.log('connected')
        client.publish('v1/devices/me/telemetry', data)
        client.end()
    })
    res.send("duoc")
}