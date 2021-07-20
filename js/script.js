$(document).ready(function () {
    adicionarItemComClick();
    adicionarItemComEnter();
    carregaLocalStorageOnload();
    if (contaItensAtivos() >= 1) {
        mostraLinhaRiscaApagaTodos();
    }
});
const botaoAdiciona = $("#adicionar-item");
const inputEscreveItem = $('#nome-item');
const liRiscaApagaTodos = $('.risca-apaga-todos');

var adicionarItemComClick = function () { //adiciona item com click esquerdo mouse no botão
    botaoAdiciona.on("click", function (e) {
        adicionaItemNaLista();
    });
}

var adicionarItemComEnter = function () { //adiciona item com Enter do teclado enquanto estiver com focus no input text
    inputEscreveItem.keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            adicionaItemNaLista();
        }
    });
}

var adicionaItemNaLista = function () {
    var nomeItem = inputEscreveItem.val();
    if (nomeItem.length == 0) { //verificação caso input esteja vazio
        mostraEscondeAlerta("Por favor, adicione um item!");
    } else {
        if (salvaItemArray(nomeItem)) { //adiciona item na lista, limpa e volta foco pro campo input, e guarda array de itens no local storage
            if (contaItensAtivos() >= 1) { //chama linha de risca/apaga todos quando adiciona primeiro item na lista
                mostraLinhaRiscaApagaTodos();
            }
            criaElementoNaLista();
            inputEscreveItem.val('');
            inputEscreveItem.focus();
            guardaItensLocalStorage();
        } else {
            mostraEscondeAlerta("Por favor, adicione um item!");
        }
    }
}

var riscaItem = function () { //função para riscar o item quando input checkbox está checked
    $(".list-group-item").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("marcar-feito")) {
            var valor = botao.val();
            var paragrafo = $(`#item-${valor}`);
            var index = acharPosicaoNoArray(paragrafo.text());
            if (botao.prop("checked")) {
                paragrafo.addClass('riscado');
                arrayItens[index].riscado = true;
                guardaItensLocalStorage();
            } else {
                paragrafo.removeClass('riscado');
                arrayItens[index].riscado = false;
                guardaItensLocalStorage();
            }
        }
        else return;
    });
}

var removeItem = function () { //função para remover item da lista
    $(".list-group").one('click', function (e) {
        var botao = $(e.target);
        if ($(e.target).hasClass("botao-apagar")) {
            if (window.confirm('Você realmente quer excluir esse item?')) {
                var valor = botao.attr('data-value');
                var item = acharItemPorId(valor);
                item.status = "excluido";
                guardaItensLocalStorage(); //atualiza local storage quando faz remoção do item
                var elementoPai = $(e.target.parentNode); //linhas abaixos servem para animação dos itens e por fim a remoção da lista
                elementoPai.animate({ opacity: '0' }, 300, function () {
                    elementoPai.animate({ height: '0px' }, 150, function () {
                        elementoPai.remove();
                    })
                })
                if (contaItensAtivos() == 0) { escondeLinhaRiscaApagaTodos() };
            }
        }
        else return;
    });
}

var alertaFaltaItem = function (string) { //função padrão para chamar alerta no botão adicionar
    $('.dica').tooltipster({
        trigger: 'click',
        animation: 'fade',
        speed: 1500,
        theme: 'tooltipster-shadow',
        content: string
    });
    $('.dica').tooltipster('disable');
}


var mostraEscondeAlerta = function (string) { //função para mostrar e esconder alertas
    var mostra;
    var esconde;

    alertaFaltaItem(string);

    clearTimeout(mostra);
    clearTimeout(esconde);
    mostra = setTimeout(function () {
        botaoAdiciona.tooltipster('enable');
        botaoAdiciona.tooltipster('show');
    }, 100);

    esconde = setTimeout(function () {
        botaoAdiciona.tooltipster('hide');
        botaoAdiciona.tooltipster('disable');
        botaoAdiciona.tooltipster('destroy');
    }, 2500);
}

