"use strict";var dcecWidget=(()=>{(function(){"use strict";var k;let b=["1 - Veicolo in sosta o in fermata","2 - Ripartiva dopo una sosta/apriva una portiera","3 - Stava parcheggiando","4 - Usciva da un parcheggio, da un luogo privato, da una strada vicinale","5 - Entrava in un parcheggio, in un luogo privato, in una strada vicinale","6 - Si immetteva su una piazza a senso rotatorio","7 - Circolava su una piazza a senso rotatorio","8 - Tampona procedendo nello stesso senso o nella stessa fila","9 - Procedeva nello stesso senso, ma in fila diversa","10 - Cambiava fila","11 - Sorpassava","12 - Girava a destra","13 - Girava a sinistra","14 - Retrocedeva","15 - Invadeva la sede stradale riservata alla circolazione in senso inverso","16 - Proveniva da destra","17 - Non aveva osservato il segnale di precedenza o di semaforo rosso"],C="https://dichielacolpa.altervista.org",W=`/*!
 * Di Chi \xC8 La Colpa? - Widget Styles (RCA)
 * Embedded responsibility calculator for third-party sites
 */

.dcec-widget {
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
`;function s(e){if(e==null)return"";let t=document.createElement("div");return t.textContent=String(e),t.innerHTML}function w(e){return e==null?"":String(e).replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function y(e){return typeof e=="boolean"?e:typeof e=="string"?e==="true"||e==="1"||e==="yes":!1}function g(e,t,i){let a=new CustomEvent(t,{bubbles:!0,cancelable:!0,detail:i});return e.dispatchEvent(a)}let E=!1;function A(){if(E)return;if(document.getElementById("dcec-widget-styles")){E=!0;return}let e=document.createElement("style");e.id="dcec-widget-styles",e.textContent=W,document.head.appendChild(e),E=!0}function h(e){let t=e.container;if(!t){console.error("DCEC Widget: container not specified");return}let i=typeof t=="string"?document.querySelector(t):t;if(!i){console.error("DCEC Widget: container element not found:",e.container);return}let a=Math.random().toString(36).substr(2,9),l=s(e.title||"Calcola la responsabilit\xE0"),o=w(e.primaryColor||"#2563eb"),c=w(e.bgColor||"#ffffff"),T=w(e.aiColor||"#6b7280"),B=s(e.btnLabel||"Calcola"),q=s(e.aiLabel||"Assistente AI"),D=y(e.showAi),m=e.target==="_blank"?"_blank":"_self",n='<div class="dcec-widget" id="dcec-'+a+'">';n+='<h3 class="dcec-title">'+l+"</h3>",n+='<form class="dcec-form">',n+='<div class="dcec-fields">',n+='<div class="dcec-field dcec-field-a">',n+='<label class="dcec-label dcec-label-a" for="dcec-select-a-'+a+'">Veicolo A (il tuo)</label>',n+='<select class="dcec-select dcec-select-a" id="dcec-select-a-'+a+'" name="caso_a" required aria-required="true">',n+='<option value="">Seleziona...</option>';for(let r=0;r<b.length;r++)n+='<option value="'+(r+1)+'">'+s(b[r])+"</option>";n+="</select></div>",n+='<div class="dcec-field dcec-field-b">',n+='<label class="dcec-label dcec-label-b" for="dcec-select-b-'+a+'">Veicolo B (altro veicolo)</label>',n+='<select class="dcec-select dcec-select-b" id="dcec-select-b-'+a+'" name="caso_b" required aria-required="true">',n+='<option value="">Seleziona...</option>';for(let r=0;r<b.length;r++)n+='<option value="'+(r+1)+'">'+s(b[r])+"</option>";n+="</select></div>",n+="</div>",n+='<div class="dcec-actions">',n+='<button class="dcec-btn dcec-btn-submit" type="submit">'+B+"</button>",D&&(n+='<button class="dcec-btn dcec-btn-ai" type="button" data-ai-btn="true">'+q+"</button>"),n+="</div>",n+="</form>",n+='<p class="dcec-powered"><span>Powered by <a href="'+C+'" target="_blank" rel="noopener">dichielacolpa.it</a></span></p>',n+="</div>",i.innerHTML=n;let d=i.querySelector(".dcec-widget");d&&(d.style.setProperty("--dcec-primary",o),d.style.setProperty("--dcec-bg",c),d.style.setProperty("--dcec-ai",T),d.style.setProperty("--dcec-primary-text","#ffffff")),setTimeout(()=>{g(i,"dcec:init",{config:e,element:i,widgetId:a})},0);let u=i.querySelector(".dcec-form");if(u){u.addEventListener("submit",v=>{v.preventDefault();let S=u.querySelector('[name="caso_a"]').value,L=u.querySelector('[name="caso_b"]').value,H=encodeURIComponent(window.location.href);if(!g(i,"dcec:submit",{caso_a:S,caso_b:L,element:i})||!S||!L)return;let f=`${C}/third-party-liability-result?caso_a=${S}&caso_b=${L}&ref=${H}`;m==="_blank"&&(f=`${f}&refid=${a}`),g(i,"dcec:redirect",{url:f,element:i})&&(m==="_blank"?window.open(f,"_blank"):window.location.href=f)});let r=u.querySelector('[data-ai-btn="true"]');r&&r.addEventListener("click",()=>{let v=C+"/#tool-ai-assistant";m==="_blank"?window.open(v,"_blank"):window.location.href=v})}m==="_blank"&&I(i,a)}function I(e,t){let i="dcec-widget-channel-"+t,a=null,l=null,o=!1;try{a=new BroadcastChannel(i)}catch(c){a=null}a&&(a.onmessage=c=>{if(c.data&&c.data.type==="dcec-return"){p(e,c.data.method||"close");try{a==null||a.close()}catch(T){}}}),l=()=>{if(!o){o=!0,p(e,"focus"),window.removeEventListener("focus",l);try{a==null||a.close()}catch(c){}}},window.addEventListener("focus",l),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&!o){o=!0,p(e,"focus"),window.removeEventListener("focus",l);try{a==null||a.close()}catch(c){}}})}function p(e,t){g(e,"dcec:return",{method:t,element:e,timestamp:Date.now()})}function R(){let e=document.getElementsByTagName("script"),t=e[e.length-1];return{container:t.getAttribute("data-container")||"#dcec-widget",title:t.getAttribute("data-title")||"Calcola la responsabilit\xE0",primaryColor:t.getAttribute("data-primary-color")||"#2563eb",bgColor:t.getAttribute("data-bg-color")||"#ffffff",aiColor:t.getAttribute("data-ai-color")||"#6b7280",btnLabel:t.getAttribute("data-btn-label")||"Calcola",aiLabel:t.getAttribute("data-ai-label")||"Assistente AI",showAi:y(t.getAttribute("data-show-ai")),target:t.getAttribute("data-target")||"_self"}}function _(){A();let e=R();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{h(e)}):h(e)}let M={init:function(e){let t={container:(e==null?void 0:e.container)||"#dcec-widget",title:(e==null?void 0:e.title)||"Calcola la responsabilit\xE0",primaryColor:(e==null?void 0:e.primaryColor)||"#2563eb",bgColor:(e==null?void 0:e.bgColor)||"#ffffff",aiColor:(e==null?void 0:e.aiColor)||"#6b7280",btnLabel:(e==null?void 0:e.btnLabel)||"Calcola",aiLabel:(e==null?void 0:e.aiLabel)||"Assistente AI",showAi:y(e==null?void 0:e.showAi),target:(e==null?void 0:e.target)||"_self"};return A(),h(t),t},events:{INIT:"dcec:init",SUBMIT:"dcec:submit",REDIRECT:"dcec:redirect",RETURN:"dcec:return"}};window.dcecWidget=M,document.currentScript?(document.currentScript.getAttribute("data-auto-init")==="true"||!window.dcecWidget||!((k=window.dcecWidget)!=null&&k.init))&&_():_()})();})();
//# sourceMappingURL=widget.js.map
