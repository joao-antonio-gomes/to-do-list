var arrayItens = [0];
var salvaItemArray = function (itemLista) {
    arrayItens.push({
        id: arrayItens[0] + 1,
        descricao: itemLista,
        status: 'ativo',
        riscado: false,
        posicao: arrayItens[0] + 1
    });
    arrayItens[0] += 1;
    return arrayItens;
}

var guardaItensLocalStorage = function () {
    localStorage.setItem('Lista', JSON.stringify(arrayItens));
}

var carregaLocalStorageOnload = function () {
    if (!localStorage.hasOwnProperty('Lista')) {
        return false;
    }
    arrayItens = JSON.parse(localStorage.getItem('Lista'));

    arrayItens.forEach(function (element, index) {
        if (element.status == "ativo") {
            criaElementoNaLista(element.id);
        }
        if (element.riscado) {
            $(`#item-${element.id}`).addClass('riscado');
            moveItemRiscado(element.id);
            $(`.item-${index}`).addClass('background-riscado');
            $(`input[type="checkbox"][value=${element.id}]`).prop("checked", true)
        }
    });
    ocultaLinhas();

    mostraEscondeItensRiscadosOnload();
    if (arrayMostraEscondeItensRiscados[0].attr('data-show') == 'false') {
        $(`.agrega-itens-escondidos`).fadeOut('fast');
        $(".seta-baixo").hide();
        $(".seta-cima").fadeIn();
    } else {
        $(`.agrega-itens-escondidos`).fadeIn('fast');
        $(".seta-cima").hide();
        $(".seta-baixo").fadeIn();
    }
}

var storageMostraEscondeItensRiscados = function () {
    var array = [];
    arrayMostraEscondeItensRiscados.forEach(element => {
        array.push(element.attr('data-show'));
    })

    localStorage.setItem('arrayMostraEscondeItensRiscados', JSON.stringify(array));
}

var mostraEscondeItensRiscadosOnload = function () {
    let array = JSON.parse(localStorage.getItem('arrayMostraEscondeItensRiscados'));
    arrayMostraEscondeItensRiscados.forEach(function (element, index) {
        element.attr('data-show', array[index])
    })
}