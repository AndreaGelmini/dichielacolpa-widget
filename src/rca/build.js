const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const srcDir = __dirname;
const cssContent = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
const outDir = path.join(__dirname, '..', '..', 'build', 'rca');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Opzioni comuni a entrambi i bundle
const sharedOptions = {
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['es2017'],
    define: {
        'DCEC_CSS': JSON.stringify(cssContent),
        'process.env.NODE_ENV': '"production"',
    },
    loader: { '.ts': 'ts' },
};

// Bundle CDN — IIFE, si auto-esegue, registra su window.dcecWidgets.RCA
const cdnOptions = {
    ...sharedOptions,
    entryPoints: [path.join(srcDir, 'widget.cdn.ts')],
    format: 'iife',
    outfile: path.join(outDir, 'widget.js'),
};

// Bundle ESM — per npm/import, zero side effects
const esmOptions = {
    ...sharedOptions,
    entryPoints: [path.join(srcDir, 'widget.esm.ts')],
    format: 'esm',
    outfile: path.join(outDir, 'widget.esm.js'),
};

async function build() {
    try {
        if (isWatch) {
            // In watch mode costruiamo solo il CDN (più utile in sviluppo)
            const ctx = await esbuild.context(cdnOptions);
            await ctx.watch();
            console.log('Watching for changes... (CDN bundle only)');
        } else {
            await Promise.all([
                esbuild.build(cdnOptions),
                esbuild.build(esmOptions),
            ]);
            console.log('Build completed:');
            console.log('  CDN → build/rca/widget.js');
            console.log('  ESM → build/rca/widget.esm.js');
        }
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();