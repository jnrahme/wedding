import { createWriteStream, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(path, width, height, paint) {
  const rows = [];
  for (let y = 0; y < height; y += 1) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a] = paint(x / width, y / height, x, y);
      const offset = 1 + x * 4;
      row[offset] = r;
      row[offset + 1] = g;
      row[offset + 2] = b;
      row[offset + 3] = a;
    }
    rows.push(row);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(Buffer.concat(rows), { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  writeFileSync(path, png);
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function heroPaint(u, v, x, y) {
  const glow = Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.34) * 1.7);
  const emerald = Math.max(0, 1 - Math.hypot(u - 0.62, v - 0.6) * 1.3);
  const grain = ((x * 17 + y * 31) % 19) / 19;
  const goldLine = Math.abs(u - (0.36 + Math.sin(v * 10) * 0.035)) < 0.002 ? 70 : 0;
  return [
    mix(8, 42, glow * 0.55) + mix(0, 18, emerald * 0.2) + goldLine,
    mix(8, 34, emerald * 0.7) + mix(0, 26, glow * 0.38) + goldLine,
    mix(7, 24, emerald * 0.5) + mix(0, 15, glow * 0.28) + goldLine,
    255 - Math.round(grain * 8),
  ];
}

function venuePaint(u, v, x, y) {
  const horizon = v > 0.54 ? (v - 0.54) * 1.8 : 0;
  const skyGlow = Math.max(0, 1 - Math.hypot(u - 0.45, v - 0.22) * 1.8);
  const oliveRows = Math.sin((u + v * 0.85) * 62) > 0.82 && v > 0.42 ? 52 : 0;
  const grain = ((x * 13 + y * 29) % 23) / 23;
  return [
    mix(10, 192, skyGlow * 0.45) + oliveRows,
    mix(22, 132, horizon * 0.34) + mix(0, 92, skyGlow * 0.23) + oliveRows,
    mix(19, 82, skyGlow * 0.18) + mix(0, 30, horizon * 0.2),
    255 - Math.round(grain * 6),
  ];
}

function socialPaint(u, v, x, y) {
  const center = Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.52) * 1.55);
  const border =
    x < 16 || y < 16 || x > 1184 || y > 614 || (x > 34 && x < 36) || (y > 34 && y < 36);
  return [
    border ? 198 : mix(8, 58, center),
    border ? 161 : mix(8, 48, center * 0.7),
    border ? 91 : mix(7, 35, center * 0.45),
    255,
  ];
}

function writeWav(path) {
  const sampleRate = 44100;
  const duration = 36;
  const samples = sampleRate * duration;
  const data = Buffer.alloc(samples * 2);
  const notes = [220, 277.18, 329.63, 415.3, 554.37, 659.25];

  for (let i = 0; i < samples; i += 1) {
    const t = i / sampleRate;
    const beat = Math.floor(t * 1.25) % notes.length;
    const note = notes[beat];
    const local = (t * 1.25) % 1;
    const envelope = Math.exp(-local * 3.2) * Math.min(local * 8, 1);
    const pad = Math.sin(2 * Math.PI * 110 * t) * 0.08 + Math.sin(2 * Math.PI * 165 * t) * 0.05;
    const bell =
      Math.sin(2 * Math.PI * note * t) * 0.18 +
      Math.sin(2 * Math.PI * note * 2.01 * t) * 0.07 +
      Math.sin(2 * Math.PI * note * 3.02 * t) * 0.035;
    const sample = Math.max(-1, Math.min(1, pad + bell * envelope));
    data.writeInt16LE(Math.round(sample * 32767), i * 2);
  }

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);

  const stream = createWriteStream(path);
  stream.write(header);
  stream.write(data);
  stream.end();
}

writePng(join(root, 'public/images/couple-hero-placeholder.png'), 1600, 2200, heroPaint);
writePng(join(root, 'public/images/venue-placeholder.png'), 1800, 1200, venuePaint);
writePng(join(root, 'public/images/social-preview.png'), 1200, 630, socialPaint);
writeWav(join(root, 'public/audio/placeholder-instrumental.wav'));

console.log('Generated placeholder images and original placeholder audio.');
