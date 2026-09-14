import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';

try {
  process.loadEnvFile(resolve(import.meta.dirname, '..', '.env'));
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY. Add it to .env first.');
  process.exit(1);
}

const model = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const outDir = resolve(import.meta.dirname, '..', 'public', 'images', 'generated');

const STYLE = 'Editorial documentary photograph, shot on 35mm, shallow depth of field, soft low-key ambient light with deep navy blue shadows and a few warm tungsten highlights, subtle film grain, premium understated luxury, candid unposed moment, natural skin texture, realistic hands. Absolutely no text, letters, numbers, logos, watermarks or readable screens anywhere in the image.';

const SHOTS = [
  {
    id: 'service-intelligence',
    size: '1536x1024',
    prompt: 'A woman in her 40s, senior marketing director, sitting at a dark walnut desk late in the evening, studying a laptop screen whose glow lights her face in cool blue; handwritten notes and a coffee cup beside her; glass office wall with blurred city lights behind. Composition: subject on the left third, generous dark negative space on the right for overlay text.'
  },
  {
    id: 'service-authority',
    size: '1536x1024',
    prompt: 'Two professionals, a man and a woman in tailored dark clothing, reviewing printed editorial magazine pages and a tablet spread across a large table in a quiet private library with dark wood shelves; one points at a page thoughtfully. Composition: subjects slightly right of centre, calm negative space on the left.'
  },
  {
    id: 'service-positioning',
    size: '1536x1024',
    prompt: 'A composed man in his 50s, founder of a luxury brand, standing by a tall window of a minimalist penthouse at dusk, holding a smartphone at chest height and looking out over a Mediterranean coastline; deep blue evening sky, warm interior lamp glow. Composition: subject on the right third, open sky and space on the left.'
  },
  {
    id: 'service-monitoring',
    size: '1536x1024',
    prompt: 'A small strategy team of three diverse professionals in a dim modern meeting room, gathered around a large wall display showing only abstract soft blue glowing shapes and lines (no text, no numbers), one person gesturing towards it; reflections on a polished table. Composition: wide, team in the lower centre, display glow filling the upper area.'
  },
  {
    id: 'market-ask-ai',
    size: '1024x1536',
    prompt: 'Close, intimate vertical portrait of a well-dressed woman in the back seat of a luxury car at night, holding a smartphone and speaking a question to it, the phone screen lighting her face in soft blue; city lights bokeh through the rain-speckled window behind her. Phone screen is angled away and not readable.'
  },
  {
    id: 'cta-advisor',
    size: '1536x1024',
    prompt: 'A trusted senior advisor, man in his 50s with grey hair and a navy suit, seated across a small table from a client in a private members club, leaning in and listening attentively; the client is seen from behind, out of focus in the foreground. Deep navy and charcoal tones, single warm lamp. Composition: advisor slightly right of centre, dark soft background suitable for a dark overlay.'
  }
];

const force = process.argv.includes('--force');
const only = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const shots = only.length ? SHOTS.filter((shot) => only.includes(shot.id)) : SHOTS;

await mkdir(outDir, { recursive: true });

for (const shot of shots) {
  const file = join(outDir, `${shot.id}.webp`);
  if (!force && await access(file).then(() => true, () => false)) {
    console.log(`skip ${shot.id} (exists, use --force to regenerate)`);
    continue;
  }
  console.log(`generating ${shot.id} with ${model}...`);
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt: `${shot.prompt} ${STYLE}`,
      size: shot.size,
      quality: 'high',
      output_format: 'webp',
      output_compression: 82,
      n: 1
    })
  });
  const body = await response.json();
  if (!response.ok) {
    console.error(`failed ${shot.id}: ${body.error?.message || response.status}`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(file, Buffer.from(body.data[0].b64_json, 'base64'));
  console.log(`saved public/images/generated/${shot.id}.webp`);
}
