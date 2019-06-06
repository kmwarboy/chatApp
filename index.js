const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const moment = require("moment");
const fs = require("fs");

let messages = []

app.use(bodyparser.json());

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.put("/send", (req, res)=>{
    messages.push({
        name: req.body.name,
        message: req.body.message,
        timestamp: new Date()
    });

    res.send({status: "ok"});
});

app.get("/receive", (req, res)=>{
    res.send({messages: messages});
});

app.get("/save", (req, res)=>{
    let toSave = "";
    for (const message of messages){
      toSave += `${message.name} (${moment(message.timestamp).format("LT")}): ${message.message}\n`;
    }
    fs.writeFileSync(__dirname + "/message.txt", toSave);
  
    res.send({message: "ok"});
  });

app.listen(8081, "0.0.0.0", ()=>{
    console.log("Server is running!");
});
