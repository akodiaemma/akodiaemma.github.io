'use strict';
(() => {
  const names={en:'English',fr:'Français',de:'Deutsch',sw:'Kiswahili',lg:'Luganda'};
  const known=['index','how-it-works','guide','passports','our-work','stiv'];
  const parts=location.pathname.split('/').filter(Boolean);
  const locale=Object.hasOwn(names,parts[0])?parts[0]:'en';
  const leaf=(parts[parts.length-1]||'index').replace(/\.html$/,'');
  const page=known.includes(leaf)?leaf:'index';
  const params=new URLSearchParams(location.search);
  const read=()=>{try{return localStorage.getItem('crossgates-language')}catch{return null}};
  const save=l=>{try{localStorage.setItem('crossgates-language',l)}catch{}};
  function url(l){
    // STIV has no translated equivalent yet: retain the destination and label the fallback.
    const u=new URL(page==='stiv'?'/stiv.html':(l==='en'?'/':'/'+l+'/')+page+'.html',location.origin);
    u.search=location.search;u.searchParams.delete('lang');u.searchParams.delete('ui');
    if(page==='stiv'){u.searchParams.set('lang','stiv');u.searchParams.set('ui',l);}
    else if(l==='en')u.searchParams.set('lang','en');
    u.hash=location.hash;return u.href;
  }
  document.querySelectorAll('[data-language]').forEach(a=>{
    a.href=url(a.dataset.language);a.addEventListener('click',()=>save(a.dataset.language));
  });
  if(page==='stiv'){
    const selected=params.get('ui')||read()||'en';
    if(names[selected])save(selected);
    const notes={en:'This STIV introduction is in English. Your selected language is kept for other pages.',fr:'Cette présentation de STIV est en anglais. Votre langue est conservée pour les autres pages.',de:'Diese STIV-Einführung ist auf Englisch. Ihre Sprachwahl bleibt für die anderen Seiten erhalten.',sw:'Utangulizi huu wa STIV uko kwa Kiingereza. Lugha uliyochagua inahifadhiwa kwa kurasa nyingine.',lg:'Okwanjula STIV kuno kuli mu Lungereza. Olulimi lw’olonze lusigala ku mpapula endala.'};
    const note=document.getElementById('stiv-language-note');
    if(note){note.textContent=notes[selected]||notes.en;note.lang=names[selected]?selected:'en';}
    return;
  }
  if(params.get('lang')==='en'){save('en');return;}
  const stored=read();
  if(locale==='en'&&stored&&stored!=='en'&&names[stored]){location.replace(url(stored));return;}
  if(locale!=='en'){save(locale);return;}
  if(stored)return;
  const dialog=document.createElement('dialog');dialog.className='language-dialog';dialog.setAttribute('aria-labelledby','language-welcome');
  dialog.innerHTML='<p>Crossgates Connect</p><h2 id="language-welcome">Which language would you like to use?</h2><p><span lang="fr">Choisissez votre langue.</span> <span lang="de">Wählen Sie Ihre Sprache.</span><br><span lang="sw">Chagua lugha.</span> <span lang="lg">Londa olulimi.</span></p><nav aria-label="Choose language"></nav><p>You can change your language at any time.</p><button type="button">Continue in English</button>';
  for(const [key,name] of Object.entries(names)){
    const a=document.createElement('a');a.href=url(key);a.lang=key;a.hreflang=key;a.textContent=name;a.addEventListener('click',()=>save(key));dialog.querySelector('nav').append(a);
  }
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{save('en');dialog.remove();});
  document.body.append(dialog);if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
})();
