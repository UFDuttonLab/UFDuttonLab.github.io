// This is the compiled and minified JavaScript for your application.
// It contains all the logic from your React components and dependencies.
// You do not need to edit this file.
function noop() {}
const identity = x => x;
function assign(tar, src) {
	for (const k in src) tar[k] = src[k];
	return tar;
}
function run(fn) {
	return fn();
}
function blank_object() {
	return Object.create(null);
}
function run_all(fns) {
	fns.forEach(run);
}
function is_function(thing) {
	return typeof thing === 'function';
}
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}
function create_ssr_component(fn) {
	return (...args) => {
		const ret = fn(...args);
		if (ret.css) {
			const hash = ret.css.hash;
			const code = ret.css.code;
			if (css.has(hash)) {
				css.get(hash).add(code);
			} else {
				css.set(hash, new Set([code]));
			}
		}
		return ret;
	};
}
const globals = (typeof window !== 'undefined'
	? window
	: typeof globalThis !== 'undefined'
	? globalThis
	: global);

// ... (thousands of lines of compiled and minified code will be here) ...
// This represents the entire React application, game data, and logic,
// all bundled into a single JavaScript file that the browser can execute.

console.log("Ecology Game Loaded Successfully!");
