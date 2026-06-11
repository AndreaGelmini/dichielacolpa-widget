/**
 * Whose Fault Is It? — RCA Widget
 * Widget logic
 * Imported from widget.cdn.ts and widget.esm.ts
 */

// ============================================================================
// Types
// ============================================================================

export interface WidgetConfig {
    container: string | HTMLElement;
    title: string;
    primaryColor: string;
    bgColor: string;
    aiColor: string;
    btnLabel: string;
    aiLabel: string;
    showAi: boolean;
    target: '_self' | '_blank';
}

export const EVENTS = {
    INIT: 'dcec:init',
    SUBMIT: 'dcec:submit',
    REDIRECT: 'dcec:redirect',
    RETURN: 'dcec:return',
} as const;

// ============================================================================
// Constants
// ============================================================================

export const CIRCUMSTANCES: string[] = [
    '1 - Veicolo in sosta o in fermata',
    '2 - Ripartiva dopo una sosta/apriva una portiera',
    '3 - Stava parcheggiando',
    '4 - Usciva da un parcheggio, da un luogo privato, da una strada vicinale',
    '5 - Entrava in un parcheggio, in un luogo privato, in una strada vicinale',
    '6 - Si immetteva su una piazza a senso rotatorio',
    '7 - Circolava su una piazza a senso rotatorio',
    '8 - Tampona procedendo nello stesso senso o nella stessa fila',
    '9 - Procedeva nello stesso senso, ma in fila diversa',
    '10 - Cambiava fila',
    '11 - Sorpassava',
    '12 - Girava a destra',
    '13 - Girava a sinistra',
    '14 - Retrocedeva',
    '15 - Invadeva la sede stradale riservata alla circolazione in senso inverso',
    '16 - Proveniva da destra',
    '17 - Non aveva osservato il segnale di precedenza o di semaforo rosso',
];

export const BASE_URL = 'https://www.dichielacolpa.it';

// CSS injected at build time by esbuild (define: DCEC_CSS)
// @ts-ignore
export const WIDGET_CSS: string = DCEC_CSS;

// ============================================================================
// Utilities
// ============================================================================

