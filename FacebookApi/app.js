/// Import
var express = require("express");




var path = require("path");
var bodyParser = require('body-parser');
const fs = require("fs");
const login = require("facebook-chat-api");

/// New Instance
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('scripts'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.get("/appsFriends", function(req, res){
    res.sendFile(__dirname + "/appsFriends.json")
})


//Login
app.post('/apilogin', function(req, res) {	
	login({email: req.body.iptuser, password: req.body.iptpass}, (err, api) => {
		if(err) { 
			res.send("Por favor autentique suas credenciais no Facebook.");
		}else{
		
		api.getFriendsList((err, data) => {
			if(err) return console.error(err);
			fs.writeFileSync('appsFriends.json', JSON.stringify(JSON.stringify(data)));
		});
		
		fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
		
		///Create file List Friends
		
		
		
		res.sendFile(__dirname + "/SendMessage.html");			
		}

	});	
});


//Send Message
app.post('/apimessage', function(req, res) {	
	login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
		if(err){
			return console.error(err)
		}else{

			
			
			 for(var i in req.body.iptnamefriends){

				api.getUserID(req.body.iptnamefriends[i], (err, data) => {
					if(err){
						res.send("Foi encontrado um erro no envio de mensagem, tente novamente mais tarde");
					}else{
					        // Send the message to the best match (best by Facebook's criteria)
						var msg = req.body.iptSendMessage
						var threadID = data[0].userID;
						api.sendMessage(msg, threadID);					
					}	 
				});
			} 
			//res.sendFile(__dirname + "/MessageSucess.html");				
		};	
	});
});



app.listen(21004,function(){
    console.log("Starded");
})


