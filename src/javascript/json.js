var url = "https://private-45821-colintixier.apiary-mock.com/everything";
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();
request.onload = function () {
  var data = request.response[0];
  document.querySelector("header>.filter>div>h1").innerHTML = data.h1;
  document.querySelector("header>.filter>div>p").innerHTML = data.titleDes;
  for (i in data.MainVilles) {
    let card = document.createElement("DIV");
    data.MainVilles[i].name = data.MainVilles[i].name.toLowerCase();
    card.className = "mainVille";
    card.innerHTML = "<div class='element'><h3>" + data.MainVilles[i].name + "</h3>" + "<p>" + data.MainVilles[i].originalName + "</p></div> <button class='btn button'>view offers</button>";
    document.querySelector("#mainVille>div").appendChild(card);
  }
  whenutrytohard(data.SecondaryVilles);
  allSecondary = data.SecondaryVilles;

}

var toggle = false;
document.getElementsByClassName("navbar-toggler")[0].addEventListener("click", function(){
  if (!toggle) {
    document.querySelector("nav").style.backgroundColor = "#343a40";
    toggle = true;
  } else {
    document.querySelector("nav").style.backgroundColor = "rgba(255, 255, 255, 0)";
    toggle = false;
  }
});

var allSecondary = [];

function whenutrytohard(array){
  document.querySelector("#secondaryVilles>.villes").innerHTML = "";
  for (i in array) {
    array[i].name = array[i].name.toLowerCase();
    let card = document.createElement("DIV");
    card.className = "col-sm-4";
    card.innerHTML = "<div class='secondaryVille'><img src=" + array[i].img[0].src + " alt=" + array[i].img[0].imgDescription + " class='img-responsive'/><h5>" + array[i].name + "</h5> <p>" + array[i].originalName + "</p> <button class='button'>view offers</button></div>";
    document.querySelector("#secondaryVilles>.villes").appendChild(card);
  }
}


document.getElementById("search").addEventListener('input', function () {
  var searchResult = [];
  //this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
  for (i in allSecondary) {
    if (allSecondary[i].name.includes(this.value.toLowerCase())){
      searchResult.push(allSecondary[i]);
    }
  }
  whenutrytohard(searchResult);
});