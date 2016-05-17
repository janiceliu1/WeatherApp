function addBreak(element) {
    var breakNode = document.createElement("br");
    element.appendChild(breakNode);
}

/* called when submit button is pushed */
function lookupWoeid() {
	var searchText = document.getElementById("zip").value;
	getNewPlace(searchText);
    
        
        var everything = document.getElementById("all");
    while (everything.hasChildNodes()) {
        everything.removeChild(everything.firstChild);
    } 
    

}


/* function to get new woeid and place by forcing the browser to make a 
 query, in the form of asking Yahoo to download a Javascript file.  */ 
function getNewPlace(place) {
	var script = document.createElement("script");
	script.src = "https://query.yahooapis.com/v1/public/yql?q=select woeid,name,admin1,country  from   geo.places where text='"+place+"' & format=json & callback=placeCallback";	
    document.body.appendChild(script);
    
    	
setTimeout(function(){document.body.removeChild(script);},2000);
    
}


//for weather

function getNewWeather(woeid) {
	var script = document.createElement("script");
    
    console.log(woeid);
    script.src =
    "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid="+woeid+" &format=json&callback=callbackFunction";
		
    document.body.appendChild(script);
    
    	
setTimeout(function(){document.body.removeChild(script);},2000);
}
    



/*controller*/
/* called when Yahoo returns a new place result */
function placeCallback(data) {
    

    // did it find it? 
    if (data.query.results == null) {
	   var woeid = "not found";
	   var name = "not found";
    } // was it unique? 
    else {
	   if (data.query.results.place[0] == undefined) {
	       place = data.query.results.place;
	   } // multiple ones - pick the first one
	   else {
           place = data.query.results.place[0];
	   }
	   var woeid = place.woeid;
	   var name = /*place.name+", "+*/
place.admin1.content+", "+
	       place.country.content;
    } 
   
    var title = document.createElement("h1");
    
    
    /*confused as to why this doesnt work*/

    

    title.textContent = name;
    title.id = "title";
    document.body.appendChild(title);
    all.appendChild(title);
    

    console.log(name);
    
    var todayText = "TODAY";
    var today = document.createElement("p");
    today.textContent = todayText;
    today.id = "today";
    document.body.appendChild(today);
    all.appendChild(today); 

    getNewWeather(woeid);

}

function callbackFunction(JSONdata) {
    console.log(JSONdata);
    var x = new Model(JSONdata);
    var y = new View(x);
    

}

