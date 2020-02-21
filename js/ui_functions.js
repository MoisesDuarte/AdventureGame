function mostrarItem(newClass) {
    let el = document.body.querySelectorAll("ul");
    let newEl = document.body.querySelector(newClass);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarTexto(txt) {
    let el = document.querySelector(".text-conteudo");
    el.innerHTML = "";
    el.innerHTML = txt;
}