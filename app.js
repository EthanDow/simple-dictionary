//Requirements
var express = require("express");
//Creating and applications instance 
var cors = require("cors");
var bodyParser = require("body-parser"); 
var app = express(); 
//Add middlewares 

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false})); 

app.use(function(req, res, next){
	console.log(`${req.method} request for "${req.url}"`); 
	next(); 
}); 
app.use(express.static("./public")); 

//----------------------
//=====DATABASE=========
//----------------------

var skierTerms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];

//----------------------
//=====ROUTING==========
//----------------------

//GET

app.use(cors()); 

app.get("/dictionary-api", function(req, res){
	res.json(skierTerms); 
}); 

//POST

app.post("/dictionary-api", function(req, res){
	skierTerms.push(req.body); 
	res.json(skierTerms); 
}); 

//DELETE 

app.delete("/dictionary-api:term", function(req, res){
	skierTerms = skierTerms.filter(function(definition){
		return definition.term.toLowerCase() !== req.params.term.toLowerCase(); 
	}); 

	res.json(skierTerms);  
}); 


//start listening 
app.listen(3000);
console.log("Express app running on port 3000...");  
module.export = app; 

