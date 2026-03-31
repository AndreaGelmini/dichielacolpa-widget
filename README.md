# Di Chi È La Colpa? - Widget

Embeddable responsibility calculator widget for third-party websites. Allows visitors to determine responsibility in a road traffic incident with a simple form.

## Project Structure

```
widgets/
├── src/
│   └── rca/                    # RCA (Responsabilità Civile Auto) widget
│       ├── widget.ts           # TypeScript source
│       ├── styles.css          # CSS styles
│       └── build.js            # Build script
├── build/                      # Compiled output
│   └── rca/
│       └── widget.js           # Bundled JS with CSS inlined
├── package.json
├── tsconfig.json
└── README.md
```

## Adding a New Widget

To add a new widget (e.g., infortuni):

1. **Create directory:** `src/infortuni/`

2. **Create files:**
   - `src/infortuni/widget.ts` - TypeScript source
   - `src/infortuni/styles.css` - CSS styles
   - `src/infortuni/build.js` - Build script

3. **Build script pattern:**
   ```javascript
   const esbuild = require('esbuild');
   const fs = require('fs');
   const path = require('path');

   const srcDir = __dirname;
   const cssContent = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
   const outDir = path.join(__dirname, '..', '..', 'build', 'infortuni');

   if (!fs.existsSync(outDir)) {
       fs.mkdirSync(outDir, { recursive: true });
   }

   const buildOptions = {
       entryPoints: [path.join(srcDir, 'widget.ts')],
       bundle: true,
       minify: true,
       outfile: path.join(outDir, 'widget.js'),
       format: 'iife',
       globalName: 'dcecInfortuniWidget',
       define: {
           'DCEC_CSS': JSON.stringify(cssContent)
       }
   };

   esbuild.build(buildOptions).then(() => {
       console.log('Build completed: build/infortuni/widget.js');
   });
   ```

4. **Widget TypeScript pattern:**
   - Use `DCEC_CSS` constant injected at build time
   - Example in `src/rca/widget.ts`

5. **Update package.json scripts** to build all widgets:
   ```json
   "scripts": {
     "build": "node src/rca/build.js && node src/infortuni/build.js",
     "dev": "node src/rca/build.js --watch"
   }
   ```

## Features

- 🔧 **Easy Integration** - Copy-paste one line of HTML
- 🎨 **Customizable** - Title, colors, labels via data attributes
- 📱 **Responsive** - Mobile-first, works on any screen size
- ♿ **Accessible** - WCAG compliant
- 🔒 **Secure** - XSS protection on all inputs
- 🔔 **Custom Events** - Integrate with analytics (dcec:init, dcec:submit, dcec:redirect, dcec:return)
- 🤖 **AI Assistant** - Optional AI button for deeper analysis
- 🔄 **Cross-tab Communication** - Detects when user returns from result page

## Quick Start

### Via CDN

```html
<div id="dcec-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/AndreaGelmini/dichielacolpa-widget@latest/build/rca/widget.js" data-auto-init="true"></script>
```

### Via npm

```bash
npm install dichielacolpa-widget
```

```javascript
import { dcecWidget } from 'dichielacolpa-widget';

dcecWidget.init({
    container: '#my-widget',
    title: 'Calcola la responsabilità',
    primaryColor: '#2563eb'
});
```

## Configuration

All options can be set via `data-*` attributes or JavaScript:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-container` | string | `#dcec-widget` | CSS selector or DOM element |
| `data-title` | string | `Calcola la responsabilità` | Widget title |
| `data-primary-color` | hex | `#2563eb` | Submit button color |
| `data-ai-color` | hex | `#6b7280` | AI button color |
| `data-bg-color` | hex | `#ffffff` | Widget background |
| `data-btn-label` | string | `Calcola` | Submit button text |
| `data-ai-label` | string | `Assistente AI` | AI button text |
| `data-show-ai` | boolean | `false` | Show AI button |
| `data-target` | string | `_self` | Open result in same tab (`_self`) or new tab (`_blank`) |

## Events

The widget emits custom events you can listen to:

```javascript
// Widget initialized
document.addEventListener('dcec:init', (e) => {
    console.log('Widget initialized:', e.detail);
    // e.detail = { config, element, widgetId }
});

// Form submitted
document.addEventListener('dcec:submit', (e) => {
    console.log('Form submitted:', e.detail);
    // e.detail = { caso_a, caso_b, element }
    // Use e.preventDefault() to cancel redirect
});

// Before redirect
document.addEventListener('dcec:redirect', (e) => {
    console.log('Redirecting to:', e.detail.url);
    // e.detail = { url, element }
    // Use e.preventDefault() to cancel redirect
});

// User returns from result page (only when target="_blank")
document.addEventListener('dcec:return', (e) => {
    console.log('User returned, method:', e.detail.method);
    // e.detail = { method: 'focus'|'close'|'navigate-back', element, timestamp }
});
```

## Styling

### CSS Custom Properties

Override these variables to customize the widget:

```css
.dcec-widget {
    --dcec-primary: #2563eb;       /* Submit button background */
    --dcec-primary-text: #ffffff;  /* Submit button text */
    --dcec-bg: #ffffff;            /* Widget background */
    --dcec-text: #111827;          /* Text color */
    --dcec-border: #d1d5db;        /* Border color */
    --dcec-muted: #6b7280;        /* Muted text */
    --dcec-ai: #6b7280;           /* AI button background */
    --dcec-select-bg: #ffffff;     /* Select background (always white for contrast) */
}
```

### CSS Classes

| Class | Description |
|-------|-------------|
| `.dcec-widget` | Main container |
| `.dcec-title` | Widget title |
| `.dcec-fields` | Form fields grid container |
| `.dcec-field` | Individual field wrapper |
| `.dcec-label` | Field label |
| `.dcec-select` | Select dropdown |
| `.dcec-actions` | Buttons container |
| `.dcec-btn-submit` | Submit button |
| `.dcec-btn-ai` | AI button |
| `.dcec-powered` | "Powered by" attribution |

### Container Queries

The widget uses CSS container queries for responsive layout. The fields switch from 1 column to 2 columns when the container is at least 480px wide:

```css
@container widget (min-width: 480px) {
    .dcec-fields {
        grid-template-columns: 1fr 1fr;
    }
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+

Requires `BroadcastChannel` API for cross-tab return detection (feature detection included).

## API Reference

### `dcecWidget.init(options)`

Initialize the widget programmatically.

```javascript
dcecWidget.init({
    container: '#dcec-widget',
    title: 'Calcola la responsabilità',
    primaryColor: '#2563eb',
    bgColor: '#ffffff',
    aiColor: '#6b7280',
    btnLabel: 'Calcola',
    aiLabel: 'Assistente AI',
    showAi: true,
    target: '_self'
});
```

### `dcecWidget.events`

Event constants for programmatic use:

```javascript
dcecWidget.events.INIT    // 'dcec:init'
dcecWidget.events.SUBMIT  // 'dcec:submit'
dcecWidget.events.REDIRECT // 'dcec:redirect'
dcecWidget.events.RETURN  // 'dcec:return'
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Lint
npm run lint

# Type check
npm run typecheck

# Format
npm run format
```

## License

MIT - See LICENSE file

## Author

Andrea Gelmini - [dichielacolpa.it](https://dichielacolpa.it)