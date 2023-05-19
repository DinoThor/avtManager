const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const Store = require('electron-store');

const express = require('express');
const fileUpload = require('express-fileupload');
const expressApp = express();

const ngrok = require('ngrok');
const dataService = require('./dataService');

expressApp.use(fileUpload());

let mainWindow;
let url;
let store = new Store();


if (!fs.existsSync(app.getPath('userData') + '/backups')) {
  fs.mkdirSync(app.getPath('userData') + '/backups');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  ExpressAPI();
  ElectronAPI();
  dataAPI();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// =========================================
// ================ UTILS ==================
// =========================================
function ElectronAPI() {
  ipcMain.on('close', () => { mainWindow.close() });
  ipcMain.on('minimize', () => { mainWindow.minimize() });
  ipcMain.handle('publicUrl', () => { return url; });
}

function dataAPI() {
  ipcMain.handle('getUsers', () => { return Object.keys(store.store) })
  ipcMain.on('userName', (event, user) => {
    if (user == null) return;
    let filename = store.get(user);
    let path = app.getPath('userData') + '/backups/' + filename + '.db';
    dataService.valueUsers(path).then((values) => {
      mainWindow.webContents.send('getData', values);
    });
  })
}


/**
 * Endpoint para la recepción del .db desde el móvil
 * Asocia el fichero al nombre registrado en la app móvil
 * Sobreescribe en disco si ya había una BBDD
 */
function ExpressAPI() {
  expressApp.post('/upload', (req, res) => {
    let user = (req.get('user'));
    let filename = store.get(user);;
    if (filename === undefined) {
      filename = (Math.random() + 1).toString(36).substring(3);
      store.set(user, filename);
    }

    fs.writeFile(
      app.getPath('userData') + '/backups/' + filename + '.db', req.files.file.data,
      (err) => {
        if (err) return console.log(err);
      }
    )

    res.send({ statusCode: 200 })
  })

  expressApp.listen(80);

  (async () => {
    let tunnel = await ngrok.connect();
    url = tunnel;
  })();
}
