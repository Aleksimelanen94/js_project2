var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType('application/xml');
xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
xmlhttp.send();

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

        var xmlDoc = xmlhttp.responseXML;

        //Get information i want to display from finnkino
        var titles = xmlDoc.getElementsByTagName("Title");
        var theaters = xmlDoc.getElementsByTagName("Theatre");
        var image = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
        var date = xmlDoc.getElementsByTagName("dttmShowStart");
        
        //first empty table then build new one with selected information
        var txt ="";
        txt = "<table border='2px solid orange'>";
        for(i=0; i < titles.length; i++){

            //change time format to readable form
            var time = new Date(date[i].childNodes[0].nodeValue);
            var t = time.toLocaleString();

            txt += "<tr><td>" + titles[i].childNodes[0].nodeValue + "<br>" + theaters[i].childNodes[0].nodeValue + "<br> <br>" + t +"</td>" + 
            "<td><img src= '" + image[i].childNodes[0].nodeValue + " '></td></tr>";
        }

        txt += "</table>";
        //move information to the website
        document.getElementById("myDiv").innerHTML = txt;

    }
}

function loadXMLfile(){

    var select = document.getElementById('theaterSelection');
    var value = select.options[select.selectedIndex].text;

    console.log(value);
            //clear div from previous information
    document.getElementById("myDiv").innerHTML = "";

    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){


        var xmlDoc = xmlhttp.responseXML;

        var titles = xmlDoc.getElementsByTagName("Title");
        var theaters = xmlDoc.getElementsByTagName("Theatre");
        var date = xmlDoc.getElementsByTagName("dttmShowStart");
        var image = xmlDoc.getElementsByTagName("EventSmallImagePortrait");

        //first empty table then build new one with selected information
        var txt = "";
        txt = "<table border='2px solid orange'>";
        
        for(i=0; i < titles.length; i++){

            var time = new Date(date[i].childNodes[0].nodeValue);
            var t = time.toLocaleString();

            if(theaters[i].childNodes[0].nodeValue == value)
            {

                txt += "<tr><td>" + titles[i].childNodes[0].nodeValue + "<br>" + theaters[i].childNodes[0].nodeValue + "<br> <br>" + t +"</td>" + 
                "<td><img src= '" + image[i].childNodes[0].nodeValue + " '></td></tr>";
            }
        }

        txt += "</table>";

        document.getElementById("myDiv").innerHTML = txt;
    }
}
