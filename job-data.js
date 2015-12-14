var mongoose = require("mongoose");
var Promise = require("bluebird");

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
}

exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, { context: mongoose });

var createJob = Promise.promisify(Job.create, { context: Job });

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if (collection.length === 0) {
            return Promise.map(jobs, function(job){
                return createJob(job);
            })
        }
    });
}

var jobs = [
    {title:'Cook', description:'You will be making bagels'},
    {title:'Waiter', description:'You will be putting food on petople tab'},
    {title:'Programmer', description:'You will be programming'},
    {title:'Axe Maker', description:'We need axes made'}
];