$(window).load(function() {
  var allSecondary = [];
  connect("https://private-45821-colintixier.apiary-mock.com/everything");

  // VVV event listener VVV

  document.getElementById("fr").addEventListener("click", function () {
    connect("https://private-504e1-franceversion.apiary-mock.com/everything");
  });
  document.getElementById("po").addEventListener("click", function () {
    connect("https://private-45821-colintixier.apiary-mock.com/everything");
  });

  var toggle = false;
  document.getElementsByClassName("navbar-toggler")[0].addEventListener("click", function () {
    if (!toggle) {
      document.querySelector("nav").style.backgroundColor = "#343a40";
      toggle = true;
    } else {
      document.querySelector("nav").style.backgroundColor = "#00000000";
      toggle = false;
    }
  });
});


////////////////////////////////////////////////////////

document.getElementById("search").addEventListener('input', function () {
  var searchResult = [];
  for (i in allSecondary) {
    if (allSecondary[i].name.includes(this.value.toLowerCase())) {
      searchResult.push(allSecondary[i]);
    }
  }
  whenutrytohard(searchResult);
});

function whenutrytohard(array) {
  document.querySelector("#secondaryVilles>.villes").innerHTML = "";
  if (array.length === 0) {
    var notFound = document.createElement("P");
    notFound.innerText = "sorry not found :(";
    notFound.id = "notFound";
    document.querySelector("#secondaryVilles>.villes").appendChild(notFound);
    return;
  }
  for (i in array) {
    array[i].name = array[i].name.toLowerCase();
    let card = document.createElement("DIV");
    card.className = "col-md-4";
    card.innerHTML = "<div class='secondaryVille'><img src=" + array[i].img[0].src + " alt=" + array[i].img[0].imgDescription + " class='img-responsive'/><p class='title'>" + array[i].name + "</p> <p>" + array[i].originalName + "</p> <button class='button'>view offers</button></div>";
    document.querySelector("#secondaryVilles>.villes").appendChild(card);
  }
}

function connect(apiurl) {
  console.log("log to", apiurl)
  document.querySelector("#mainVille>div").innerHTML = "";
  var url = apiurl;
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    var data = request.response[0];
    document.querySelector("header").style.backgroundImage = "url('" + data.mainimg + "')";
    document.querySelector("header>.filter>div>h1").innerHTML = data.h1;
    document.querySelector("header>.filter>div>p").innerHTML = data.titleDes;

    for (i in data.MainVilles) {
      let card = document.createElement("DIV");
      data.MainVilles[i].name = data.MainVilles[i].name.toLowerCase();
      card.style.background = "url('" + data.MainVilles[i].img[0].src + "')";
      card.className = "mainVille";
      card.innerHTML = "<div class='element'><h3>" + data.MainVilles[i].name + "</h3>" + "<p>" + data.MainVilles[i].originalName + "</p></div> <button class='btn button'>view offers</button>";
      document.querySelector("#mainVille>div").appendChild(card);
    }
    whenutrytohard(data.SecondaryVilles);
    allSecondary = data.SecondaryVilles;
  }
}