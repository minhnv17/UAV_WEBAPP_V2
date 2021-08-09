const subscribe_data = require('./subscribe_data.client')

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

module.exports = showAndUpdateData