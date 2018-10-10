const { ipcRenderer } = require('electron');
let ul = document.querySelector('ul');

let valorTotal = 0;

const templateLi = ({conta,valorConta}) => {
    return `<li class='list-item'>${conta} - R$ ${valorConta}</li>`;
}

ipcRenderer.on('item:add',(e,item) => {
    console.log(item);
    const li = templateLi(item);
    ul.innerHTML += li;
})


