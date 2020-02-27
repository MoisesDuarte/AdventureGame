function mostrarItem(item) {
    let el = document.body.querySelectorAll('ul');
    let newEl = document.body.querySelector(item);

    el.forEach(element => {
        element.style.display = 'none';
    });

    newEl.style.display = 'block';
};


function mostrarTexto(arrayFalas) {
    let i = 0;
    let textContainer = document.querySelector('.text-container');
    let textConteudo = document.querySelector('.text-conteudo');
    let textNext = document.querySelector('.text-next');
    let atorFalas = arrayFalas;

    textConteudo.innerHTML = atorFalas[0];
    textNext.style.display = 'block';
    i++;

    bloquearMenu();

    textContainer.addEventListener('click', function avancarTexto(){
        if (i == atorFalas.length) {
            textConteudo.innerHTML = '';
            textNext.style.display = 'none';
            textContainer.removeEventListener('click', avancarTexto);
            permitirMenu();
        }

        while (i < atorFalas.length) {
            console.log(i + ' : ' + atorFalas[i]);
            textConteudo.innerHTML = atorFalas[i];
            i++;
            break;
        }
    });
};


function bloquearMenu() {
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'gray';
        menu.style.pointerEvents = 'none';
    }
};


function permitirMenu() {
    let elMenus = document.querySelectorAll('li');
    for (let menu of elMenus) {
        menu.style.color = 'var(--main-primary-color)';
        menu.style.pointerEvents = 'auto';
    }
};