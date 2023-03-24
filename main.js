const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      // nodeIntegration: false,
      // contextIsolation: true,
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadURL('https://chat.openai.com/chat');

  // ウィンドウが閉じられたら、参照をnullに設定
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

app.whenReady().then(() => {
  mainWindow = createWindow();

  // Command+Shift+Kでウィンドウを表示・非表示
  const shortcut = process.platform === 'darwin' ? 'Command+Shift+K' : 'Ctrl+Shift+K';
  globalShortcut.register(shortcut, () => {
    if (!mainWindow) {
      mainWindow = createWindow(); // mainWindowがnullの場合、再作成する
    } else if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ショートカットの登録解除
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});