function Model(data) {

    
    console.log(data.query.results.channel.wind.speed);
    var nextDays = data.query.results.channel.item;
    
    
    var todayHigh = nextDays.forecast[0].high;
    var todayLow = nextDays.forecast[0].low;
    
    var day; var date; var high; var low; var text;
    var div = document.createElement("div");


    outerDiv = document.createElement("div");
    
     /*   var everything = document.getElementById("all");
    while (everything.hasChildNodes()) {
        everything.removeChild(everything.firstChild);
    } */
    


    for (i = 0; i < 5; i++) {
        div = document.createElement("div");
        div.id = i;
        
                             
        if (div.id != 5) { 
        day = nextDays.forecast[i].day;
        date = nextDays.forecast[i].date;
        high = nextDays.forecast[i].high;
        low = nextDays.forecast[i].low;
        text = nextDays.forecast[i].text;
       
            var dat = splitString(date, " ");
        function splitString(stringToSplit, separator){
            var arrOfStr = stringToSplit.split(separator);
            if (arrOfStr[1] == "Jan") {
                arrOfStr[1] = "JANUARY";
            }else if (arrOfStr[1] == "Feb") {
                arrOfStr[1] = "FEBRUARY";
            }else if (arrOfStr[1] == "Mar") {
                arrOfStr[1] = "MARCH";
            }else if (arrOfStr[1] == "Apr") {
                arrOfStr[1] = "APRIL";
            }else if (arrOfStr[1] == "May") {
                arrOfStr[1] = "MAY";
            }else if (arrOfStr[1] == "Jun") {
                arrOfStr[1] = "JUNE";
            }else if (arrOfStr[1] == "Jul") {
                arrOfStr[1] = "JULY";
            }else if (arrOfStr[1] == "Aug") {
                arrOfStr[1] = "AUGUST";
            }else if (arrOfStr[1] == "Sep") {
                arrOfStr[1] = "SEPTEMBER";
            }else if (arrOfStr[1] == "Nov") {
                arrOfStr[1] = "NOVEMBER";
            }else if (arrOfStr[1] == "Dec") {
                arrOfStr[1] = "DECEMBER";
            }else {
                arrOfStr[1] = "ERR MSG";
            }
            return arrOfStr[1]+" "+arrOfStr[0];
        }
     
            /*Date of the Week*/
            var dat = splitString(date, " ");
            dat = document.createTextNode(dat);
            
            var Date = document.createElement("div");
            document.createTextNode(dat);
            Date.id = "Date";
            Date.appendChild(dat);
            div.appendChild(Date);
            all.appendChild(div);
            
            
            /*Day of the Week*/
            if (day == "Mon") {
                var dai = document.createTextNode("MONDAY");
            } else if (day == "Tue") {
                var dai = document.createTextNode("TUESDAY");
            }else if (day == "Wed") {
                var dai = document.createTextNode("WEDNESDAY");
            }else if (day == "Thu") {
                var dai = document.createTextNode("THURSDAY");
            }else if (day == "Fri") {
                var dai = document.createTextNode("FRIDAY");
            }else if (day == "Sat") {
                var dai = document.createTextNode("SATURDAY");
            }else if (day == "Sun") {
                var dai = document.createTextNode("SUNDAY");
            }else {
                var dai = document.createTextNode(day+"day");  
            }
  

            var Day = document.createElement("div");
            Day.id = "Day";
            Day.appendChild(dai);
            div.appendChild(Day);
            all.appendChild(div);

            
            addBreak(div);
            addBreak(div);
            
            
            
            
        //var hotWeather = 70;
        if (text == "Sunny" || text == "Mostly Sunny" ) {
            console.log("hot weather");
            var yourSVG = new Image();
            yourSVG.src = "Forecast_Sunny.svg";
            
            div.appendChild(yourSVG);
          //  <div id="sun"> <img src="sun.svg" class="icon"></div>
        }
        else if (text == "Partly Cloudy" || text == "Mostly Cloudy" || text == "Breezy" || text == "Cloudy") {
            console.log("cold weather");
            var yourSVG = new Image();
            yourSVG.src = "Forecast_Partly Cloudy.svg";

            div.appendChild(yourSVG);
            //<div id="rain_icon"> <img src="rain_icon.svg" class="icon"></div> 
        }
        else if (text == "Showers" || text == "Rain" || text == "Scattered Showers") {
            var yourSVG = new Image();
            yourSVG.id = "rainInside";
            yourSVG.src = "Forecast_Rainy.svg";
            

            div.appendChild(yourSVG);
            //<div id="rain_icon"> <img src="rain_icon.svg" class="icon"></div> 
        }
        else if (text == "Scattered Thunderstorms" || text == "Stormy" || text == "Thunderstorms") {
                var yourSVG = new Image();
            yourSVG.src = "Forecast_Stormy.svg";

            div.appendChild(yourSVG);
        }

        addBreak(div);
            
            var highImg = new Image();
            highImg.src = "Forecast_Highs.svg";
            highImg.id = "high"+i;
            //div.appendChild(highImg);
            var highTemp = document.createTextNode(high);
            highTemp.id = "highW"+i;
            //div.appendChild(highTemp);
            //addBreak(div);
            
            var lowImg = new Image();
            lowImg.src = "Forecast_Lows.svg";
            lowImg.id = "low"+i;
           // div.appendChild(lowImg);
            var lowTemp = document.createTextNode(low);
            lowTemp.id = "lowW"+i;
            //div.appendChild(lowTemp);
            addBreak(div);
            
            if (i == 0) {
                
             var firstDay = document.createElement("div");
                firstDay.id = "firstDay";
                
               firstDay.appendChild(highImg);
                firstDay.appendChild(highTemp);
                addBreak(firstDay);
                firstDay.appendChild(lowImg);
                firstDay.appendChild(lowTemp);
                div.appendChild(firstDay);
                all.appendChild(div);
                
                //--------------------------
                curTemp = document.createElement("p");
                curTemp.id = "curTemp";
                var nam = document.createTextNode(nextDays.condition.temp);
                
                curTemp.appendChild(nam);
                div.appendChild(curTemp);
                                all.appendChild(div);


                            addBreak(div);

                var rainImg = new Image();
                rainImg.src = "rain_icon.svg";
                rainImg.id = "rain";
           // div.appendChild(lowImg);
            
                
                var windImg = new Image();
                windImg.src = "Forecast_Wind.svg";
                windImg.id = "wind";
                //div.appendChild(highImg);
                
                
                var todayHumidity = data.query.results.channel.atmosphere.humidity;
                var humid = document.createTextNode(todayHumidity);
                
                
                var todaywindSpeed = data.query.results.channel.wind.speed;
                var wind = document.createTextNode(todaywindSpeed);
                
                
                var extraWind = document.createElement("div");
                extraWind.id = "extraWind";
                
                var extraRain = document.createElement("div");
                extraRain.id = "extraRain";
                
                extraRain.appendChild(rainImg);
                addBreak(extraRain);
                extraRain.appendChild(humid);
                extraWind.appendChild(windImg);
                addBreak(extraWind);
                extraWind.appendChild(wind);
                
                                

                div.appendChild(extraRain);
                 all.appendChild(div);

                div.appendChild(extraWind);
                 all.appendChild(div);
            }
            else {
                div.appendChild(highImg);
                all.appendChild(div);

                div.appendChild(highTemp);
                all.appendChild(div);

                addBreak(div);
                div.appendChild(lowImg);
                all.appendChild(div);

                div.appendChild(lowTemp);

              all.appendChild(div);

                addBreak(div);
            }
            
            

            outerDiv.appendChild(div);
             all.appendChild(div);


                        addBreak(div);

            
       console.log(i); 
        console.log( "On "+day+" "+date+" there will be a high of "+high+" and a low of "+low+". Possibly "+text+".");
            
  
        }

    }
    
            document.body.appendChild(outerDiv);
}

function View (model) {
    
    
    /*var datee = document.createTextNode(dat);
    var Day = document.createElement("div");
    Day.id = "Day";
    model.Date.appendChild(datee);
    
    Date.id = "Date";
            Date.appendChild(datee);
            div.appendChild(Date);*/

}