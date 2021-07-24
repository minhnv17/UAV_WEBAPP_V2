const express = require('express')
const app = express()
const mqtt_router = require('./src/routers/mqtt.router')
const bodyParser = require('body-parser')
 
var port = process.env.PORT || 3000
// App using
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', mqtt_router)

// App router
app.get('/', (req, res)=>{
    res.send("ok")
})


app.listen(port, ()=>{
    console.log(`server listen on port ${port}`)
})