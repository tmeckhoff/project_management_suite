/**
 * Created by lukedowell on 7/30/15.
 */
var express = require('express');
var path = require('path');
var employeeFactory = require('./modules/employeefactory');
var parser = require('body-parser');
var app = express();

app.use(parser.json());

//Set data
app.set('port', (process.env.PORT || 5000));

//Routing
app.post("/employee-request", function(req, res) {
    var list = req.body.list.split(",");
    var employees = [];
    for(var i = 0; i < list.length; i++) {
        employees.push(employeeFactory(list[i]));
    }
    console.log(employees);
    res.send(employees);
});

app.get('/*', function(req, res) {
    var file = req.params[0] || "./views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

//Start web server
var server = app.listen(app.get('port'), function() {
    console.log("Now listening on port: " + app.get('port'));
});

