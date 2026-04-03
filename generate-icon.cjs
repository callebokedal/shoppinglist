// Generates public/apple-touch-icon.png (180x180 RGBA PNG, no deps)
const zlib = require('zlib')
const fs = require('fs')

const SIZE = 180
const pixels = new Uint8Array(SIZE * SIZE * 4) // RGBA

// CRC32
const crcTable = new Uint32Array(256)
for (let i = 0; i < 256; i++) {
  let c = i
  for (let j = 0; j < 8; j++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
  crcTable[i] = c
}
function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) c = crcTable[(c ^ b) & 0xFF] ^ (c >>> 8)
  return (c ^ 0xFFFFFFFF) >>> 0
}
function makeChunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeB = Buffer.from(type, 'ascii')
  const crcB = Buffer.alloc(4)
  crcB.writeUInt32BE(crc32(Buffer.concat([typeB, data])))
  return Buffer.concat([len, typeB, data, crcB])
}

// Fill background: emerald-600 (#059669), fully opaque
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = (y * SIZE + x) * 4
    pixels[i]   = 5
    pixels[i+1] = 150
    pixels[i+2] = 105
    pixels[i+3] = 255
  }
}

function setPixel(x, y) {
  x = Math.round(x); y = Math.round(y)
  if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return
  const i = (y * SIZE + x) * 4
  pixels[i] = 255; pixels[i+1] = 255; pixels[i+2] = 255; pixels[i+3] = 255
}

function drawThickLine(x0, y0, x1, y1, w) {
  const dx = x1 - x0, dy = y1 - y0
  const steps = Math.ceil(Math.sqrt(dx*dx + dy*dy))
  const hw = Math.floor(w / 2)
  for (let s = 0; s <= steps; s++) {
    const px = x0 + dx * s / steps
    const py = y0 + dy * s / steps
    for (let ox = -hw; ox <= hw; ox++)
      for (let oy = -hw; oy <= hw; oy++)
        if (ox*ox + oy*oy <= hw*hw) setPixel(px + ox, py + oy)
  }
}

function fillCircle(cx, cy, r) {
  for (let y = -r; y <= r; y++)
    for (let x = -r; x <= r; x++)
      if (x*x + y*y <= r*r) setPixel(cx + x, cy + y)
}

// Scale: icon is designed on 100×100, scale to 180×180 with padding
const S = 1.45
const OX = 8, OY = 5

function sx(x) { return x * S + OX }
function sy(y) { return y * S + OY }

const LW = 9

// Handle: from (18,22) to (28,22) to (38,62) — corner + shaft
drawThickLine(sx(18), sy(22), sx(82), sy(22), LW)   // top bar
drawThickLine(sx(18), sy(22), sx(38), sy(62), LW)   // left side / handle
drawThickLine(sx(38), sy(62), sx(74), sy(62), LW)   // basket bottom
drawThickLine(sx(82), sy(22), sx(74), sy(62), LW)   // right side

// Wheels
fillCircle(sx(46), sy(76), 9)
fillCircle(sx(68), sy(76), 9)

// Build PNG
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(SIZE, 0)
ihdr.writeUInt32BE(SIZE, 4)
ihdr[8] = 8; ihdr[9] = 6  // 8-bit RGBA

const rawRows = []
for (let y = 0; y < SIZE; y++) {
  rawRows.push(Buffer.from([0]))  // filter: None
  rawRows.push(Buffer.from(pixels.buffer, y * SIZE * 4, SIZE * 4))
}
const compressed = zlib.deflateSync(Buffer.concat(rawRows))

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  makeChunk('IHDR', ihdr),
  makeChunk('IDAT', compressed),
  makeChunk('IEND', Buffer.alloc(0)),
])

fs.writeFileSync('/app/public/apple-touch-icon.png', png)
console.log('Generated public/apple-touch-icon.png (' + png.length + ' bytes)')
