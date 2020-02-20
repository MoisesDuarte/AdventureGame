function mostrarItem(newClass) {
    var el = document.body.querySelectorAll("ul");
    var newEl = document.body.querySelector(newClass);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarTexto(txt) {
    var el = document.querySelector(".text-content");
    el.innerHTML = "";
    el.innerHTML = txt;
}