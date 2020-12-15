// module import
const express = require('express')
const chalk = require('chalk')
const {connectDatabase} = require('./models/Database')
const setRoute = require('./routes/setRoute')
// module import

// create app
const app = express()
// create app

// config
require('dotenv').config();
// config

// route setup
setRoute(app)
// route setup

// server create
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`server is running on port: ${PORT}`)
    console.log((await connectDatabase()).message)
    
})
// server create