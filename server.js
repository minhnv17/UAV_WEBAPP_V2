const express = require('express')
const app = express()
const mqtt_router = require('./src/routers/mqtt.router')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')


var port = process.env.PORT || 3000

// CORS
app.options('*', cors()) // include before other routes

// App using
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', mqtt_router)

// App router
app.get('/', (req, res)=>{
    res.render('home')
})


app.listen(port, ()=>{
    console.log(`server listen on port ${port}`)
})