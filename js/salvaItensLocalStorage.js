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

    var itensAtivosRiscados = contaItensAtivos();
    if (itensAtivosRiscados[1] == itensAtivosRiscados[0] || itensAtivosRiscados[1] >= 1) {
        $('.risca-todos').text('Desmarcar todos itens');
        $('.risca-todos').attr('data-value', 'true');
        $(".apaga-itens-marcados").show();
    }

    if (itensAtivosRiscados[0] == 0) {
        $('.risca-todos').hide();
        $(".apaga-itens-marcados").hide();
        $(".apaga-todos").hide();
    }

}

var storageMostraEscondeItensRiscados = function () {
    var array = [];
    arrayMostraEscondeItensRiscados.forEach(element => {
        array.push(element.attr('data-show'));
    })

    localStorage.setItem('arrayMostraEscondeItensRiscados', JSON.stringify(array));
}