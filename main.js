const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        title: "Starting...",
        show: false,
        width: 550,
        height: 500,
        backgroundColor: '#1e0629',
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
            enableRemoteModule: true,
            resizable: false,
            maximizable: false
        },
        center: true,
        frame: false
    });
    win.loadURL(
        url.format({
          pathname: path.join(__dirname, '/dist/index.html'),
          protocol: "file",
          slashes: true
        })
    );

    win.setResizable(false);
    win.once('ready-to-show', () => {win.show();});
    win.on('closed', () => {win = null;});
}

app.on('ready', function() {
    createWindow();

    Menu.setApplicationMenu(null);

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label: "Open dev tools",
        click: function() {win.webContents.openDevTools();}
    }));
    win.webContents.on('context-menu', function (event, params) {
        ctxMenu.popup(win, params.x, params.y);
    });
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (win === null) {
        createWindow();
    }
});