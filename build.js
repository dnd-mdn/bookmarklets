#!/usr/bin/env node
/**
 * Scans scripts/ for .js files, reads their JSDoc header tags,
 * and writes scripts/manifest.json.
 *
 * Supported tags: @name, @description, @version
 * If @name is absent the filename (without .js) is used as the name.
 *
 * Usage:  node build-manifest.js
 */

const fs   = require("fs");
const path = require("path");

const SCRIPTS_DIR   = path.join(__dirname, "scripts");
const MANIFEST_PATH = path.join(SCRIPTS_DIR, "manifest.json");

function parseJsDoc(source) {
	const match = source.match(/^\/\*\*([\s\S]*?)\*\//);
	if (!match) return {};

	const block = match[1];
	const tag = (name) => {
		const m = block.match(new RegExp(`@${name}\\s+(.+)`));
		return m ? m[1].trim() : undefined;
	};

	return {
		name:        tag("name"),
		description: tag("description"),
		version:     tag("version"),
	};
}

const files = fs.readdirSync(SCRIPTS_DIR)
	.filter(f => f.endsWith(".js"))
	.sort();

const manifest = files.map(file => {
	const source = fs.readFileSync(path.join(SCRIPTS_DIR, file), "utf8");
	const doc    = parseJsDoc(source);

	const entry = { file };
	if (doc.name)        entry.name        = doc.name;
	if (doc.description) entry.description = doc.description;
	if (doc.version)     entry.version     = doc.version;
	return entry;
});

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${manifest.length} entr${manifest.length === 1 ? "y" : "ies"} to scripts/manifest.json`);
manifest.forEach(e => console.log(`  • ${e.file}${e.name ? ` → ${e.name}` : ""}`));
