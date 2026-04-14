/**
 * Di Chi È La Colpa? - Widget Embeddable (RCA)
 * Renders a responsibility calculator form for third-party sites.
 *
 * Usage A — Auto-init via data attributes (embed on third-party sites):
 *   <div id="dcec-widget"></div>
 *   <script src="https://cdn.jsdelivr.net/gh/AndreaGelmini/dichielacolpa-widget@latest/build/rca/widget.js" data-auto-init=“true” data-container=“#dcec-widget” ...></script>
 *
 * Usage B — Programmatic (e.g., preview page):
 *   <script src="widget.js"></script>
 *   <script>window.dcecWidget.init({ container: ‘#dcec-widget’, ... });</script>
 */

const scriptEl = document.currentScript;

import { init, parseBoolean, EVENTS } from './main';

const RCA = { init, events: EVENTS };

// Record on the screen without overwriting other widgets
(window as any).dcecWidgets = (window as any).dcecWidgets || {};
(window as any).dcecWidgets.RCA = RCA;

if (scriptEl?.getAttribute('data-auto-init') === 'true') { 
    const config = {
        container: scriptEl.getAttribute('data-container') || '#dcec-widget',
        title: scriptEl.getAttribute('data-title') || undefined,
        primaryColor: scriptEl.getAttribute('data-primary-color') || undefined,
        bgColor: scriptEl.getAttribute('data-bg-color') || undefined,
        aiColor: scriptEl.getAttribute('data-ai-color') || undefined,
        btnLabel: scriptEl.getAttribute('data-btn-label') || undefined,
        aiLabel: scriptEl.getAttribute('data-ai-label') || undefined,
        showAi: parseBoolean(scriptEl.getAttribute('data-show-ai')),
        target: (scriptEl.getAttribute('data-target') || '_self') as '_self' | '_blank',
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => init(config));
    } else {
        init(config);
    }
}