// module import
const express = require('express')
const setRoute = require('./routes/setRoute')
// module import

// create app
const app = express()
// create app

// route setup
setRoute(app)
// route setup

// server create
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
// server create