const { ipcRenderer } = require('electron');

let ul = document.querySelector('ul');
let h3 = document.querySelector('.message');

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
    const li = templateLi(item);
    ul.innerHTML += li;
    emptyList();
})

ipcRenderer.on('item:clear',() => {
    ul.innerHTML = "";
    emptyList();
})

window.addEventListener('load', e => emptyList());

ul.addEventListener('click',remove);