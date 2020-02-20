function mostrarItem(newClass) {
    var el = document.body.querySelectorAll("ul");
    var newEl = document.body.querySelector(newClass);

    el.forEach(element => {
        element.style.display = "none";
    });

    newEl.style.display = "block";
}

function mostrarTexto() {
    txt = 'A noite é escura e fria e impessoal. As vielas recendem o odor acre de morte.'

    var el = document.querySelector(".text-content");
    el.innerHTML = "";
    el.innerHTML = txt;
}