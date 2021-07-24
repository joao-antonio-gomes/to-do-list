var removeItem = function () { //função para remover item da lista
    $("ul").one('click', function (e) {
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
                ocultaLinhas();
            }
        }
        else return;
    });
}

var removeTodos = function () {
    var listaItens = $('.item-lista');
    if (!window.confirm('Você realmente quer excluir todos os itens?')) {
        return;
    }
    listaItens.animate({ opacity: '0' }, 500, function () {
        listaItens.animate({ height: '0px' }, 300, function () {
            listaItens.remove();
        })
    })
    arrayItens.forEach(element => { element.status = "excluido" })
    ocultaLinhas();
}

var removeItensRiscados = function () {
    if (!window.confirm('Você realmente quer excluir todos os itens riscados?')) {
        return;
    }
    arrayItens.forEach(function (element, index) {
        if (element.riscado == true && element.status == 'ativo') {
            element.status = "excluido";
            var li = $(`.item-${index}`);
            li.animate({ opacity: '0' }, 300, function () {
                li.animate({ height: '0px' }, 150, function () {
                    li.remove();
                })
            })
        }
    })
    ocultaLinhas();
}