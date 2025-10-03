export async function extractTopColors(dataUrl: string, maxColors = 5): Promise<string[]> {
  const img = new Image()
  img.src = dataUrl
  await img.decode()
  const canvas = document.createElement('canvas')
  const w = Math.min(400, img.naturalWidth || img.width)
  const h = Math.min(400, img.naturalHeight || img.height)
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  const { data } = ctx.getImageData(0, 0, w, h)
  const buckets = new Map<string, number>()
  const step = 4 * 4 // sample every 4th pixel
  for (let i = 0; i < data.length; i += step) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 200) continue
    // Bucket to reduce noise (quantize to 16 levels)
    const qr = Math.round(r / 16) * 16
    const qg = Math.round(g / 16) * 16
    const qb = Math.round(b / 16) * 16
    const key = `${qr},${qg},${qb}`
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }
  const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, maxColors)
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return sorted.map(([k]) => {
    const [r, g, b] = k.split(',').map(Number)
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  })
}
