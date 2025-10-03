import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import Store from 'electron-store'

const store = new Store({ name: 'crimson-store' })

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: any = null

async function createWindow() {
  const isDev = !app.isPackaged

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Crimson',
    backgroundColor: '#0b0b0c',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    const indexHtml = join(__dirname, '../renderer/index.html')
    await mainWindow.loadFile(indexHtml)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// App lifecycle
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// IPC handlers
ipcMain.handle('dialog:openImage', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp'] }
    ]
  })
  if (result.canceled || result.filePaths.length === 0) return null
  const filePath = result.filePaths[0]
  const data = await fs.readFile(filePath)
  const base64 = `data:image/${filePath.split('.').pop()};base64,${data.toString('base64')}`
  return { filePath, dataUrl: base64 }
})

ipcMain.handle('fs:saveText', async (_evt, { defaultPath, content }: { defaultPath?: string, content: string }) => {
  const result = await dialog.showSaveDialog({ defaultPath })
  if (result.canceled || !result.filePath) return null
  await fs.writeFile(result.filePath, content, 'utf-8')
  return result.filePath
})

ipcMain.handle('fs:openText', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [ { name: 'Text/JSON', extensions: ['json', 'txt', 'css'] } ]
  })
  if (result.canceled || result.filePaths.length === 0) return null
  const filePath = result.filePaths[0]
  const content = await fs.readFile(filePath, 'utf-8')
  return { filePath, content }
})

ipcMain.handle('fs:exportMany', async (_evt, files: { name: string, content: string, encoding?: 'utf8' | 'base64' }[]) => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] })
  if (result.canceled || result.filePaths.length === 0) return null
  const dir = result.filePaths[0]
  await Promise.all(files.map(f => {
    const filePath = join(dir, f.name)
    if (f.encoding === 'base64') {
      const buf = Buffer.from(f.content, 'base64')
      return fs.writeFile(filePath, buf)
    }
    return fs.writeFile(filePath, f.content, 'utf-8')
  }))
  return dir
})

ipcMain.handle('store:get', (_evt, key: string) => {
  return store.get(key)
})

ipcMain.handle('store:set', (_evt, key: string, value: any) => {
  store.set(key, value)
  return true
})
