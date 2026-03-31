const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const srcDir = path.join(__dirname);
const cssFile = path.join(srcDir, 'styles.css');

// Read CSS file and inline as string
const cssContent = fs.readFileSync(cssFile, 'utf8');

// Output directory
const outDir = path.join(__dirname, '..', '..', 'build', 'rca');

// Ensure output directory exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Create build options
const buildOptions = {
    entryPoints: [path.join(srcDir, 'widget.ts')],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: path.join(outDir, 'widget.js'),
    format: 'iife',
    target: ['es2017'],
    globalName: 'dcecWidget',
    define: {
        'DCEC_CSS': JSON.stringify(cssContent),
        'process.env.NODE_ENV': '"production"'
    },
    loader: {
        '.ts': 'ts'
    }
};

async function build() {
    try {
        if (isWatch) {
            const ctx = await esbuild.context(buildOptions);
            await ctx.watch();
            console.log('Watching for changes...');
        } else {
            await esbuild.build(buildOptions);
            console.log('Build completed: build/rca/widget.js');
        }
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
