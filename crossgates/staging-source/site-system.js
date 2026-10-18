'use strict';
(() => {
 const menu=document.querySelector('.cg-nav-menu'),solutions=document.querySelector('.cg-solutions'),language=document.querySelector('.language-switch');
 const close=(details,focus=false)=>{if(!details?.open)return;details.open=false;if(focus)details.querySelector('summary')?.focus();};
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(language?.open){close(language,true);return;}if(solutions?.open){close(solutions,true);return;}close(menu,true);});
 document.addEventListener('click',event=>{if(language&&!language.contains(event.target))close(language);if(solutions&&!solutions.contains(event.target))close(solutions);if(menu&&!menu.contains(event.target))close(menu);});
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(menu)));
 // Intent events remain local. No tracking service, cookies or personal data transmission is added.
 document.querySelectorAll('a[href]').forEach(a=>a.addEventListener('click',()=>{const h=a.getAttribute('href')||'';const type=h.includes('app.crossgatesconnect.com')?'platform_entry':h.includes('passports')?'passport_demo':h.includes('contact')?'enquiry_entry':null;if(type)document.dispatchEvent(new CustomEvent('crossgates:conversion-intent',{detail:{type}}));}));
})();
