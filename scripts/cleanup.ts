import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../themes/dark-amber-color-theme-base.json', import.meta.url));
const target = fileURLToPath(new URL('../themes/dark-amber-color-theme.json', import.meta.url));
console.log('Reading file %o', source);

const data = readFileSync(source, 'utf-8')
	.split('\n')
	.filter(line => line.trim() !== '' && !line.trimStart().startsWith('//'))
	.join('\n');

writeFileSync(target, data, 'utf-8');
console.log('Written file %o', target);