import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('👀 Watching markdown files for changes...\n');

// Watch all .md files in the root directory
fs.watch(rootDir, { recursive: false }, (eventType, filename) => {
  if (filename && filename.endsWith('.md')) {
    console.log(`\n📝 Detected change in: ${filename}`);
    console.log('🔄 Running markdown conversion...\n');
    
    exec('npm run build:md', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  }
});

console.log('Press Ctrl+C to stop watching.');
