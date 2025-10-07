"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("crimson", {
  openImage: () => ipcRenderer.invoke("dialog:openImage"),
  saveText: (opts) => ipcRenderer.invoke("fs:saveText", opts),
  openText: () => ipcRenderer.invoke("fs:openText"),
  exportMany: (files) => ipcRenderer.invoke("fs:exportMany", files),
  storeGet: (key) => ipcRenderer.invoke("store:get", key),
  storeSet: (key, value) => ipcRenderer.invoke("store:set", key, value),
  systemTheme: () => ipcRenderer.invoke("system:theme"),
  onSystemTheme: (cb) => {
    ipcRenderer.removeAllListeners("system-theme");
    ipcRenderer.on("system-theme", (_evt, val) => cb(val));
  },
  onNewProject: (cb) => {
    ipcRenderer.removeAllListeners("app:new-project");
    ipcRenderer.on("app:new-project", () => cb());
  },
  resetProject: () => ipcRenderer.invoke("app:resetProject")
});
