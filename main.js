const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 500,
    minWidth: 400,
    height:600,
    minHeight: 300
    //frame: false
  });
  win.loadURL(`file://${__dirname}/index.html`);

  win.on('closed', () => {
    win = null
  });
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // For macOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//Menu
const template = [
  {
     label: 'File',
     submenu: [
        { role: 'minimize' },
        { role: 'close' }
     ]
  },
   {
      label: 'Edit',
      submenu: [
         { role: 'undo' },
         { role: 'redo' },
         { type: 'separator' },
         { role: 'cut' },
         { role: 'copy' },
         { role: 'paste' }
      ]
   },
   {
      label: 'View',
      submenu: [
         { role: 'zoomin' },
         { role: 'zoomout' },
         { role: 'resetzoom' }
      ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


// {
//    role: 'help',
//    submenu: [
//       {
//         role: 'about',
//         click() { console.log("This is about page");}
//
//       }
//    ]
// }
