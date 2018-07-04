const fs = require("fs");
const login = require("facebook-chat-api");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.getUserID("Paulo Silva", (err, data) => {
        if(err) return console.error(err);

        // Send the message to the best match (best by Facebook's criteria)
        var msg = "Oi!"
        var threadID = data[0].userID;
        api.sendMessage(msg, threadID);
    });
});