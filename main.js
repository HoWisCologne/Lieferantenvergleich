// Electron-Hauptprozess: öffnet die App (index.html) als Desktop-Fenster.
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 360,
    minHeight: 480,
    title: "Lieferantenvergleich",
    autoHideMenuBar: true, // Menüleiste ausblenden (mit Alt einblendbar)
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });
  win.loadFile("index.html");
  return win;
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Brücke für die App (siehe preload.js)
ipcMain.handle("app-version", () => app.getVersion());
ipcMain.handle("open-external", (_e, url) => {
  if (/^https?:\/\//i.test(String(url))) shell.openExternal(url);
});
