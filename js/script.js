$(document).ready(function () {
    adicionarItemComClick();
    adicionarItemComEnter();
    carregaLocalStorageOnload();
    chamaModal();
    ocultaLinhas();
});

var alertaFaltaItem = function (classe, string) { //função padrão para chamar alerta no botão adicionar
    $(classe).tooltipster({
        trigger: 'click',
        animation: 'fade',
        speed: 2500,
        theme: 'tooltipster-shadow',
        content: string
    });
    $(classe).tooltipster('disable');
}

var mostraEscondeAlerta = function (classe, string) { //função para mostrar e esconder alertas
    var mostra;
    var esconde;

    alertaFaltaItem(classe, string);

    clearTimeout(mostra);
    clearTimeout(esconde);
    mostra = setTimeout(function () {
        $(classe).tooltipster('enable');
        $(classe).tooltipster('show');
    }, 100);

    esconde = setTimeout(function () {
        $(classe).tooltipster('hide');
        $(classe).tooltipster('disable');
    }, 2500);
}

var contaItensAtivos = function () {
    var c = 0;
    var x = 0;
    arrayItens.forEach((element) => {
        if (element.status == "ativo") {
            c++;
            if (element.riscado == true) {
                x++;
            }
        }
    })
    var itensAtivos = c;
    var itensRiscados = x;
    atualizaNumeroItensRiscados(itensRiscados);
    return [itensAtivos, itensRiscados];
}

var acharItemPorId = function (id) {
    return arrayItens.find((element) => { if (element["id"] == id) return element })
}

var escondeLinha = function (item) {
    item.animate({ opacity: '0', height: '0' }, 200, function () {
        item.hide();
    })
}

var mostraLinha = function (item) {
    item.show();
    item.animate({ opacity: '1', height: '40px' }, 200, function () {
    })
}


var ocultaLinhas = function () {
    var itensAtivosRiscados = contaItensAtivos();
    var numeroItensAtivos = itensAtivosRiscados[0];
    var numeroItensRiscados = itensAtivosRiscados[1];
    var botaoRiscaTodos = $('.risca-todos');
    var botaoApagaTodos = $(".apaga-todos");
    var menu = $(".menu-dropdown");
    var botaoApagaItensMarcados = $(".apaga-itens-marcados");
    var listaRiscados = $(".lista-riscados");

    switch (true) {
        case numeroItensAtivos == 1 && numeroItensRiscados == 0:
            botaoApagaTodos.fadeIn();
            menu.fadeIn();
            listaRiscados.fadeOut();
            botaoRiscaTodos.text('Marca todos itens');
            botaoRiscaTodos.attr('data-value', 'false');
            botaoApagaItensMarcados.hide();
            break;
        case numeroItensAtivos > 1 && numeroItensRiscados == 0:
            listaRiscados.fadeOut();
            botaoRiscaTodos.text('Marca todos itens');
            botaoRiscaTodos.attr('data-value', 'false');
            botaoApagaItensMarcados.hide();
            break;
        case numeroItensAtivos == 0:
            menu.fadeOut();
            botaoApagaItensMarcados.fadeOut();
            botaoRiscaTodos.text('Marca todos itens');
            botaoRiscaTodos.attr('data-value', 'false');
            listaRiscados.fadeOut();
            break;
        case numeroItensRiscados == 1:
            botaoRiscaTodos.text('Desmarcar todos itens');
            botaoRiscaTodos.attr('data-value', 'true');
            botaoApagaItensMarcados.show();
            listaRiscados.fadeIn();
            break;
        case numeroItensRiscados == numeroItensAtivos || numeroItensRiscados >= numeroItensAtivos:
            botaoRiscaTodos.text('Desmarca todos itens');
            botaoRiscaTodos.attr('data-value', 'true');
            botaoApagaItensMarcados.show();
            listaRiscados.fadeIn();
            break;
        case numeroItensRiscados == 0:
            botaoRiscaTodos.text('Marca todos itens');
            botaoRiscaTodos.attr('data-value', 'false');
            botaoApagaItensMarcados.fadeOut();
            break;
    }
    guardaItensLocalStorage();
}
