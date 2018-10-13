const { ipcRenderer } = require('electron');

const submitForm = e => {
    e.preventDefault();
    let conta = document.getElementById("nomeConta").value;
    let valor = document.getElementById("valorConta").value;

    if(conta !== "" && valor !== "" && !isNaN(valor)){
        const item = {conta,valorConta: Number(valor)};
        ipcRenderer.send('item:add',item);
    }

    document.getElementById('nomeConta').value = "";
    document.getElementById('valorConta').value = "";
}

const form = document.querySelector(".form");

form.addEventListener("submit",submitForm);