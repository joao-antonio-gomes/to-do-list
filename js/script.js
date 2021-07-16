$(document).ready(function () {
    adicionarItemComClick();
    adicionarItemComEnter();
});
const botaoAdiciona = $("#adicionar-item");
const inputEscreveItem = $('#nome-item');

var adicionarItemComClick = function () {
    botaoAdiciona.on("click", function (e) {
        adicionaItemNaLista();
    });
}

var adicionarItemComEnter = function () {
    inputEscreveItem.keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            adicionaItemNaLista();
        }
    });
}

var adicionaItemNaLista = function () {
    var nomeItem = inputEscreveItem.val();

    if (nomeItem.length == 0) {
        erro[0] = "Por favor, adicione um item!";
        mostraEscondeAlerta(erro[0]);
    } else {
        if (salvaItemArray(nomeItem)) {
            criaElementoNaLista(nomeItem);
            inputEscreveItem.val('');
            inputEscreveItem.focus();
        } else {
            mostraEscondeAlerta(erro[0]);
        }
    }
}

var riscaItem = function () {
    $(".list-group-item").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("marcar-feito")) {
            var valor = botao.val();
            var paragrafo = $(`#item-${valor}`);
            if (botao.prop("checked")) {
                paragrafo.addClass('riscado');
            } else {
                paragrafo.removeClass('riscado');
            }
        }
        else return;
    });
}

var removeItem = function () {
    $(".list-group").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("botao-apagar")) {
            var valor = $(e.target).val();
            var paragrafo = $(`#item-${valor}`);
            arrayItens.splice(arrayItens.indexOf(paragrafo.text()), 1);
            e.target.parentNode.remove();
        }
        else return;
    });
}

var alertaFaltaItem = function (string) {
    $('.dica').tooltipster({
        trigger: 'click',
        animation: 'fade',
        speed: 1500,
        theme: 'tooltipster-shadow',
        content: string
    });
    $('.dica').tooltipster('disable');
}

var mostra;
var esconde;
var mostraEscondeAlerta = function (string) {
    alertaFaltaItem(string);

    clearTimeout(mostra);
    clearTimeout(esconde);
    mostra = setTimeout(function () {
        $('.dica').tooltipster('enable');
        $('.dica').tooltipster('show');
    }, 100);

    esconde = setTimeout(function () {
        $('.dica').tooltipster('hide');
        $('.dica').tooltipster('disable');
        $('.dica').tooltipster('destroy');
    }, 2500);
}

function criaElementoNaLista(itemLista) {
    var ul = $('.list-group');

    var li = $('<li/>', {
        class: `list-group-item item-${arrayItens.indexOf(itemLista)}`
    });

    var input = $('<input>', {
        class: `form-check-input me-1 marcar-feito botao-risca-${arrayItens.indexOf(itemLista)}`,
        type: "checkbox",
        value: `${arrayItens.indexOf(itemLista)}`,
        onclick: "riscaItem()"
    });

    var p = $('<p/>', {
        id: `item-${arrayItens.indexOf(itemLista)}`,
        text: itemLista
    });

    var button = $('<button/>', {
        type: "button",
        class: `btn btn-sm btn-outline-danger botao-apagar botao-apaga-${arrayItens.indexOf(itemLista)}`,
        value: `${arrayItens.indexOf(itemLista)}`,
        text: 'x',
        onclick: "removeItem()"
    })

    li = li.append(input);
    li = li.append(p);
    li = li.append(button);

    return ul.append(li);;
}

var arrayItens = [];
var erro = [];
var salvaItemArray = function (itemLista) {
    if (arrayItens.length == 0 || verificaPorcentagemPalavras(arrayItens, itemLista) == false) {
        arrayItens.push(itemLista);
        return true;
    }
    return false;
}

var verificaPorcentagemPalavras = function (arrayItens, itemLista) {
    var percent = [];
    var bool = false;
    arrayItens.forEach((index) => {
        percent.push(stringSimilarity.compareTwoStrings(index.toLowerCase(), itemLista.toLowerCase()));
    });

    percent.forEach((index) => {
        if (index >= 0.85 && index <= 0.99) {
            bool = true;
            erro[0] = 'Você digitou um item parecido com esse, verifique novamente!';
        } else if (index == 1) {
            erro[0] = 'Já existe esse item na lista!';
            bool = true;
        }
    })
    return bool;
}