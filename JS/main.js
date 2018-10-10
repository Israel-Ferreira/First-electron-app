const electron = require('electron');
const { format } = require('url');
const path = require('path');

const {BrowserWindow,app,ipcMain,Menu} = electron;

let mainWindow;
let helpWindow;

process.env.NODE_ENV = "development";

let closeApp = () => app.quit();



app.on("ready",() => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(format(path.join(__dirname,'../index.html')));

    app.on("close",() => closeApp());

    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

const createWindow = (window,dimensions,url,title) => {
    const {height, width} = dimensions;
    window = new BrowserWindow({height,width,title});

    window.loadURL(format(path.join(__dirname,url)));

    app.on("close",() => {
        window = null;
    })
}


ipcMain.on('item:add',(e,item) => {
    console.log(item);
    mainWindow.webContents.send('item:add',item);
})


const menuTemplate = [
    {
        label: "Ajuda",
        accelerator: process.platform === "darwin" ? "Command+H" : "Ctrl+H",
        click(){
            let dimensions = {width: 400, height: 500};
            createWindow(helpWindow,dimensions,'../add.html','Ajuda');
        }
    },
    {
        label: "Sair",
        accelerator: process.platform === "darwin" ? "Command+S" : "Ctrl+S",
        click(){
            closeApp();
        }
    }
]


if(process.env.NODE_ENV === "development"){
    menuTemplate.push({
        label: "DevTools",
        accelerator: 'F12',
        click(item,focusedWindow){
            focusedWindow.toggleDevTools();
        }
    })
}



