require('./config/config')
const express = require('express')
const app = express()
const port = 3001

app.use(express.static(__dirname + '/dist'))
bodyparser = require('body-parser').json();

// const bcrypt = require('bcrypt');
const saltRounds = 10 

let eventRoutes = require('./server/routes/uploadRoutes.js')

app.use(bodyparser)
app.use(express.static("D:/percept/"))

app.use('/api/management', eventRoutes)

app.get('*', (req, res) => {
    res.sendFile('/dist/index.html', {root: __dirname})
})

var server = app.listen(port, function() {
    var host = 'localhost';
    var thisport = server.address().port;
    console.log(`Example app on port ${port}!`);
});