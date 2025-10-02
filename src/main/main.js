const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  win.once('ready-to-show', ()=> win.show());

  const menu = Menu.buildFromTemplate([
    { label: 'Fichier', submenu: [ { role: 'quit', label: 'Quitter' } ] },
    { label: 'Affichage', submenu: [ { role: 'reload' }, { role: 'toggleDevTools' } ] }
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(()=>{
  createWindow();
  app.on('activate', ()=>{ if (BrowserWindow.getAllWindows().length===0) createWindow(); });
});

app.on('window-all-closed', ()=>{ if (process.platform!=='darwin') app.quit(); });
