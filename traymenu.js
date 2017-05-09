const {remote} = require('electron')
const {Tray, Menu} = remote

let trayIcon = new Tray('images/icon.png')

const trayMenuTemplate = [
  {
    label: 'Exit Application',
    role: 'quit'
  },
  {
    label: 'Minimize',
    role: 'minimize'
  }
]

let trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)
