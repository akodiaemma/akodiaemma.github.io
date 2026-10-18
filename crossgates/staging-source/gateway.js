'use strict';
(() => {
 // Preserve older links to sections now available on the Explore page.
 if(location.hash && location.hash !== '#main' && !document.getElementById(decodeURIComponent(location.hash.slice(1)))){
  location.replace('explore.html'+location.search+location.hash);return;
 }
 const hero=document.querySelector('.home-hero'),grid=document.querySelector('.home-hero-grid'),header=document.querySelector('.site-header');
 if(!hero||!grid||!header)return;
 const languageBar=document.querySelector('.language-bar'),language=languageBar?.querySelector('.language-switch'),navigation=header.querySelector('.nav');
 if(language&&navigation){navigation.appendChild(language);languageBar.remove();}
 const fit=()=>{
  document.documentElement.style.setProperty('--landing-header-height',header.getBoundingClientRect().height+'px');
  if(!matchMedia('(min-width: 761px)').matches){grid.style.removeProperty('--gateway-scale');return;}
  const style=getComputedStyle(hero),available=innerHeight-header.getBoundingClientRect().height-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
  grid.style.setProperty('--gateway-scale',Math.min(1,available/grid.offsetHeight));
 };
 new ResizeObserver(fit).observe(grid);new ResizeObserver(fit).observe(header);addEventListener('resize',fit);document.fonts.ready.then(fit);fit();
})();

