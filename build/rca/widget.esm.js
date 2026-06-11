var s={INIT:"dcec:init",SUBMIT:"dcec:submit",REDIRECT:"dcec:redirect",RETURN:"dcec:return"},y=["1 - Veicolo in sosta o in fermata","2 - Ripartiva dopo una sosta/apriva una portiera","3 - Stava parcheggiando","4 - Usciva da un parcheggio, da un luogo privato, da una strada vicinale","5 - Entrava in un parcheggio, in un luogo privato, in una strada vicinale","6 - Si immetteva su una piazza a senso rotatorio","7 - Circolava su una piazza a senso rotatorio","8 - Tampona procedendo nello stesso senso o nella stessa fila","9 - Procedeva nello stesso senso, ma in fila diversa","10 - Cambiava fila","11 - Sorpassava","12 - Girava a destra","13 - Girava a sinistra","14 - Retrocedeva","15 - Invadeva la sede stradale riservata alla circolazione in senso inverso","16 - Proveniva da destra","17 - Non aveva osservato il segnale di precedenza o di semaforo rosso"],g="https://www.dichielacolpa.it",E=`.dcec-widget {
    --dcec-primary: #2563eb;
    --dcec-primary-text: #ffffff;
    --dcec-bg: #ffffff;
    --dcec-text: #111827;
    --dcec-border: #d1d5db;
    --dcec-muted: #6b7280;
    --dcec-ai: #6b7280;
    --dcec-select-bg: #ffffff;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    background: var(--dcec-bg);
    color: var(--dcec-text);
    border: 1px solid var(--dcec-border);
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    container-type: inline-size;
    container-name: widget;
}

.dcec-widget *,
.dcec-widget *::before,
.dcec-widget *::after {
    box-sizing: inherit;
}

.dcec-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    text-align: center;
}

.dcec-form {
    display: contents;
}

.dcec-fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

@container widget (min-width: 480px) {
    .dcec-fields {
        grid-template-columns: 1fr 1fr;
    }
}

.dcec-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.dcec-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--dcec-text);
}

.dcec-select {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid var(--dcec-border);
    border-radius: 6px;
    background: var(--dcec-select-bg, #fff);
    color: var(--dcec-text);
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.dcec-select:hover {
    border-color: var(--dcec-primary);
}

.dcec-select:focus {
    outline: 2px solid var(--dcec-primary);
    outline-offset: 1px;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.dcec-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.dcec-btn {
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
}

.dcec-btn:hover {
    opacity: 0.9;
}

.dcec-btn:active {
    transform: scale(0.98);
}

.dcec-btn:focus {
    outline: 2px solid var(--dcec-primary);
    outline-offset: 2px;
}

.dcec-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.dcec-btn-submit {
    flex-grow: 1;
    background: var(--dcec-primary);
    color: var(--dcec-primary-text);
}

.dcec-btn-ai {
    background: var(--dcec-ai);
    color: #fff;
}

.dcec-powered {
    font-size: 12px;
    color: var(--dcec-muted);
    text-align: center;
    margin: 0;
    padding: 8px;
}

.dcec-powered span {
    display: inline-block;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 4px;
}

.dcec-powered a {
    color: var(--dcec-primary);
    text-decoration: none;
    font-weight: 500;
}

.dcec-powered a:hover {
    text-decoration: underline;
}
`;function b(e){if(e==null)return"";let t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function v(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function h(e){return typeof e=="boolean"?e:typeof e=="string"?e==="true"||e==="1"||e==="yes":!1}function f(e,t,a){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:a}))}function S(e){var t,a,i,n,c,o,r;return{container:(t=e==null?void 0:e.container)!=null?t:"#dcec-widget",title:(a=e==null?void 0:e.title)!=null?a:"Chi ha ragione?",primaryColor:(i=e==null?void 0:e.primaryColor)!=null?i:"#2563eb",bgColor:(n=e==null?void 0:e.bgColor)!=null?n:"#ffffff",aiColor:(c=e==null?void 0:e.aiColor)!=null?c:"#6b7280",btnLabel:(o=e==null?void 0:e.btnLabel)!=null?o:"Scoprilo",aiLabel:(r=e==null?void 0:e.aiLabel)!=null?r:"Chiedi a cAI",showAi:h(e==null?void 0:e.showAi),target:(e==null?void 0:e.target)==="_blank"?"_blank":"_self"}}function L(){if(document.getElementById("dcec-widget-rca-styles"))return;let e=document.createElement("style");e.id="dcec-widget-rca-styles",e.textContent=E,document.head.appendChild(e)}function _(e){return e.map((t,a)=>`<option value="${a+1}">${b(t)}</option>`).join("")}function $(e){let t=typeof e.container=="string"?document.querySelector(e.container):e.container;if(!t){console.error("DCEC Widget: container non trovato:",e.container);return}let a=Math.random().toString(36).slice(2,11),i=_(y),n=e.showAi?`<button class="dcec-btn dcec-btn-ai" type="button" data-ai-btn="true">${b(e.aiLabel)}</button>`:"";t.innerHTML=`
        <div class="dcec-widget" id="dcec-${a}">
            <h3 class="dcec-title">${b(e.title)}</h3>
            <form class="dcec-form">
                <div class="dcec-fields">
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-a-${a}">Veicolo A (il tuo)</label>
                        <select class="dcec-select" id="dcec-a-${a}" name="caso_a" required aria-required="true">
                            <option value="">Seleziona...</option>${i}
                        </select>
                    </div>
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-b-${a}">Veicolo B (altro veicolo)</label>
                        <select class="dcec-select" id="dcec-b-${a}" name="caso_b" required aria-required="true">
                            <option value="">Seleziona...</option>${i}
                        </select>
                    </div>
                </div>
                <div class="dcec-actions">
                    <button class="dcec-btn dcec-btn-submit" type="submit">${b(e.btnLabel)}</button>
                    ${n}
                </div>
            </form>
            <p class="dcec-powered">
                <span>Powered by <a href="${g}" target="_blank" rel="noopener">www.dichielacolpa.it</a></span>
            </p>
        </div>
    `;let c=t.querySelector(".dcec-widget");c.style.setProperty("--dcec-primary",v(e.primaryColor)),c.style.setProperty("--dcec-bg",v(e.bgColor)),c.style.setProperty("--dcec-ai",v(e.aiColor)),setTimeout(()=>f(t,s.INIT,{config:e,element:t,widgetId:a}),0);let o=t.querySelector(".dcec-form");o.addEventListener("submit",l=>{l.preventDefault();let d=o.querySelector('[name="caso_a"]').value,u=o.querySelector('[name="caso_b"]').value;if(!d||!u||d===u||!f(t,s.SUBMIT,{caso_a:d,caso_b:u,element:t}))return;let C=encodeURIComponent(window.location.href),w=e.target==="_blank"?`&refid=${a}`:"",m=`${g}/third-party-liability-result?caso_a=${d}&caso_b=${u}&ref=${C}${w}`;f(t,s.REDIRECT,{url:m,element:t})&&(e.target==="_blank"?window.open(m,"_blank"):window.location.href=m)});let r=t.querySelector('[data-ai-btn="true"]');r&&r.addEventListener("click",()=>{let l=`${g}/#tool-ai-assistant`;e.target==="_blank"?window.open(l,"_blank"):window.location.href=l}),e.target==="_blank"&&T(t,a)}function p(e){let t=S(e);return L(),$(t),t}function T(e,t){let a=!1,i=r=>{a||(a=!0,f(e,"dcec:return",{method:r,element:e,timestamp:Date.now()}),n==null||n.close(),window.removeEventListener("focus",c),document.removeEventListener("visibilitychange",o))},n=null;try{n=new BroadcastChannel(`dcec-widget-channel-${t}`),n.onmessage=r=>{var l;((l=r.data)==null?void 0:l.type)==="dcec-return"&&i(r.data.method||"close")}}catch(r){}let c=()=>i("focus"),o=()=>{document.visibilityState==="visible"&&i("focus")};window.addEventListener("focus",c),document.addEventListener("visibilitychange",o)}var I={init:p,events:s};export{I as RCA};
//# sourceMappingURL=widget.esm.js.map
