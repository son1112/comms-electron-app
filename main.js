const {
  app,
  BrowserView,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  webContents,
  globalShortcut
} = require('electron');

const path = require('path');
const { resources } = require('./resources.js');

const webApps = [
  'gmail',
  'gcal',
  'photos',
  'drive',
  'docs',
  'voice',
  'msg',
  'li'
];

var appIds = {};
function createWindows() {
  webApps.forEach(name => {
    var win = createWindow(resources[name]);
    var appId = win.id;
    appIds[name] = appId;
  });
}

function createWindow (
  resource = resources.google,
  opts = {}
) {

  var geometry = resource.geometry;
  var options = {
    show: false,
    frame: false,
    minimizable: false,
    backgroundColor: '110e13',
    x: geometry.pos.x,
    y: geometry.pos.y,
    width: geometry.size.w,
    height: geometry.size.h,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: __dirname + '/Icon.icns',
    ...opts
  };

  const win = new BrowserWindow(options);

  win.loadURL(`https://${resource.site}`);
  handleInputs(win);

  win.once('ready-to-show', () => {
    win.show();
  });

  return win;
}

function handleInputs(win) {
  var contents = win.webContents;
  contents.on('before-input-event', (event, input) => {
    switch(input.key) {
    case 'Backspace':
      contents.goBack();
      break;
    }
  });

  // TODO: make key modes
  handleInput('g', 'google');
  handleInput('m', 'gmail');
  handleInput('p', 'photos');
  handleInput('c', 'gcal');
  handleInput('d', 'drive');
  handleInput('x', 'docs');
  handleInput('v', 'voice');
  handleInput('s', 'msg');
  handleInput('l', 'li');
}

function handleInput(keyCode, name) {
  return globalShortcut.register(`Command+${keyCode}`, () => {
    let appId = appIds[name];

    if (appId) {
      var win = BrowserWindow.fromId(appIds[name]);
      win.show();
    } else {
      createWindow(resources[name]);
    }
  });
}

app.whenReady().then(() => {
  createWindows();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
