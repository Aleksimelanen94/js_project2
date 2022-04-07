var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType('application/xml');
xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
xmlhttp.send();

xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

        //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        var xmlDoc = xmlhttp.responseXML;

        var titles = xmlDoc.getElementsByTagName("Title");
        var theaters = xmlDoc.getElementsByTagName("Theatre");

        var selection = document.getElementById("theaterSelection");
        for(i=0; i < theaters.length; i++){
            var option = document.createElement('option');
            option.setAttribute('value', theaters[i].value);
            option.appendChild(document.createTextNode(theaters[i].textContent));
            selection.appendChild(option);
        }
        
        var txt = "<table border='1'>";
        for(i=0; i < titles.length; i++){
            txt += "<tr><td>" + titles[i].childNodes[0].nodeValue + "</td>" + 
            "<td>" + theaters[i].childNodes[0].nodeValue + "</td></tr>";
        }

        txt += "</table>";

        document.getElementById("myDiv").innerHTML = txt;

    }
}

function loadXMLfile(){

}
