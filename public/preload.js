const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('close'),
  minimizeWindow: () => ipcRenderer.send('minimize'),
  publicUrl: () => ipcRenderer.invoke('publicUrl'),
})

contextBridge.exposeInMainWorld('dataAPI', {
  getUsers: () => ipcRenderer.invoke('getUsers'),
  getData: (callback) => ipcRenderer.on('getData', callback),
  sendUserName: (user) => ipcRenderer.send('userName', user)
})