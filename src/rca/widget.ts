/**
 * Di Chi È La Colpa? - Widget Embeddable (RCA)
 * Renders a responsibility calculator form for third-party sites.
 *
 * Features:
 * - Customizable title, colors
 * - CSS custom properties for easy theming
 * - Custom events for integration (dcec:init, dcec:submit, dcec:redirect, dcec:return)
 * - AI button with custom color and label
 * - Responsive layout (mobile-first, container queries)
 * - Accessible and WCAG compliant
 * - XSS protection on data-* attributes
 * - BroadcastChannel for cross-tab communication
 */

(function () {
    'use strict';

    // ============================================================================
    // Types
    // ============================================================================

    interface WidgetConfig {
        container: string | HTMLElement;
        title: string;
        primaryColor: string;
        bgColor: string;
        aiColor: string;
        btnLabel: string;
        aiLabel: string;
        showAi: boolean | string;
        target: '_self' | '_blank';
    }

    interface WidgetEvents {
        INIT: string;
        SUBMIT: string;
        REDIRECT: string;
        RETURN: string;
    }

    // ============================================================================
    // Constants
    // ============================================================================

    const CIRCUMSTANCES: string[] = [
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
        '17 - Non aveva osservato il segnale di precedenza o di semaforo rosso'
    ];

    const BASE_URL = 'https://dichielacolpa.altervista.org';

    // CSS injected at build time via esbuild define
    // @ts-ignore - DCEC_CSS is defined at build time
    const WIDGET_CSS = DCEC_CSS;

    // ============================================================================
    // Utilities
    // ============================================================================

    function escapeHtml(text: unknown): string {
        if (text === null || text === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    function escapeAttr(text: unknown): string {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function parseBoolean(value: unknown): boolean {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
            return value === 'true' || value === '1' || value === 'yes';
        }
        return false;
    }

    function dispatchCustomEvent(element: Element, eventName: string, detail: unknown): boolean {
        const event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: detail
        });
        return element.dispatchEvent(event);
    }

    // ============================================================================
    // Styles Injection
    // ============================================================================

    let stylesInjected = false;

    function injectStyles(): void {
        if (stylesInjected) return;
        if (document.getElementById('dcec-widget-styles')) {
            stylesInjected = true;
            return;
        }

        const styleEl = document.createElement('style');
        styleEl.id = 'dcec-widget-styles';
        styleEl.textContent = WIDGET_CSS;
        document.head.appendChild(styleEl);
        stylesInjected = true;
    }

    // ============================================================================
    // Widget Creation
    // ============================================================================

    function createWidget(config: WidgetConfig): void {
        const container = config.container;
        if (!container) {
            console.error('DCEC Widget: container not specified');
            return;
        }

        const el = typeof container === 'string' ? document.querySelector(container) : container;
        if (!el) {
            console.error('DCEC Widget: container element not found:', config.container);
            return;
        }

        const id = Math.random().toString(36).substr(2, 9);
        const title = escapeHtml(config.title || 'Calcola la responsabilità');
        const primaryColor = escapeAttr(config.primaryColor || '#2563eb');
        const bgColor = escapeAttr(config.bgColor || '#ffffff');
        const aiColor = escapeAttr(config.aiColor || '#6b7280');
        const btnLabel = escapeHtml(config.btnLabel || 'Calcola');
        const aiLabel = escapeHtml(config.aiLabel || 'Assistente AI');
        const showAi = parseBoolean(config.showAi);
        const target = config.target === '_blank' ? '_blank' : '_self';

        // Build HTML structure
        let html = '<div class="dcec-widget" id="dcec-' + id + '">';

        // Title
        html += '<h3 class="dcec-title">' + title + '</h3>';

        // Form
        html += '<form class="dcec-form">';

        // Fields container
        html += '<div class="dcec-fields">';

        // Field A
        html += '<div class="dcec-field dcec-field-a">';
        html += '<label class="dcec-label dcec-label-a" for="dcec-select-a-' + id + '">Veicolo A (il tuo)</label>';
        html += '<select class="dcec-select dcec-select-a" id="dcec-select-a-' + id + '" name="caso_a" required aria-required="true">';
        html += '<option value="">Seleziona...</option>';
        for (let i = 0; i < CIRCUMSTANCES.length; i++) {
            html += '<option value="' + (i + 1) + '">' + escapeHtml(CIRCUMSTANCES[i]) + '</option>';
        }
        html += '</select></div>';

        // Field B
        html += '<div class="dcec-field dcec-field-b">';
        html += '<label class="dcec-label dcec-label-b" for="dcec-select-b-' + id + '">Veicolo B (altro veicolo)</label>';
        html += '<select class="dcec-select dcec-select-b" id="dcec-select-b-' + id + '" name="caso_b" required aria-required="true">';
        html += '<option value="">Seleziona...</option>';
        for (let j = 0; j < CIRCUMSTANCES.length; j++) {
            html += '<option value="' + (j + 1) + '">' + escapeHtml(CIRCUMSTANCES[j]) + '</option>';
        }
        html += '</select></div>';

        html += '</div>';

        // Actions container
        html += '<div class="dcec-actions">';
        html += '<button class="dcec-btn dcec-btn-submit" type="submit">' + btnLabel + '</button>';
        if (showAi) {
            html += '<button class="dcec-btn dcec-btn-ai" type="button" data-ai-btn="true">' + aiLabel + '</button>';
        }
        html += '</div>';

        html += '</form>';

        // Powered by
        html += '<p class="dcec-powered"><span>Powered by <a href="' + BASE_URL + '" target="_blank" rel="noopener">dichielacolpa.it</a></span></p>';

        html += '</div>';

        el.innerHTML = html;

        // Apply custom colors via CSS variables
        const widgetEl = el.querySelector('.dcec-widget') as HTMLElement;
        if (widgetEl) {
            widgetEl.style.setProperty('--dcec-primary', primaryColor);
            widgetEl.style.setProperty('--dcec-bg', bgColor);
            widgetEl.style.setProperty('--dcec-ai', aiColor);
            widgetEl.style.setProperty('--dcec-primary-text', '#ffffff');
        }

        // Dispatch init event
        setTimeout(() => {
            dispatchCustomEvent(el, 'dcec:init', {
                config: config,
                element: el,
                widgetId: id
            });
        }, 0);

        // Form submit handler
        const form = el.querySelector('.dcec-form') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const casoA = (form.querySelector('[name="caso_a"]') as HTMLSelectElement).value;
                const casoB = (form.querySelector('[name="caso_b"]') as HTMLSelectElement).value;
                const ref = encodeURIComponent(window.location.href);

                const submitEvent = dispatchCustomEvent(el, 'dcec:submit', {
                    caso_a: casoA,
                    caso_b: casoB,
                    element: el
                });

                if (!submitEvent) return;
                if (!casoA || !casoB) return;

                let redirectUrl = `${BASE_URL}/third-party-liability-result?caso_a=${casoA}&caso_b=${casoB}&ref=${ref}`;

                if (target === '_blank') {
                    redirectUrl = `${redirectUrl}&refid=${id}`;
                }

                const redirectEvent = dispatchCustomEvent(el, 'dcec:redirect', {
                    url: redirectUrl,
                    element: el
                });

                if (!redirectEvent) return;

                if (target === '_blank') {
                    window.open(redirectUrl, '_blank');
                } else {
                    window.location.href = redirectUrl;
                }
            });

            // AI button handler
            const aiBtn = form.querySelector('[data-ai-btn="true"]') as HTMLButtonElement;
            if (aiBtn) {
                aiBtn.addEventListener('click', () => {
                    const aiUrl = BASE_URL + '/#tool-ai-assistant';
                    if (target === '_blank') {
                        window.open(aiUrl, '_blank');
                    } else {
                        window.location.href = aiUrl;
                    }
                });
            }
        }

        // Setup BroadcastChannel for target="_blank" to receive return notifications
        if (target === '_blank') {
            setupReturnListener(el, id);
        }
    }

    // ============================================================================
    // BroadcastChannel for Return Events
    // ============================================================================

    function setupReturnListener(el: Element, widgetId: string): void {
        const channelName = 'dcec-widget-channel-' + widgetId;
        let channel: BroadcastChannel | null = null;
        let focusHandler: (() => void) | null = null;
        let hasReturned = false;

        try {
            channel = new BroadcastChannel(channelName);
        } catch {
            channel = null;
        }

        // Listen for messages from result page
        if (channel) {
            channel.onmessage = (event: MessageEvent) => {
                if (event.data && event.data.type === 'dcec-return') {
                    handleReturn(el, event.data.method || 'close');
                    try { channel?.close(); } catch { /* ignore */ }
                }
            };
        }

        // Listen for window focus (user returns to parent tab)
        focusHandler = () => {
            if (!hasReturned) {
                hasReturned = true;
                handleReturn(el, 'focus');
                window.removeEventListener('focus', focusHandler!);
                try { channel?.close(); } catch { /* ignore */ }
            }
        };
        window.addEventListener('focus', focusHandler);

        // Also listen for visibilitychange as backup
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && !hasReturned) {
                hasReturned = true;
                handleReturn(el, 'focus');
                window.removeEventListener('focus', focusHandler!);
                try { channel?.close(); } catch { /* ignore */ }
            }
        });
    }

    function handleReturn(el: Element, method: string): void {
        dispatchCustomEvent(el, 'dcec:return', {
            method: method,
            element: el,
            timestamp: Date.now()
        });
    }

    // ============================================================================
    // Initialization
    // ============================================================================

    function getConfigFromScript(): WidgetConfig {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];

        return {
            container: currentScript.getAttribute('data-container') || '#dcec-widget',
            title: currentScript.getAttribute('data-title') || 'Calcola la responsabilità',
            primaryColor: currentScript.getAttribute('data-primary-color') || '#2563eb',
            bgColor: currentScript.getAttribute('data-bg-color') || '#ffffff',
            aiColor: currentScript.getAttribute('data-ai-color') || '#6b7280',
            btnLabel: currentScript.getAttribute('data-btn-label') || 'Calcola',
            aiLabel: currentScript.getAttribute('data-ai-label') || 'Assistente AI',
            showAi: parseBoolean(currentScript.getAttribute('data-show-ai')),
            target: (currentScript.getAttribute('data-target') || '_self') as '_self' | '_blank'
        };
    }

    function init(): void {
        injectStyles();

        const config = getConfigFromScript();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                createWidget(config);
            });
        } else {
            createWidget(config);
        }
    }

    // ============================================================================
    // Public API
    // ============================================================================

    const DCECWidget = {
        init: function (options?: Partial<WidgetConfig>): WidgetConfig {
            const config: WidgetConfig = {
                container: (options?.container) || '#dcec-widget',
                title: (options?.title) || 'Calcola la responsabilità',
                primaryColor: (options?.primaryColor) || '#2563eb',
                bgColor: (options?.bgColor) || '#ffffff',
                aiColor: (options?.aiColor) || '#6b7280',
                btnLabel: (options?.btnLabel) || 'Calcola',
                aiLabel: (options?.aiLabel) || 'Assistente AI',
                showAi: parseBoolean(options?.showAi),
                target: (options?.target) || '_self'
            };

            injectStyles();
            createWidget(config);
            return config;
        },
        events: {
            INIT: 'dcec:init',
            SUBMIT: 'dcec:submit',
            REDIRECT: 'dcec:redirect',
            RETURN: 'dcec:return'
        } as WidgetEvents
    };

    (window as unknown as { dcecWidget: typeof DCECWidget }).dcecWidget = DCECWidget;

    // Auto-init
    if (document.currentScript) {
        if (document.currentScript.hasAttribute('data-auto-init') ||
            !(window as unknown as { dcecWidget?: { init?: unknown } }).dcecWidget ||
            !(window as unknown as { dcecWidget?: { init?: unknown } }).dcecWidget?.init) {
            init();
        }
    } else {
        init();
    }
})();
