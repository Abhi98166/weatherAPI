const express = require('express');
const https = require('https');
const app = express();

app.get('/',function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=a667d53dd347ae5ac3541299a525dafc&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            //console.log(data);
            const weatherData = JSON.parse(data);
            //console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const urlicon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in Delhi is : "+temp+"</h1>");
            res.write("<h3>The weather is currently like : " + desc + "</h3>");
            res.write("<img src = \"https://openweathermap.org/img/wn/"+icon+"@2x.png\">");
            res.send();
        })

    });
});

app.listen(3000,function(){
    console.log("Server running!");
});