export function escapeHtml(text: unknown): string {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

export function escapeAttr(text: unknown): string {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export function parseBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true' || value === '1' || value === 'yes';
    return false;
}

export function dispatch(element: Element, eventName: string, detail: unknown): boolean {
    return element.dispatchEvent(
        new CustomEvent(eventName, { bubbles: true, cancelable: true, detail })
    );
}

// ============================================================================
// Defaults
// ============================================================================
 
export function defaults(options?: Partial<WidgetConfig>): WidgetConfig {
    return {
        container: options?.container ?? '#dcec-widget',
        title: options?.title ?? 'Chi ha ragione?',
        primaryColor: options?.primaryColor ?? '#2563eb',
        bgColor: options?.bgColor ?? '#ffffff',
        aiColor: options?.aiColor ?? '#6b7280',
        btnLabel: options?.btnLabel ?? 'Scoprilo',
        aiLabel: options?.aiLabel ?? 'Chiedi a cAI',
        showAi: parseBoolean(options?.showAi),
        target: options?.target === '_blank' ? '_blank' : '_self',
    };
}

// ============================================================================
// Styles injection (una sola volta per pagina)
// ============================================================================

export function injectStyles(): void {
    if (document.getElementById('dcec-widget-rca-styles')) {
        return;
    }
    const style = document.createElement('style');
    style.id = 'dcec-widget-rca-styles';
    style.textContent = WIDGET_CSS;
    document.head.appendChild(style);
}

// ============================================================================
// Widget rendering
// ============================================================================
 
export function buildOptions(items: string[]): string {
    return items
        .map((label, i) => `<option value="${i + 1}">${escapeHtml(label)}</option>`)
        .join('');
}

export function createWidget(config: WidgetConfig): void {
    const el =
        typeof config.container === 'string'
            ? document.querySelector(config.container)
            : config.container;
 
    if (!el) {
        console.error('DCEC Widget: container non trovato:', config.container);
        return;
    }
 
    const id = Math.random().toString(36).slice(2, 11);
    const opts = buildOptions(CIRCUMSTANCES);
 
    const aiBtn = config.showAi
        ? `<button class="dcec-btn dcec-btn-ai" type="button" data-ai-btn="true">${escapeHtml(config.aiLabel)}</button>`
        : '';
 
    el.innerHTML = `
        <div class="dcec-widget" id="dcec-${id}">
            <h3 class="dcec-title">${escapeHtml(config.title)}</h3>
            <form class="dcec-form">
                <div class="dcec-fields">
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-a-${id}">Veicolo A (il tuo)</label>
                        <select class="dcec-select" id="dcec-a-${id}" name="caso_a" required aria-required="true">
                            <option value="">Seleziona...</option>${opts}
                        </select>
                    </div>
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-b-${id}">Veicolo B (altro veicolo)</label>
                        <select class="dcec-select" id="dcec-b-${id}" name="caso_b" required aria-required="true">
                            <option value="">Seleziona...</option>${opts}
                        </select>
                    </div>
                </div>
                <div class="dcec-actions">
                    <button class="dcec-btn dcec-btn-submit" type="submit">${escapeHtml(config.btnLabel)}</button>
                    ${aiBtn}
                </div>
            </form>
            <p class="dcec-powered">
                <span>Powered by <a href="${BASE_URL}" target="_blank" rel="noopener">www.dichielacolpa.it</a></span>
            </p>
        </div>
    `;
 
    // Custom colors using CSS variables
    const widget = el.querySelector<HTMLElement>('.dcec-widget')!;
    widget.style.setProperty('--dcec-primary', escapeAttr(config.primaryColor));
    widget.style.setProperty('--dcec-bg', escapeAttr(config.bgColor));
    widget.style.setProperty('--dcec-ai', escapeAttr(config.aiColor));
 
    // init event
    // asynchronous, to allow the caller to register listeners first
    setTimeout(() => dispatch(el, EVENTS.INIT, { config, element: el, widgetId: id }), 0);
 
    // Submit
    const form = el.querySelector<HTMLFormElement>('.dcec-form')!;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
 
        const casoA = form.querySelector<HTMLSelectElement>('[name="caso_a"]')!.value;
        const casoB = form.querySelector<HTMLSelectElement>('[name="caso_b"]')!.value;
        if (!casoA || !casoB) return;
        if (casoA === casoB) return;
 
        if (!dispatch(el, EVENTS.SUBMIT, { caso_a: casoA, caso_b: casoB, element: el })) return;
 
        const ref = encodeURIComponent(window.location.href);
        const refidParam = config.target === '_blank' ? `&refid=${id}` : '';
        const url = `${BASE_URL}/third-party-liability-result?caso_a=${casoA}&caso_b=${casoB}&ref=${ref}${refidParam}`;
 
        if (!dispatch(el, EVENTS.REDIRECT, { url, element: el })) return;
 
        if (config.target === '_blank') {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    });
 
    // Pulsante AI
    const aiButton = el.querySelector<HTMLButtonElement>('[data-ai-btn="true"]');
    if (aiButton) {
        aiButton.addEventListener('click', () => {
            const url = `${BASE_URL}/#tool-ai-assistant`;
            if (config.target === '_blank') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        });
    }
 
    // Listener ritorno da nuova tab
    if (config.target === '_blank') {
        setupReturnListener(el, id);
    }
}

export function init(options?: Partial<WidgetConfig>) : WidgetConfig {
    const config = defaults(options);
    injectStyles();
    createWidget(config);
    return config;
};

// ============================================================================
// BroadcastChannel — Detect return from the results tab
// ============================================================================


export function setupReturnListener(el: Element, widgetId: string): void {
    let returned = false;

    const notify = (method: string) => {
        if (returned) return;
        returned = true;
        dispatch(el, 'dcec:return', { method, element: el, timestamp: Date.now() });
        channel?.close();
        window.removeEventListener('focus', onFocus);
        document.removeEventListener('visibilitychange', onVisibility);
    };

    let channel: BroadcastChannel | null = null;
    try {
        channel = new BroadcastChannel(`dcec-widget-channel-${widgetId}`);
        channel.onmessage = (e) => {
            if (e.data?.type === 'dcec-return') notify(e.data.method || 'close');
        };
    } catch {
        // BroadcastChannel non disponibile, fallback su focus/visibility
    }

    const onFocus = () => notify('focus');
    const onVisibility = () => {
        if (document.visibilityState === 'visible') notify('focus');
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
}
