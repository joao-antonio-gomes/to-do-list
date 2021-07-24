$(document).ready(function () {
    adicionarItemComClick();
    adicionarItemComEnter();
    carregaLocalStorageOnload();
    mostraEscondeItensRiscadosOnload();
    mostraEscondeListaItensRiscados();
    var itensAtivosRiscados = contaItensAtivos();
    if (itensAtivosRiscados[0] == 0) {
        $('.risca-todos').hide();
        $('.risca-todos').text('Marca todos itens');
        $('.risca-todos').attr('data-value', 'false');
        $(".apaga-itens-marcados").hide();
        $(".menu-dropdown").hide();
    }
});

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