function criaElementoNaLista(id) {
    var ul = $('.list-group');  //captura ul no body onde serão anexadas as <li>

    var posicaoItemLista;
    if (id != undefined) {
        posicaoItemLista = id;
    } else {
        posicaoItemLista = arrayItens.length - 1;
    }

    //variaveis abaixo para criação de li
    var li = $('<li/>', {
        class: `list-group-item item-lista item-${posicaoItemLista}`
    });

    var input = $('<input>', {
        class: `form-check-input me-1 marcar-feito`,
        type: "checkbox",
        value: posicaoItemLista,
        onclick: "riscaItem()"
    });

    var p = $('<p/>', {
        id: `item-${posicaoItemLista}`,
        text: arrayItens.find((element) => { if (element["id"] == posicaoItemLista) return element }).descricao
    });

    var button = $('<i/>', {
        class: `bi bi-trash botao-apagar`,
        'data-value': posicaoItemLista,
        onclick: "removeItem()"
    })

    //adiciona cada elemento dentro da <li> e no fim a <li> dentro da <ul>
    li = li.append(input);
    li = li.append(p);
    li = li.append(button);
    ul.append(li)

    //no momento que a li é criada é escondida para ter a animação dela surgindo com fadeIn
    li.hide();
    li.fadeIn()
}

var arrayItens = [0];
var salvaItemArray = function (itemLista) {
    arrayItens.push({
        id: arrayItens[0] + 1,
        descricao: itemLista,
        status: 'ativo',
        riscado: false
    });
    arrayItens[0] += 1;
    return arrayItens;
}

var contaItensAtivos = function () {
    var c = 0;
    arrayItens.forEach((element) => {
        if (element["status"] == "ativo") c++;
    })
    return c;
}

var escondeLinhaRiscaApagaTodos = function () {
    liRiscaApagaTodos.animate({ opacity: '0' }, 500, function () {
        liRiscaApagaTodos.animate({ height: '0px' }, 300, function () {
            liRiscaApagaTodos.css('visibility', 'hidden');
        })
    })
}

var mostraLinhaRiscaApagaTodos = function () {
    liRiscaApagaTodos.animate({ opacity: '1' }, 50, function () {
        liRiscaApagaTodos.animate({ height: '40px' }, 50, function () {
        })
    })
    liRiscaApagaTodos.css('visibility', 'visible');
    liRiscaApagaTodos.fadeIn('fast')
}

var acharPosicaoNoArray = function (palavra) {
    var numeroIndex;
    arrayItens.forEach(function (item) {
        if (palavra == item.descricao) {
            return numeroIndex = item.id;
        }
    });
    return numeroIndex;
}

var acharItemPorId = function (id) {
    return arrayItens.find((element) => { if (element["id"] == id) return element })
}

var riscaTodos = function () {
    var botaoRiscaTodos = $('.risca-todos');
    var checkbox = $('.marcar-feito');

    if (botaoRiscaTodos.attr('data-value') == 'false') {
        botaoRiscaTodos.attr('data-value', 'true')
        checkbox.prop("checked", true);
        $(`.item-lista  > p`).addClass('riscado');
        arrayItens.forEach(element => { element.riscado = true });
        guardaItensLocalStorage();
    } else {
        botaoRiscaTodos.attr('data-value', 'false')
        checkbox.prop("checked", false);
        $(`.item-lista  > p`).removeClass('riscado');
        arrayItens.forEach(element => { element.riscado = false })
        guardaItensLocalStorage();
    }
}

var riscaItem = function () { //função para riscar o item quando input checkbox está checked
    $(".list-group-item").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("marcar-feito")) {
            var valor = botao.val();
            var paragrafo = $(`#item-${valor}`);
            var item = acharItemPorId(valor);
            if (botao.prop("checked")) {
                paragrafo.addClass('riscado');
                item.riscado = true;
                guardaItensLocalStorage();
            } else {
                paragrafo.removeClass('riscado');
                item.riscado = false;
                guardaItensLocalStorage();
            }
        }
        else return;
    });
}


var removeTodos = function () {
    var listaItens = $('.item-lista');

    listaItens.animate({ opacity: '0' }, 500, function () {
        listaItens.animate({ height: '0px' }, 300, function () {
            listaItens.remove();
        })
    })
    escondeLinhaRiscaApagaTodos();
    arrayItens.forEach(element => { element.status = "excluido" })
    guardaItensLocalStorage();
}

// LOCAL STORAGE
var guardaItensLocalStorage = function () {
    localStorage.setItem('Lista', JSON.stringify(arrayItens));
}

var carregaLocalStorageOnload = function () {
    if (!localStorage.hasOwnProperty('Lista')) {
        return false;
    }
    arrayItens = JSON.parse(localStorage.getItem('Lista'));

    arrayItens.forEach(function (element) {
        if (element.status == "ativo") {
            criaElementoNaLista(element.id);
        }
        if (element.riscado) {
            $(`#item-${element.id}`).addClass('riscado');
            $(`input[type="checkbox"][value=${element.id}]`).prop("checked", true)
        }
    });
}
