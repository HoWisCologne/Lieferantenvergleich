// Sichere Brücke zwischen App (Renderer) und Electron-Hauptprozess.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("appAPI", {
  isDesktop: true,
  getVersion: () => ipcRenderer.invoke("app-version"),
  openExternal: (url) => ipcRenderer.invoke("open-external", url),
});
