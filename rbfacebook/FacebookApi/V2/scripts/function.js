$(function(){
					$.getJSON( "/appsFriends", function( json ) {
						var friends = jQuery.parseJSON(json)
						
						for(var i in friends){
								$("#iptnamefriends").append("<option>"+friends[i].fullName+"</option>")						
						}						
					});
			});