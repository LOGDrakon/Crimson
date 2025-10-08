import { app, BrowserWindow, ipcMain, dialog, nativeImage, nativeTheme, Menu } from 'electron'
import { join } from 'node:path'
import fs from 'node:fs/promises'
import Store from 'electron-store'

// Optional userData override & cache toggles (must be before app ready logic ideally)
const customUserData = process.env.CRIMSON_USER_DATA
if (customUserData) {
  try { app.setPath('userData', customUserData) } catch { /* ignore */ }
}
if (process.env.CRIMSON_DISABLE_GPU_CACHE === '1') {
  app.commandLine.appendSwitch('disable-gpu-shader-disk-cache')
}
if (process.env.CRIMSON_DISABLE_HTTP_CACHE === '1') {
  app.commandLine.appendSwitch('disable-http-cache')
}

const store = new Store({ name: 'crimson-store' })

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: BrowserWindow | null = null
let splashWindow: BrowserWindow | null = null
let showTimeout: NodeJS.Timeout | null = null

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

async function createSplash() {
  // Only show splash in production (avoid dev flicker) and if not disabled via env
  const showSplash = app.isPackaged && process.env.CRIMSON_NO_SPLASH !== '1'
  if (!showSplash) return
  splashWindow = new BrowserWindow({
    width: 340,
    height: 340,
    transparent: true,
    frame: false,
    resizable: false,
    show: false,
    alwaysOnTop: true,
    backgroundColor: '#00000000',
  })
  const splashHtml = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Crimson</title><style>
    html,body{margin:0;padding:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#10121a,#06070a);font-family:system-ui,sans-serif;color:#eee}
    .fade-in{animation:fade .6s cubic-bezier(.16,.8,.24,1)}
    @keyframes fade{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
    @media (prefers-reduced-motion: reduce){.fade-in{animation:none}}
    .hint{position:absolute;bottom:10px;font-size:11px;letter-spacing:.5px;opacity:.55}
  </style></head><body>
  <div class='fade-in' id='logo'>Chargement…</div>
  <div class='hint'>Initialisation de la palette…</div>
  <script>
    fetch('./assets/temp/crimson_icon_animated.svg').then(r=>r.text()).then(svg=>{document.getElementById('logo').innerHTML = svg}).catch(()=>{document.getElementById('logo').textContent='Crimson'})
  </script>
  </body></html>`
  try {
    const tmpPath = join(app.getPath('userData'), 'splash.html')
    await fs.writeFile(tmpPath, splashHtml, 'utf-8')
    await splashWindow.loadFile(tmpPath)
    splashWindow.showInactive()
  } catch { /* ignore */ }
}

async function createWindow() {
  const isDev = !app.isPackaged

  const icon = resolveIcon()
  if (process.platform === 'win32') {
    // Set AppUserModelID to ensure taskbar icon grouping & display (aligned with electron-builder appId)
    app.setAppUserModelId('com.crimson.app')
  }

  await createSplash()

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Crimson',
    backgroundColor: '#0b0b0c',
    icon: icon,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  })

  // Fallback show if load events never fire (e.g. dev server port mismatch)
  showTimeout = setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show()
      if (splashWindow) {
        splashWindow.close()
        splashWindow = null
      }
    }
  }, 8000)

  mainWindow.webContents.on('did-fail-load', (_e, code, desc) => {
    console.warn('Renderer failed to load:', code, desc)
    if (!mainWindow) return
    mainWindow.show()
    if (splashWindow) {
      splashWindow.close()
      splashWindow = null
    }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    try {
      await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    } catch (err) {
      console.error('Failed to load dev URL, attempting fallback file:', err)
      const indexHtml = join(__dirname, '../renderer/index.html')
      await mainWindow.loadFile(indexHtml)
    }
  } else {
    const indexHtml = join(__dirname, '../renderer/index.html')
    await mainWindow.loadFile(indexHtml)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.once('did-finish-load', () => {
    if (showTimeout) {
      clearTimeout(showTimeout)
      showTimeout = null
    }
    mainWindow?.webContents.send('system-theme', nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
    mainWindow?.show()
    if (splashWindow) {
      splashWindow.close()
      splashWindow = null
    }
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
