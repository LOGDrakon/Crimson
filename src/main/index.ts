import { app, BrowserWindow, ipcMain, dialog, nativeImage, nativeTheme, Menu } from 'electron'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import Store from 'electron-store'

const store = new Store({ name: 'crimson-store' })

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: BrowserWindow | null = null

function resolveIcon() {
  // Prefer platform-specific assets
  const base = process.env.VITE_PUBLIC || process.cwd()
  const candidates: string[] = []
  if (process.platform === 'win32') {
    candidates.push(join(base, 'assets', 'icon.ico'))
    candidates.push(join(base, 'icon.ico'))
    candidates.push(join(__dirname, 'icon.ico'))
  }
  // PNG fallbacks (Electron supports) – larger sizes first
  candidates.push(join(base, 'assets', 'icon.png'))
  candidates.push(join(base, 'icon.png'))
  candidates.push(join(__dirname, '../renderer/icon.png'))

  for (const p of candidates) {
    try {
      const img = nativeImage.createFromPath(p)
      if (!img.isEmpty()) return img
    } catch { /* ignore */ }
  }
  return undefined
}

async function createWindow() {
  const isDev = !app.isPackaged

  const icon = resolveIcon()
  if (process.platform === 'win32') {
    // Set AppUserModelID to ensure taskbar icon grouping & display (aligned with electron-builder appId)
    app.setAppUserModelId('com.crimson.app')
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Crimson',
    backgroundColor: '#0b0b0c',
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  // Application menu (add File > New Project)
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Nouveau Projet',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Send renderer a reset request; renderer will perform store reset
            mainWindow?.webContents.send('app:new-project')
          }
        },
        { type: 'separator' },
        { role: 'quit', label: 'Quitter' }
      ]
    },
    { role: 'editMenu' as any },
    { role: 'viewMenu' as any },
    { role: 'windowMenu' as any }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

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

  // Notify renderer of initial system theme
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow?.webContents.send('system-theme', nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
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

// Expose current system theme synchronously via invoke
ipcMain.handle('system:theme', () => nativeTheme.shouldUseDarkColors ? 'dark' : 'light')

// Push events on theme changes
nativeTheme.on('updated', () => {
  if (mainWindow) {
    mainWindow.webContents.send('system-theme', nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
  }
})

// Provide a synchronous-ish handler to clear persisted store if renderer wants a full reset
ipcMain.handle('app:resetProject', async () => {
  // Retain only minimal keys if needed; here we wipe palette-related keys
  try {
    store.delete('palettes')
    store.delete('theme')
    store.delete('themeMode')
  } catch { /* ignore */ }
  return true
})
