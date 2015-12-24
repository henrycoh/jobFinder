var express = require('express');
var jobModel = require("./models/Job");
var jobsData = require("./jobs-data.js");

var app = express();

require("./jobs-service.js")(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://psdev:psdev@ds027335.mongolab.com:27335/jobfinder')
.then(function() {
    console.log('connect to mongodb successfully!');
    jobsData.seedJobs();
})

app.listen(process.env.PORT, process.env.IP);