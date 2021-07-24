var riscaItem = function () { //função para riscar o item
    $(".list-group-item").one('click', function (e) {
        var botao = $(e.target);
        if (botao.hasClass("marcar-feito")) {
            var valor = botao.val();
            var paragrafo = $(`#item-${valor}`);
            if (botao.prop("checked")) {
                paragrafo.addClass('riscado');
                $(`.item-${valor}`).addClass('background-riscado');
                arrayItens[valor].riscado = true;
                moveItemRiscado(valor);
                ocultaLinhas();
            } else {
                paragrafo.removeClass('riscado');
                $(`.item-${valor}`).removeClass('background-riscado');
                arrayItens[valor].riscado = false;
                organizaItensDesriscados();
                ocultaLinhas();
            }
        }
        else return;
    });
}

var riscaTodos = function () {
    var botaoRiscaTodos = $('.risca-todos');
    var checkbox = $('.marcar-feito');
    if (botaoRiscaTodos.attr('data-value') == 'false') {
        checkbox.prop("checked", true);
        $(`.item-lista  > p`).addClass('riscado');
        arrayItens.forEach(function (element, index) {
            element.riscado = true
            moveItemRiscado(element.id)
            $(`.item-${index}`).addClass('background-riscado');
        });
        ocultaLinhas();
    } else {
        ocultaLinhas();
        desriscaTodos();
    }
}

var desriscaTodos = function () {
    $('.marcar-feito').prop("checked", false);
    $(`.item-lista  > p`).removeClass('riscado');
    arrayItens.forEach(function (element, index) {
        element.riscado = false
        organizaItensDesriscados();
        $(`.item-${index}`).removeClass('background-riscado');
    })
    ocultaLinhas();
}

var moveItemRiscado = function (valor) {
    var liRiscado = $(`.item-${valor}`);
    liRiscado.appendTo($(".agrega-itens-escondidos"));
}

var organizaItensDesriscados = function () {
    arrayItens.forEach((element) => {
        if (!element.riscado) {
            $(`.item-${element.id}`).appendTo($(".lista-geral"));
        }
    })
}

var arrayMostraEscondeItensRiscados = [$(".seta-baixo"), $(".seta-cima"), $(".agrega-itens-escondidos")];
var mostraItensRiscados = function () {
    $(`.agrega-itens-escondidos`).fadeIn('fast');
    $(".seta-cima").hide();
    $(".seta-baixo").fadeIn();
    inverteDataShowMostraEscondeItens();
    storageMostraEscondeItensRiscados();
}

var escondeItensRiscados = function () {
    $(`.agrega-itens-escondidos`).fadeOut('fast');
    $(".seta-baixo").hide();
    $(".seta-cima").fadeIn();
    inverteDataShowMostraEscondeItens();
    storageMostraEscondeItensRiscados();
}

var inverteDataShowMostraEscondeItens = function () {
    arrayMostraEscondeItensRiscados.forEach(element => {
        element.attr('data-show') == 'true' ? element.attr('data-show', 'false') : element.attr('data-show', 'true')
    })
}

var atualizaNumeroItensRiscados = function (numeroItens) {
    var p = $(".numero-itens-riscados");
    numeroItens > 0 ? p.text(`${numeroItens} itens marcados`) : p.text('')
}