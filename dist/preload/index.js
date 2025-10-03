"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("crimson", {
  openImage: () => ipcRenderer.invoke("dialog:openImage"),
  saveText: (opts) => ipcRenderer.invoke("fs:saveText", opts),
  openText: () => ipcRenderer.invoke("fs:openText"),
  exportMany: (files) => ipcRenderer.invoke("fs:exportMany", files),
  storeGet: (key) => ipcRenderer.invoke("store:get", key),
  storeSet: (key, value) => ipcRenderer.invoke("store:set", key, value)
});
