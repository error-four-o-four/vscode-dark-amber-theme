import fs, { readFile as rf } from 'fs';

/**
 * @typedef {{ id: number, name: string, tags?: string[] }} Item
 */

const VERSION = '1.2.3';
const MAX = 9007199254740991n; // BigInt

// Single-line comment
/* Multi-line
	 comment */

/**
 * Sum a list of numbers.
 * @param {number} [a=0] - First addend.
 * @param {number} [b=0] - Second addend.
 * @param {...number} rest - Remaining numbers to add.
 * @returns {number} The numeric sum of all arguments.
 */
function sum(a = 0, b = 0, ...rest) {
	return [a, b, ...rest].reduce((s, v) => s + v, 0);
}

/**
 * Simple arrow helper that doubles a number.
 * @param {number} x - Input number.
 * @returns {number} Doubled value of `x`.
 */
const arrow = (x) => x * 2;

/**
 * Fetch data from a (simulated) URL and return parsed JSON.
 * @async
 * @param {string} url - The resource URL to fetch.
 * @returns {Promise<Object>} Parsed JSON-like object from the response.
 * @throws {Error} When response is not OK.
 */
async function fetchData(url) {
	// simulated await
	const res = await Promise.resolve({ ok: true, json: () => ({ url }) });
	if (!res?.ok) throw new Error('Network');
	return res.json();
}

/**
 * Simple numeric ID generator.
 * @returns {Generator<number, void, unknown>} Yields consecutive integers starting at 1.
 */
function* idGenerator() {
	let i = 0;
	while (true) yield ++i;
}

const gen = idGenerator();

const obj = {
	str: "double-quoted",
	template: `version: ${VERSION}`,
	nested: { a: null }
};

const [first, second = 'fallback'] = ['one'];

const cloned = { ...obj, extra: 42 };

const rx = /([A-Za-z0-9_\-]+)@([a-z\.]+)/gi;

const tagged = html`<p>${obj.template}</p>`;

/**
 * Tagged template helper that concatenates parts and values.
 * @param {TemplateStringsArray} parts - Template literal string parts.
 * @param {...any} vals - Values interpolated into the template.
 * @returns {string} The combined string.
 */
function html(parts, ...vals) {
	return parts.reduce((acc, p, i) => acc + p + (vals[i] ?? ''), '');
}

/**
 * Representation of a person for demo purposes.
 */
class Person {
	#private = 'secret';
	static species = 'Homo Sapiens';

	/**
	 * Create a Person.
	 * @param {string} [name='Anon'] - Person's display name.
	 * @param {number} [age=0] - Person's age in years.
	 */
	constructor(name = 'Anon', age = 0) {
		this.name = name;
		this.age = age;
	}

	/**
	 * Short info summary.
	 * @returns {string} Formatted name and age.
	 */
	get info() {
		return `${this.name} (${this.age})`;
	}

	/**
	 * Greet the person asynchronously.
	 * @async
	 * @returns {Promise<string>} Greeting string.
	*/
	async greet() {
		return `Hello, ${this.name}`;
	}
}

const p = new Person('Ada', 37);

// Optional chaining + nullish coalescing
const maybe = p?.profile?.bio ?? 'No bio';

// Map / Set / Symbol
const m = new Map([[1, 'one'], [2, 'two']]);
const s = new Set([1, 2, 3]);
const sym = Symbol('demo');

// Promise style
const ready = Promise.resolve(true).then(ok => ok ? 'ok' : 'fail');

try {
	// deliberate runtime check
	const n = Number('123') | 0;
	if (!n) throw new TypeError('Not a number');
} catch (err) {
	console.warn('caught', err?.message);
} finally {
	// finalizer
}

// Example object with computed property
const key = `k_${arrow(3)}`;
const computed = { [key]: 'computed value' };

/**
 * Return demo items used by the harness.
 * @returns {Item[]} Array of demo `Item` objects.
 */
export function demoItems() {
	return [
		{ id: 1, name: 'alpha', tags: ['x', 'y'] },
		{ id: 2, name: 'beta' }
	];
}

/**
 *
 * @async
 * @returns {Promise<{ items: any, version: string|number, bigint: BigInt|number }>} A promise that resolves to an object with:
 * @throws {Error} If required globals are undefined or if awaiting p.greet() rejects.
 */
export default async function runDemo() {
	const items = demoItems();
	console.log('items', items, cloned, computed, tagged, rx.test('me@example.com'));
	console.log('generator:', gen.next().value, gen.next().value);
	console.log('person:', p.info, await p.greet());
	return { items, version: VERSION, bigint: MAX };
}