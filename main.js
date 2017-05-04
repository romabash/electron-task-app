const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 500,
    height:700
    //frame: false
  });
  win.loadURL(`file://${__dirname}/index.html`);
})
