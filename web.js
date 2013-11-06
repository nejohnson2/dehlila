var express = require('express');
var ejs = require('ejs');
var exec = require("child_process").exec;

// Twilio account info
var Twilio = require('twilio-js');

Twilio.AccountSid = process.env.Twilio_AccountSid;
Twilio.AuthToken  = process.env.Twilio_AuthToken;

var app = express.createServer(express.logger());

/*********** SERVER CONFIGURATION *****************/
app.configure(function() {
    
    /*********************************************************************************
        Configure the template engine
        We will use EJS (Embedded JavaScript) https://github.com/visionmedia/ejs
        
        Using templates keeps your logic and code separate from your HTML.
        We will render the html templates as needed by passing in the necessary data.
    *********************************************************************************/
    app.set('port', process.env.PORT || 3000);
    app.set('view engine','ejs');  // use the EJS node module
    app.set('views',__dirname+ '/views'); // use /views as template directory
    app.set('view options',{layout:true}); // use /views/layout.html to manage your main header/footer wrapping template
    app.register('html',require('ejs')); //use .html files in /views

    /******************************************************************
        The /static folder will hold all css, js and image assets.
        These files are static meaning they will not be used by
        NodeJS directly. 
        
        In your html template you will reference these assets
        as yourdomain.heroku.com/img/cats.gif or yourdomain.heroku.com/js/script.js
    ******************************************************************/
    app.use(express.static(__dirname + '/static'));
    //parse any http form post
    app.use(express.bodyParser());
    
    /**** Turn on some debugging tools ****/
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.get('/', function(request, response) {

/*
	response.send('<form method="POST" action="/">' +
					'To: <input type="text" name="To" value="16464309130" />' +					
					'From: <input type="text" name="From" value="17654307001" />' +
					'Body: <input type="text" name="Body" />' +					
					'<input type="submit" />' +
					'</form>');	
*/

/*
	// '-e' executes the ruby command directly
	exec('ruby -e "puts \'Hello from Ruby!\'"', function (err, stdout, stderr) {
    	console.log(stdout);
    });
*/

  response.render('main.html');
});

app.post('/', function(request, response) {

	// info from the text message
	var body = request.body.Body;
	var from = request.body.From;
	var to = request.body.To;
	
	// print messages to the console
	console.log('body : ' + body); 
	console.log('from : ' + from); 
	console.log('to : ' + to); 		

	// 'exec' executes the eliza2.rb file with 'body' as the input variable 
	// the function sends the result out 'stdout'
	exec('ruby ./Dehlila_Ruby/eliza2.rb "'+ body + '"', function (err, stdout, stderr) {
	    console.log(stdout);
	    console.log(stderr);
	  	
	  	//reply to the incoming message with the Eliza reponse (aka stdout)  
		Twilio.SMS.create({to: from, from: to, body: stdout}, function(err,res) {
			console.log('Up Up and Away...SMS Sent!');
		});	 

	});		

  response.send('Hello Dynamic Web Class!');
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});