const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

require('electron-reload')(__dirname, {
    electron: require('electron-prebuilt')
});

var mainWindow = null

function createWindow () {
    mainWindow = new BrowserWindow({width: 1280, height: 720})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'static/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})