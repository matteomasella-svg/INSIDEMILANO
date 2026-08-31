(() => {
  'use strict';

  const verifiedOn = '01/09/2026';
  const esc = (value = '') => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const tel = n => `tel:${String(n).replace(/[^+0-9]/g,'')}`;
  const map = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const dir = (origin,destination,mode='transit') => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(mode)}`;

  const properties = [
    {
      id:'studio', name:'The NoLo Studio', address:'Via Giorgio Chavez 1, Milano', area:'NoLo · Pasteur',
      nearby:'Zona Pasteur / Loreto. Usa il percorso live per verificare la fermata migliore al momento dell’arrivo.',
      routes:{
        linate:'M4 da Linate → San Babila; cambio con M1 direzione Sesto 1° Maggio FS → area Pasteur; ultimo tratto a piedi.',
        malpensa:'Malpensa Express → Milano Centrale; M2 → Loreto; poi M1 o breve tratto a piedi in base al percorso live.',
        bergamo:'Shuttle → Milano Centrale; M2 → Loreto; poi M1 o breve tratto a piedi.',
        centrale:'M2 da Centrale → Loreto; proseguire verso l’alloggio seguendo il percorso live.'
      }
    },
    {
      id:'heritage', name:'The NoLo Heritage Studio', address:'Via Termopili 29, Milano', area:'NoLo · Pasteur',
      nearby:'Pasteur M1 è a circa 250 m; Rovereto M1 a circa 290 m.',
      routes:{
        linate:'M4 da Linate → San Babila; cambio M1 direzione Sesto 1° Maggio FS → Pasteur; poi circa 250 m a piedi.',
        malpensa:'Malpensa Express → Milano Centrale; M2 → Loreto; cambio M1 direzione Sesto → Pasteur.',
        bergamo:'Shuttle → Milano Centrale; M2 → Loreto; cambio M1 → Pasteur.',
        centrale:'M2 da Centrale → Loreto; cambio M1 direzione Sesto → Pasteur.'
      }
    },
    {
      id:'nest', name:'The NoLo Nest', address:'Via Bassano del Grappa 32, Milano', area:'NoLo · Via Padova / Pasteur',
      nearby:'A pochi passi dall’area Pasteur/Loreto; usa il percorso live per scegliere tra metro e tratto a piedi.',
      routes:{
        linate:'M4 da Linate → San Babila; cambio M1 direzione Sesto 1° Maggio FS → area Pasteur/Loreto; ultimo tratto a piedi.',
        malpensa:'Malpensa Express → Milano Centrale; M2 → Loreto; poi proseguire a piedi o con M1 secondo il percorso live.',
        bergamo:'Shuttle → Milano Centrale; M2 → Loreto; poi proseguire verso l’alloggio.',
        centrale:'M2 da Centrale → Loreto; proseguire verso l’alloggio seguendo il percorso live.'
      }
    },
    {
      id:'suite', name:'The NoLo Suite', address:'Via Bassano del Grappa 32, Milano', area:'NoLo · Via Padova / Pasteur',
      nearby:'Nest e Suite condividono lo stesso indirizzo e quindi la stessa logica di arrivo.',
      routes:{
        linate:'M4 da Linate → San Babila; cambio M1 direzione Sesto 1° Maggio FS → area Pasteur/Loreto; ultimo tratto a piedi.',
        malpensa:'Malpensa Express → Milano Centrale; M2 → Loreto; poi proseguire a piedi o con M1 secondo il percorso live.',
        bergamo:'Shuttle → Milano Centrale; M2 → Loreto; poi proseguire verso l’alloggio.',
        centrale:'M2 da Centrale → Loreto; proseguire verso l’alloggio seguendo il percorso live.'
      }
    },
    {
      id:'masotto', name:'Masotto Terrace View', address:'Via Privata Umberto Masotto 4, Milano', area:'Città Studi / Argonne',
      nearby:'Argonne M4 è a circa 180 m. Nell’area risultano anche le linee 38, 54, 93 e NM4.',
      routes:{
        linate:'M4 direzione San Cristoforo → Argonne; poi circa 180 m a piedi. Nessun cambio metro.',
        malpensa:'Malpensa Express → Milano Cadorna; M1 → San Babila; cambio M4 direzione Linate → Argonne.',
        bergamo:'Shuttle → Milano Centrale; M2 → Sant’Ambrogio; cambio M4 direzione Linate → Argonne.',
        centrale:'M2 da Centrale → Sant’Ambrogio; cambio M4 direzione Linate → Argonne.'
      }
    }
  ];

  const hubs = [
    {id:'linate', code:'LIN', name:'Aeroporto Milano Linate', title:'Linate · M4', text:'Linate è collegato direttamente alla linea M4. Per Masotto scendi ad Argonne senza cambi. Per NoLo, il cambio più semplice è normalmente a San Babila con M1. Il biglietto urbano Mi1–Mi3 costa €2,20 ed è valido 90 minuti.', actions:[['ATM','https://www.atm.it/'],['MAP',map('Aeroporto Milano Linate')]]},
    {id:'malpensa', code:'MXP', name:'Aeroporto Milano Malpensa', title:'Malpensa · Malpensa Express', text:'Malpensa Express collega Terminal 1 e 2 con Milano. Il biglietto adulto per una stazione di Milano costa €15. Da T1 il viaggio dura circa 51 minuti per Centrale e 37 minuti per Cadorna. Sulle due direttrici c’è un treno ogni 30 minuti.', actions:[['MALPENSA EXPRESS','https://www.malpensaexpress.it/'],['MAP',map('Aeroporto Milano Malpensa')]]},
    {id:'bergamo', code:'BGY', name:'Milan Bergamo Airport', title:'Bergamo / Orio al Serio · shuttle', text:'Lo shuttle diretto per Milano Centrale parte dall’area Arrivi. Il prezzo online parte da €8, il bagaglio è incluso e il tempo medio dichiarato è circa 50 minuti. Da Centrale prosegui con metro o taxi.', actions:[['SHUTTLE','https://www.flibco.com/it/shuttle/bus-orio-al-serio-milano-centrale'],['MAP',map('Milan Bergamo Airport')]]},
    {id:'centrale', code:'FS', name:'Milano Centrale', title:'Milano Centrale', text:'Da Centrale gli alloggi NoLo sono facilmente raggiungibili passando da Loreto. Per Masotto 4 usa M2 fino a Sant’Ambrogio e poi M4 verso Linate fino ad Argonne.', actions:[['ATM','https://www.atm.it/'],['MAP',map('Milano Centrale')]]}
  ];

  const taxis = [
    {name:'TaxiBlu', phone:'02 4040', alt:'02 6767', note:'Call center H24. Prenotazione telefonica e app; servizio aeroporti.', web:'https://taxiblu.it/'},
    {name:'Radio Taxi 02.6969', phone:'02 6969', note:'Call center operativo 24/7; richiesta taxi anche tramite i canali ufficiali del servizio.', web:'https://www.026969.it/'},
    {name:'Milano Radio Taxi', phone:'02 8585', note:'Numero indicato dal Comune di Milano tra i Radiotaxi cittadini.', web:'https://www.028585.it/'}
  ];

  const button = (label,href,kind='') => `<a class="ta-btn ${kind}" href="${esc(href)}" ${href.startsWith('tel:')?'':'target="_blank" rel="noopener"'}>${esc(label)}</a>`;
  const hubCard = h => `<article class="ta-card"><h4>${esc(h.code)} · ${esc(h.title)}</h4><p class="ta-meta">${esc(h.name)}</p><p>${esc(h.text)}</p><div class="ta-actions">${h.actions.map(([l,u])=>button(l,u)).join('')}</div></article>`;
  const propertyCard = p => {
    const routes = Object.entries(p.routes).map(([key,text]) => `<div class="ta-route"><span>${esc(key.toUpperCase())}</span><p>${esc(text)}</p></div>`).join('');
    const live = hubs.map(h => button(h.code,dir(h.name,p.address))).join('');
    return `<article class="ta-card ta-property" data-property="${esc(p.id)}"><div class="ta-property-head"><div><h4>${esc(p.name)}</h4><p class="ta-meta">${esc(p.address)}</p></div>${button('MAP',map(p.address),'pin')}</div><p><strong>MEZZI VICINI</strong><br>${esc(p.nearby)}</p><div class="ta-routes">${routes}</div><div class="ta-actions"><span class="ta-label">PERCORSO LIVE</span>${live}</div></article>`;
  };
  const taxiCard = t => `<article class="ta-card"><h4>${esc(t.name)}</h4><p class="ta-meta">${esc(t.phone)}${t.alt?' · '+esc(t.alt):''}</p><p>${esc(t.note)}</p><div class="ta-actions">${button('CHIAMA',tel(t.phone),'call')}${t.alt?button(t.alt,tel(t.alt),'call'):''}${button('SITO',t.web)}</div></article>`;

  function injectStyles(){
    if(document.getElementById('transport-arrival-styles')) return;
    const s=document.createElement('style'); s.id='transport-arrival-styles'; s.textContent=`.ta-shell{display:flex;flex-direction:column;gap:22px}.ta-panel{background:rgba(0,0,0,.24);border:2px solid rgba(255,255,255,.1);border-radius:28px;padding:22px;box-shadow:0 18px 35px rgba(0,0,0,.18)}.ta-kicker{color:#BFEBFF;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.2em}.ta-title{font-size:32px;font-weight:900;line-height:1;letter-spacing:-.04em;margin:8px 0 0}.ta-copy{color:rgba(255,255,255,.72);font-size:14px;line-height:1.6;font-weight:600;margin-top:12px}.ta-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-top:16px}.ta-card{background:rgba(0,31,36,.48);border:1px solid rgba(255,255,255,.12);border-radius:22px;padding:18px}.ta-card h4{font-size:18px;font-weight:900;line-height:1.15}.ta-card p{color:rgba(255,255,255,.73);font-size:13px;line-height:1.55;font-weight:600;margin-top:8px}.ta-meta{color:#BFEBFF!important;text-transform:uppercase;letter-spacing:.05em;font-size:10px!important;font-weight:900!important}.ta-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;align-items:center}.ta-btn{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:9px 12px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);color:#fff;text-decoration:none;font-size:11px;font-weight:900;letter-spacing:.04em}.ta-btn.call{background:#54C4A6;color:#001f24;border-color:#54C4A6}.ta-btn.pin{background:#BFEBFF;color:#001f24;border-color:#BFEBFF}.ta-property-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.ta-routes{margin-top:14px;display:flex;flex-direction:column;gap:8px}.ta-route{display:grid;grid-template-columns:70px 1fr;gap:10px;background:rgba(255,255,255,.045);border-radius:14px;padding:11px}.ta-route span{font-size:10px;font-weight:900;color:#54C4A6;letter-spacing:.06em}.ta-route p{margin:0;font-size:12px}.ta-label{font-size:10px;font-weight:900;color:rgba(255,255,255,.5);letter-spacing:.07em}.ta-ticket{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.ta-ticket div{background:rgba(255,255,255,.05);padding:13px;border-radius:16px}.ta-ticket strong{display:block;color:#54C4A6;font-size:18px}.ta-ticket span{display:block;margin-top:3px;font-size:10px;color:rgba(255,255,255,.55);font-weight:800}.ta-note{font-size:11px;color:rgba(255,255,255,.48);line-height:1.55;margin-top:12px}.ta-select{width:100%;background:#00373d;border:1px solid rgba(255,255,255,.13);color:#fff;border-radius:16px;padding:13px;font-size:14px;font-weight:800;outline:none;margin-top:14px}.ta-tip{border-left:5px solid #DB4F61}@media(min-width:640px){.ta-grid.two{grid-template-columns:1fr 1fr}}`;
    document.head.appendChild(s);
  }

  function injectNavigation(){
    const menu=document.getElementById('mobile-menu');
    if(menu && !menu.querySelector('option[value="arrival"]')){
      const option=document.createElement('option'); option.value='arrival'; option.textContent='Come arrivare & Trasporti';
      const safety=menu.querySelector('option[value="safety"]'); safety?menu.insertBefore(option,safety):menu.appendChild(option);
    }
    const grid=document.querySelector('#home .guide-grid');
    if(grid && !grid.querySelector('[data-im-arrival]')){
      const b=document.createElement('button'); b.type='button'; b.dataset.imArrival='1'; b.className='guide-btn bg-[#BFEBFF] text-[#001f24]'; b.setAttribute('onclick',"quickTab('arrival')");
      b.innerHTML='<span class="guide-icon dark"><svg viewBox="0 0 24 24"><path d="M3 17h18M5 17l2-8h10l2 8M8 17v2M16 17v2M8 12h8M12 3v6"/></svg></span><span><strong>Arrivare</strong><small>Aeroporti, metro e taxi</small></span>';
      grid.appendChild(b);
    }
  }

  function render(){
    injectStyles(); injectNavigation();
    if(document.getElementById('arrival')) return;
    const section=document.createElement('section'); section.id='arrival'; section.className='tab-content space-y-6';
    section.innerHTML=`<div class="ta-shell"><div class="ta-panel"><p class="ta-kicker">Getting here · Milano</p><h2 class="ta-title">Come arrivare al tuo alloggio</h2><p class="ta-copy">Scegli l’alloggio e usa i pulsanti “percorso live” per il giorno del viaggio. Informazioni ricontrollate il ${verifiedOn}; lavori, scioperi o deviazioni possono cambiare il percorso migliore.</p><select id="ta-property-select" class="ta-select"><option value="all">Mostra tutti gli alloggi</option>${properties.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('')}</select></div><div class="ta-panel"><p class="ta-kicker">Aeroporti & stazioni</p><h3 class="ta-title">Prima tratta</h3><div class="ta-grid two">${hubs.map(hubCard).join('')}</div></div><div class="ta-panel"><p class="ta-kicker">I nostri alloggi</p><h3 class="ta-title">Percorso consigliato</h3><div class="ta-grid">${properties.map(propertyCard).join('')}</div></div><div class="ta-panel"><p class="ta-kicker">ATM Milano</p><h3 class="ta-title">Metro, tram e bus</h3><div class="ta-ticket"><div><strong>€2,20</strong><span>Mi1–Mi3 · 90 minuti</span></div><div><strong>€7,60</strong><span>giornaliero · 24 ore</span></div></div><p class="ta-copy">Puoi pagare i mezzi ATM con carta contactless, telefono o smartwatch. Il sistema calcola automaticamente la tariffa più conveniente su base giornaliera; in metropolitana usa lo stesso dispositivo anche all’uscita.</p><div class="ta-actions">${button('ATM · SITO UFFICIALE','https://www.atm.it/')}</div></div><div class="ta-panel"><p class="ta-kicker">Taxi Milano</p><h3 class="ta-title">Radiotaxi verificati</h3><p class="ta-copy">Il Comune di Milano indica i numeri 02 4040, 02 6969 e 02 8585 tra i Radiotaxi cittadini. I taxi autorizzati sono bianchi: usa posteggi ufficiali, Radiotaxi o app collegate ai servizi autorizzati.</p><div class="ta-grid">${taxis.map(taxiCard).join('')}</div><p class="ta-note">Per un taxi accessibile a persone con disabilità motoria, il Comune di Milano indica gli stessi tre numeri. Specifica subito carrozzina, numero di passeggeri e bagagli.</p></div><div class="ta-panel ta-tip"><p class="ta-kicker">Inside tip</p><h3 class="ta-title">Con le valigie</h3><p class="ta-copy">Linate → Masotto: la M4 diretta ad Argonne è normalmente la scelta più semplice. Malpensa → NoLo: Malpensa Express fino a Centrale rende la prima tratta molto lineare. Bergamo → tutti gli alloggi: lo shuttle per Centrale evita cambi nella prima parte del viaggio. Con più valigie, bambini o arrivo notturno confronta sempre il percorso pubblico con un taxi.</p></div></div>`;
    const safety=document.getElementById('safety'); safety?safety.parentNode.insertBefore(section,safety):document.querySelector('main')?.appendChild(section);
    const select=section.querySelector('#ta-property-select'); const cards=[...section.querySelectorAll('.ta-property')];
    select?.addEventListener('change',()=>cards.forEach(c=>c.style.display=(select.value==='all'||c.dataset.property===select.value)?'':'none'));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();