function includeHTML() {
    var z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        var elmnt = z[i];
        var file = elmnt.getAttribute("import");
        if (file) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute("import");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

includeHTML();