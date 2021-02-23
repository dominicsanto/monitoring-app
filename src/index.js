const { app, BrowserWindow } = require('electron');
const path = require('path');
const os   = require('os-utils');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  setInterval(() => {
    os.cpuUsage(function(v){
      mainWindow.webContents.send('cpu',v*100);
      mainWindow.webContents.send('mem',os.freememPercentage()*100);
      mainWindow.webContents.send('total-mem',os.totalmem()/1024);
    });
  },1000);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
