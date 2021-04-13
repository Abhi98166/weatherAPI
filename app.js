const { static } = require('express');
const express = require('express');
const https = require('https');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});

app.post('/',function(req,res){
    const authId = process.env.APIKEY;
    const city = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+ authId+"&units="+ units;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const urlicon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+city+" is : "+temp+"</h1>");
            res.write("<h3>The weather is currently like : " + desc + "</h3>");
            res.write("<img src = \"https://openweathermap.org/img/wn/"+icon+"@2x.png\">");
            res.send();
        })

    });
})
app.listen(3000,function(){
    console.log("Server running!");
});
