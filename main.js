const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1350,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
  
    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

try {
    require('electron-reloader')(module)
} catch (_) {}
