'use strict';
(() => {
 const tablist=document.querySelector('[data-tour-tabs]');
 if(tablist){
  const tabs=[...tablist.querySelectorAll('[role=tab]')];
  function select(tab,focus=false){
   tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;const panel=document.getElementById(item.getAttribute('aria-controls'));if(panel)panel.hidden=!active;});
   if(focus)tab.focus();
  }
  tabs.forEach((tab,index)=>{
   tab.addEventListener('click',()=>select(tab));
   tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next],true);}});
  });
  select(tabs[0]);
 }
 const page=location.pathname.split('/').pop().replace(/\.html$/,'');
 document.querySelectorAll('.cg-subnav a').forEach(a=>{if(new URL(a.href).pathname.split('/').pop().replace(/\.html$/,'')===page)a.setAttribute('aria-current','page');});
})();
