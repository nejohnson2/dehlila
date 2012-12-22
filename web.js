var express = require('express');
require('./elizabot.js');
require('./elizadata.js');

// Twilio
var Twilio = require('twilio-js');
Twilio.AccountSid = "ACad716cc4da934be6ad19bf5353312248";
Twilio.AuthToken  = "3af91684fa2d040f587bf96955cffd82";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
/*
	var body, to, from;
	
	// This goes through the Twilio Database and pulls out all texts sent to twilio
	Twilio.SMS.all(function(err, res) {
		console.log('body : ' + res.smsMessages[0].body);
		console.log('to : ' + res.smsMessages[0].to);
		console.log('from : ' + res.smsMessages[0].from);	
		
	  }, {accountSid: Twilio.AccountSid, to: '+16464309130'});
	  
	  
	Twilio.SMS.create({to: from, from: to, body: body}, function(err,res) {
		console.log('Up Up and Away...SMS Sent!');
	});	  
*/


  response.send('Hello Dynamic Web Class!');
});

app.post('/', function(request, response) {
	
	var body = request.body.Body;
	var from = request.body.From;
	var to = request.body.To;
	
/*
	
	// This goes through the Twilio Database and pulls out all texts sent to twilio
	Twilio.SMS.all(function(err, res) {
		console.log('body : ' + res.smsMessages[0].body);
		console.log('to : ' + res.smsMessages[0].to);
		console.log('from : ' + res.smsMessages[0].from);	
		
	  }, {accountSid: Twilio.AccountSid, to: '+16464309130'});
	  
*/

	console.log('body : ' + body); 
	console.log('from : ' + from); 
	console.log('to : ' + to); 		 

/*
	Twilio.SMS.create({to: from, from: to, body: body}, function(err,res) {
		console.log('Up Up and Away...SMS Sent!');
	});	 
*/



  response.send('Hello Dynamic Web Class!');
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});