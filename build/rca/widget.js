"use strict";(()=>{var s={INIT:"dcec:init",SUBMIT:"dcec:submit",REDIRECT:"dcec:redirect",RETURN:"dcec:return"},h=["1 - Veicolo in sosta o in fermata","2 - Ripartiva dopo una sosta/apriva una portiera","3 - Stava parcheggiando","4 - Usciva da un parcheggio, da un luogo privato, da una strada vicinale","5 - Entrava in un parcheggio, in un luogo privato, in una strada vicinale","6 - Si immetteva su una piazza a senso rotatorio","7 - Circolava su una piazza a senso rotatorio","8 - Tampona procedendo nello stesso senso o nella stessa fila","9 - Procedeva nello stesso senso, ma in fila diversa","10 - Cambiava fila","11 - Sorpassava","12 - Girava a destra","13 - Girava a sinistra","14 - Retrocedeva","15 - Invadeva la sede stradale riservata alla circolazione in senso inverso","16 - Proveniva da destra","17 - Non aveva osservato il segnale di precedenza o di semaforo rosso"],C="https://dichielacolpa.altervista.org",S=`.dcec-widget {
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
`;function g(e){if(e==null)return"";let t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function y(e){return e==null?"":String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function w(e){return typeof e=="boolean"?e:typeof e=="string"?e==="true"||e==="1"||e==="yes":!1}function f(e,t,a){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:a}))}function L(e){var t,a,c,i,o,l,n;return{container:(t=e==null?void 0:e.container)!=null?t:"#dcec-widget",title:(a=e==null?void 0:e.title)!=null?a:"Chi ha ragione?",primaryColor:(c=e==null?void 0:e.primaryColor)!=null?c:"#2563eb",bgColor:(i=e==null?void 0:e.bgColor)!=null?i:"#ffffff",aiColor:(o=e==null?void 0:e.aiColor)!=null?o:"#6b7280",btnLabel:(l=e==null?void 0:e.btnLabel)!=null?l:"Scoprilo",aiLabel:(n=e==null?void 0:e.aiLabel)!=null?n:"Chiedi a cAI",showAi:w(e==null?void 0:e.showAi),target:(e==null?void 0:e.target)==="_blank"?"_blank":"_self"}}function _(){if(document.getElementById("dcec-widget-rca-styles"))return;let e=document.createElement("style");e.id="dcec-widget-rca-styles",e.textContent=S,document.head.appendChild(e)}function A(e){return e.map((t,a)=>`<option value="${a+1}">${g(t)}</option>`).join("")}function $(e){let t=typeof e.container=="string"?document.querySelector(e.container):e.container;if(!t){console.error("DCEC Widget: container non trovato:",e.container);return}let a=Math.random().toString(36).slice(2,11),c=A(h),i=e.showAi?`<button class="dcec-btn dcec-btn-ai" type="button" data-ai-btn="true">${g(e.aiLabel)}</button>`:"";t.innerHTML=`
        <div class="dcec-widget" id="dcec-${a}">
            <h3 class="dcec-title">${g(e.title)}</h3>
            <form class="dcec-form">
                <div class="dcec-fields">
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-a-${a}">Veicolo A (il tuo)</label>
                        <select class="dcec-select" id="dcec-a-${a}" name="caso_a" required aria-required="true">
                            <option value="">Seleziona...</option>${c}
                        </select>
                    </div>
                    <div class="dcec-field">
                        <label class="dcec-label" for="dcec-b-${a}">Veicolo B (altro veicolo)</label>
                        <select class="dcec-select" id="dcec-b-${a}" name="caso_b" required aria-required="true">
                            <option value="">Seleziona...</option>${c}
                        </select>
                    </div>
                </div>
                <div class="dcec-actions">
                    <button class="dcec-btn dcec-btn-submit" type="submit">${g(e.btnLabel)}</button>
                    ${i}
                </div>
            </form>
            <p class="dcec-powered">
                <span>Powered by <a href="${C}" target="_blank" rel="noopener">dichielacolpa.it</a></span>
            </p>
        </div>
    `;let o=t.querySelector(".dcec-widget");o.style.setProperty("--dcec-primary",y(e.primaryColor)),o.style.setProperty("--dcec-bg",y(e.bgColor)),o.style.setProperty("--dcec-ai",y(e.aiColor)),setTimeout(()=>f(t,s.INIT,{config:e,element:t,widgetId:a}),0);let l=t.querySelector(".dcec-form");l.addEventListener("submit",d=>{d.preventDefault();let u=l.querySelector('[name="caso_a"]').value,b=l.querySelector('[name="caso_b"]').value;if(!u||!b||u===b||!f(t,s.SUBMIT,{caso_a:u,caso_b:b,element:t}))return;let p=encodeURIComponent(window.location.href),E=e.target==="_blank"?`&refid=${a}`:"",v=`${C}/third-party-liability-result?caso_a=${u}&caso_b=${b}&ref=${p}${E}`;f(t,s.REDIRECT,{url:v,element:t})&&(e.target==="_blank"?window.open(v,"_blank"):window.location.href=v)});let n=t.querySelector('[data-ai-btn="true"]');n&&n.addEventListener("click",()=>{let d=`${C}/#tool-ai-assistant`;e.target==="_blank"?window.open(d,"_blank"):window.location.href=d}),e.target==="_blank"&&T(t,a)}function m(e){let t=L(e);return _(),$(t),t}function T(e,t){let a=!1,c=n=>{a||(a=!0,f(e,"dcec:return",{method:n,element:e,timestamp:Date.now()}),i==null||i.close(),window.removeEventListener("focus",o),document.removeEventListener("visibilitychange",l))},i=null;try{i=new BroadcastChannel(`dcec-widget-channel-${t}`),i.onmessage=n=>{var d;((d=n.data)==null?void 0:d.type)==="dcec-return"&&c(n.data.method||"close")}}catch(n){}let o=()=>c("focus"),l=()=>{document.visibilityState==="visible"&&c("focus")};window.addEventListener("focus",o),document.addEventListener("visibilitychange",l)}var r=document.currentScript,k={init:m,events:s};window.dcecWidgets=window.dcecWidgets||{};window.dcecWidgets.RCA=k;if((r==null?void 0:r.getAttribute("data-auto-init"))==="true"){let e={container:r.getAttribute("data-container")||"#dcec-widget",title:r.getAttribute("data-title")||void 0,primaryColor:r.getAttribute("data-primary-color")||void 0,bgColor:r.getAttribute("data-bg-color")||void 0,aiColor:r.getAttribute("data-ai-color")||void 0,btnLabel:r.getAttribute("data-btn-label")||void 0,aiLabel:r.getAttribute("data-ai-label")||void 0,showAi:w(r.getAttribute("data-show-ai")),target:r.getAttribute("data-target")||"_self"};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>m(e)):m(e)}})();
//# sourceMappingURL=widget.js.map
