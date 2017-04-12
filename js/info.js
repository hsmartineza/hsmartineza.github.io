
/// Dataset weather

var xmlhttp1 = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c";
xmlhttp1.open("GET", url, true);
xmlhttp1.send();


xmlhttp1.onreadystatechange = function() {
    if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
        var myArr = xmlhttp1.responseText;
        var text = myArr;
        var json = JSON.parse(text);
    	document.getElementById("weather").innerHTML = "Today the weather is <em><b>" + json.weather[0].main + "</b></em>";
    	document.getElementById("main").innerHTML = "Today the temperature is <em><b>" + (json.main.temp-273).toFixed(2) + "C" + "</b></em>";

    }

} 