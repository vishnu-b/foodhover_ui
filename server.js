var express = require("express");
var nunjucks = require("nunjucks");
var app = express();

// configuration
app.use(express.static(__dirname + '/public'));

nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});



require('./app/routes')(app);

var server = app.listen(3000, function(){
    console.log("Server started on port 3000");
});

exports = module.exports = app;
