(function () {
  'use strict';

  const LANGUAGES = ['it', 'en', 'es', 'fr', 'de', 'pt'];
  const SOURCE_LANGUAGE = 'it';
  const scriptTag = document.currentScript;
  const sourcePath = scriptTag && scriptTag.dataset ? scriptTag.dataset.source : null;

  if (!sourcePath) {
    document.body.innerHTML = '<p style="font-family:system-ui;padding:24px">Inside Milano: source non disponibile.</p>';
    return;
  }

  function normalizeLanguage(value) {
    const language = String(value || '').toLowerCase().split('-')[0];
    return LANGUAGES.includes(language) ? language : SOURCE_LANGUAGE;
  }

  function getPreferredLanguage() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested && LANGUAGES.includes(normalizeLanguage(requested))) return normalizeLanguage(requested);
    const saved = localStorage.getItem('insideMilanoLanguage');
    if (saved && LANGUAGES.includes(normalizeLanguage(saved))) return normalizeLanguage(saved);
    return normalizeLanguage(navigator.language || navigator.userLanguage || SOURCE_LANGUAGE);
  }

  function setTranslateCookie(language) {
    const cookieName = 'googtrans';
    if (language === SOURCE_LANGUAGE) {
      document.cookie = cookieName + '=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';
      return;
    }
    document.cookie = cookieName + '=/it/' + language + ';path=/;max-age=31536000;SameSite=Lax';
  }

  const language = getPreferredLanguage();
  localStorage.setItem('insideMilanoLanguage', language);
  setTranslateCookie(language);

  const languageCss = `
    <style id="inside-milano-multilang-style">
      .im-language-bar{display:flex;justify-content:flex-end;max-width:56rem;margin:0 auto;padding:12px 20px 0;position:relative;z-index:120}
      .im-language-shell{display:inline-flex;align-items:center;gap:8px;padding:8px 9px;border:1px solid rgba(255,255,255,.15);border-radius:16px;background:rgba(0,31,36,.82);box-shadow:0 10px 24px rgba(0,0,0,.16);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
      .im-language-label{color:rgba(255,255,255,.62);font:800 10px/1 system-ui,-apple-system,sans-serif;text-transform:uppercase;letter-spacing:.14em;padding:0 3px}
      .im-language-options{display:flex;gap:3px;align-items:center}
      .im-language-btn{min-width:34px;height:31px;border:1px solid transparent;border-radius:10px;padding:0 7px;color:rgba(255,255,255,.76);background:transparent;font:800 11px/1 system-ui,-apple-system,sans-serif;letter-spacing:.04em;cursor:pointer}
      .im-language-btn:hover{background:rgba(255,255,255,.09);color:#fff}
      .im-language-btn.active{background:#BFEBFF;color:#001f24;border-color:rgba(255,255,255,.32)}
      #google_translate_element{position:fixed!important;left:-9999px!important;top:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}
      .goog-te-banner-frame.skiptranslate,iframe.goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt{display:none!important}
      .goog-te-gadget{font-size:0!important;color:transparent!important}
      body{top:0!important}
      @media(max-width:560px){.im-language-bar{justify-content:center;padding:10px 14px 0}.im-language-shell{width:100%;justify-content:center}.im-language-label{display:none}.im-language-options{width:100%;justify-content:space-between}.im-language-btn{flex:1;min-width:0;padding:0 4px}}
    </style>`;

  const languageBar = `
    <div class="im-language-bar notranslate" translate="no" aria-label="Selezione lingua">
      <div class="im-language-shell" role="group" aria-label="Language selection">
        <span class="im-language-label">Lingua</span>
        <div class="im-language-options">
          ${LANGUAGES.map(code => `<button type="button" class="im-language-btn${code === language ? ' active' : ''}" data-im-language="${code}" aria-pressed="${code === language ? 'true' : 'false'}">${code.toUpperCase()}</button>`).join('')}
        </div>
      </div>
    </div>
    <div id="google_translate_element" aria-hidden="true"></div>`;

  const languageRuntime = `
    <script>
      (function(){
        var languages=['it','en','es','fr','de','pt'];
        var activeLanguage=${JSON.stringify(language)};
        function markBrandAsNoTranslate(){document.querySelectorAll('.brand-card').forEach(function(element){element.classList.add('notranslate');element.setAttribute('translate','no');});}
        function setCookie(language){if(language==='it'){document.cookie='googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';}else{document.cookie='googtrans=/it/'+language+';path=/;max-age=31536000;SameSite=Lax';}}
        window.setInsideMilanoLanguage=function(rawLanguage){var language=String(rawLanguage||'it').toLowerCase().split('-')[0];if(languages.indexOf(language)===-1)language='it';localStorage.setItem('insideMilanoLanguage',language);setCookie(language);var url=new URL(window.location.href);url.searchParams.set('lang',language);window.location.href=url.toString();};
        document.querySelectorAll('[data-im-language]').forEach(function(button){button.addEventListener('click',function(){window.setInsideMilanoLanguage(button.getAttribute('data-im-language'));});});
        markBrandAsNoTranslate();
        document.documentElement.lang=activeLanguage;
        window.googleTranslateElementInit=function(){if(!window.google||!google.translate)return;new google.translate.TranslateElement({pageLanguage:'it',includedLanguages:languages.join(','),autoDisplay:false,multilanguagePage:true},'google_translate_element');if(activeLanguage!=='it'){window.setTimeout(function(){var combo=document.querySelector('select.goog-te-combo');if(combo){combo.value=activeLanguage;combo.dispatchEvent(new Event('change',{bubbles:true}));}},350);}};
      })();
    <\/script>
    <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async><\/script>`;

  function enhance(source) {
    let html = source;
    html = html.replace(/<\/head>/i, languageCss + '\n</head>');
    const pageBgDouble = '<div class="page-bg">';
    const pageBgSingle = "<div class='page-bg'>";
    if (html.includes(pageBgDouble)) html = html.replace(pageBgDouble, pageBgDouble + '\n' + languageBar);
    else if (html.includes(pageBgSingle)) html = html.replace(pageBgSingle, pageBgSingle + '\n' + languageBar);
    else html = html.replace(/<body([^>]*)>/i, function(match){ return match + '\n' + languageBar; });
    html = html.replace(/<\/body>/i, '<script src="./transport-arrival.js"><\/script>\n<script src="./safety-emergency.js"><\/script>\n' + languageRuntime + '\n</body>');
    return html;
  }

  fetch(sourcePath, { cache: 'no-store' })
    .then(function(response){if(!response.ok) throw new Error('HTTP ' + response.status);return response.text();})
    .then(function(source){const enhanced = enhance(source);document.open();document.write(enhanced);document.close();})
    .catch(function(error){console.error('Inside Milano multilingual loader:', error);document.body.innerHTML = '<div style="font-family:system-ui;background:#001f24;color:white;min-height:100vh;padding:32px"><h1 style="margin:0 0 12px">Inside Milano</h1><p>Impossibile caricare temporaneamente la guida. Riprova tra poco.</p></div>';});
})();