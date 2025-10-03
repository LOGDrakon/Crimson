export {}; // Ensure this file is a module

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('crimson', {
  openImage: () => ipcRenderer.invoke('dialog:openImage') as Promise<{filePath: string, dataUrl: string} | null>,
  saveText: (opts: { defaultPath?: string, content: string }) => ipcRenderer.invoke('fs:saveText', opts) as Promise<string | null>,
  openText: () => ipcRenderer.invoke('fs:openText') as Promise<{ filePath: string, content: string } | null>,
  exportMany: (files: { name: string, content: string, encoding?: 'utf8' | 'base64' }[]) => ipcRenderer.invoke('fs:exportMany', files) as Promise<string | null>,
  storeGet: (key: string) => ipcRenderer.invoke('store:get', key) as Promise<any>,
  storeSet: (key: string, value: unknown) => ipcRenderer.invoke('store:set', key, value) as Promise<boolean>
});

declare global {
  interface Window {
    crimson: {
      openImage: () => Promise<{filePath: string, dataUrl: string} | null>;
      saveText: (opts: { defaultPath?: string, content: string }) => Promise<string | null>;
      openText: () => Promise<{ filePath: string, content: string } | null>;
  exportMany: (files: { name: string, content: string, encoding?: 'utf8' | 'base64' }[]) => Promise<string | null>;
      storeGet: (key: string) => Promise<any>;
      storeSet: (key: string, value: unknown) => Promise<boolean>;
    }
  }
}
