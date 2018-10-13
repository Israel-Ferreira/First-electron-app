const { ipcRenderer } = require('electron');


//crime, váriaveis globais
let ul = document.querySelector('ul');
let h3 = document.querySelector('.message');
let finalVal = document.querySelector('.final-value'); 

let valoresContas = [];

const emptyList  = () => {
    h3.textContent = ul.children.length === 0 ? "Não há items na sua lista" : "";
}

const templateLi = ({conta,valorConta}) => {
    return `<li class='list-item'>${conta} - R$ ${valorConta}</li>`;
}

const remove = e => {
    e.target.remove();
    emptyList();
}

ipcRenderer.on('item:add',(e,item) => {
    valoresContas.push(item.valorConta);

    const li = templateLi(item);
    ul.innerHTML += li;

    viewFinalValue(valoresContas);
    emptyList();
})

const viewFinalValue = arr =>  {
    finalVal.textContent = `O valor final das suas contas é ${somaContas(arr)}`;
}

const somaContas = arr => {
    return arr.reduce((valorTotal,conta) => valorTotal + conta,0).toFixed(2);
}

window.addEventListener('load', e => emptyList());

ul.addEventListener('click',remove);