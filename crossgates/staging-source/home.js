'use strict';
(() => {
 const get=id=>document.getElementById(id);
 const write=(id,text)=>{get(id).textContent=text;};
 const mobile=document.querySelector('.mobile-nav');
 if(mobile)mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.open=false;}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile&&mobile.open){mobile.open=false;mobile.querySelector('summary').focus();}});

 const previews={
 business:{kicker:'KNOW THE BUSINESS',title:'Example coffee supplier',labels:['Country','Business details','Registration evidence'],values:['Uganda','Supplied','Review pending'],insight:'See who the supplier is and what still needs checking.'},
 product:{kicker:'UNDERSTAND THE PRODUCT',title:'Green coffee',labels:['Product description','Intended market','Product testing'],values:['Supplied','United Kingdom','Not represented'],insight:'Understand the offering before discussing specifications and samples.'},
 evidence:{kicker:'SEE THE OPEN QUESTIONS',title:'Evidence & next actions',labels:['Registration document','Origin records','Batch history'],values:['Supplied','Missing','Needs evidence'],insight:'Missing information stays visible. Supplied does not mean authenticated.'}
 };
 document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
 const key=button.dataset.preview,p=previews[key];
 document.querySelectorAll('[data-preview]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preview===key)));
 write('preview-kicker',p.kicker);write('preview-title',p.title);write('preview-insight',p.insight);
 p.labels.forEach((label,i)=>{write('preview-label-'+(i+1),label);write('preview-value-'+(i+1),p.values[i]);});
 }));
 const events=[
  {src:'img/excel-food-expo.webp',width:1086,height:1448,alt:'Doris Beth Atigo at a coffee exhibition stand during a food expo at ExCeL London.',title:'Food expo · ExCeL London',caption:"Gathering market information at ExCeL London and speaking with buyers about what they need from suppliers, as part of the research shaping Crossgates.",credit:''},
  {src:'img/uk-africa-summit.webp',width:2048,height:1366,alt:'Doris Beth Atigo in a red suit among delegates at the UK–Africa Investment Summit.',title:'UK–Africa Investment Summit',caption:"Representing Crossgates and promoting Uganda’s trade potential to an international audience, with conversations about bringing Ugandan businesses to global markets.",credit:'Photograph: © thepromotaAfrica'},
  {src:'img/international-coffee-day.webp',width:1448,height:1086,alt:'Attendees in conversation beside a coffee machine at an International Coffee Day gathering.',title:'International Coffee Day',caption:"Joining Uganda’s coffee community in London for International Coffee Day and conversations around coffee and international trade.",credit:''},
  {src:'img/spitalfields-market.webp',width:1152,height:1536,alt:'Doris Beth Atigo in conversation beside stacked fresh-produce boxes at Spitalfields Market.',title:'Spitalfields Market',caption:"Listening to wholesale buyers and traders about their sourcing needs, the information they expect from suppliers and the practical requirements of the UK market.",credit:''},
{"src": "img/parliament-visit.webp", "width": 1141, "height": 1600, "alt": "Doris Beth Atigo in a green suit with fellow attendees outside Parliament in London.", "title": "House of Lords luncheon", caption:"Attending a luncheon at the House of Lords by invitation, with the opportunity to meet Ugandan ministers and UK government officials and exchange perspectives on UK–Uganda relations.", "credit": ""},
{"src": "img/coffee-exhibition.webp", "width": 1086, "height": 1448, "alt": "Doris Beth Atigo seated with two exhibitors at an Africa Coffee Park exhibition stand.", "title": "Coffee exhibition conversations", caption:"Discussing onboarding, verification and preparation for international markets with coffee buyers and exhibitors at ExCeL London.", "credit": ""},
{"src": "img/spitalfields-produce.webp", "width": 1152, "height": 1536, "alt": "Doris Beth Atigo looking at fresh produce during her Spitalfields Market visit.", "title": "Fresh produce · Spitalfields Market", caption:"Exploring the fresh produce on offer at Spitalfields and gathering first-hand insight into the products and requirements of the UK wholesale market.", "credit": ""}
 ];
 let activeEvent=0, displayedEvent=0, photoRequest=0;
 const eventButtons=[...document.querySelectorAll('[data-event]')];
 function selectEvent(index,reveal=false){
  activeEvent=(index+events.length)%events.length;
  const selected=activeEvent, item=events[selected], request=++photoRequest;
  const figure=get('event-view');
  figure.setAttribute('aria-busy','true');
  write('event-count','Loading photograph…');
  // Load separately: keep the visible photograph and its caption paired.
  const photo=get('event-image').cloneNode(false);
  photo.removeAttribute('srcset');photo.removeAttribute('sizes');
  photo.loading='eager';photo.alt=item.alt;photo.width=item.width;photo.height=item.height;
  photo.onload=()=>{
   if(request!==photoRequest)return;
   photo.onload=null;photo.onerror=null;
   get('event-image').replaceWith(photo);
   displayedEvent=selected;
   eventButtons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.event)===selected)));
   write('event-title',item.title);write('event-caption',item.caption);write('event-credit',item.credit);get('event-credit').hidden=!item.credit;
   write('event-count',`${selected+1} / ${events.length}`);
   figure.setAttribute('aria-busy','false');
   if(reveal){const rect=figure.getBoundingClientRect();if(rect.bottom<100||rect.top>innerHeight-100)figure.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  };
  photo.onerror=()=>{
   if(request!==photoRequest)return;
   activeEvent=displayedEvent;
   figure.setAttribute('aria-busy','false');
   write('event-count',`${displayedEvent+1} / ${events.length} · Photo could not load. Please try again.`);
  };
  photo.src=item.src;
 }
 eventButtons.forEach(button=>button.addEventListener('click',()=>selectEvent(Number(button.dataset.event),true)));
 if(get('event-previous'))get('event-previous').addEventListener('click',()=>selectEvent(activeEvent-1));
 if(get('event-next'))get('event-next').addEventListener('click',()=>selectEvent(activeEvent+1));
 const roles={"supplier": {"title": "Make your business easier to understand.", "copy": "Bring your business details, product information and available records together. Identify gaps and prepare a clearer profile for buyer conversations.", "action": "Make an enquiry"}, "buyer": {"title": "See the evidence behind the introduction.", "copy": "Explore supplier information, review notes and open questions. Decide which specifications, samples and further checks you need.", "action": "Make an enquiry"}, "institution": {"title": "Turn readiness gaps into focused support.", "copy": "Start with a consistent view of participating businesses. Discuss common evidence gaps, support priorities and progress reporting with our team.", "action": "Make an enquiry"}};
 function selectRole(role){
  if(!roles[role]||!get('audience-action'))return;document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===role)));
  write('audience-title',roles[role].title);write('audience-copy',roles[role].copy);write('audience-action',roles[role].action);get('audience-action').dataset.audience=role;get('audience-action').href='index.html?audience='+role+'#enquiry';
  const work={supplier:['suppliers','See our work with suppliers'],buyer:['buyers','Explore our buyer conversations'],institution:['institutions','Explore our institutional engagement']}[role];get('audience-work').href='our-work.html#'+work[0];write('audience-work',work[1]);
 }
 document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>selectRole(button.dataset.role)));
 const roleHashes={'#suppliers':'supplier','#buyers':'buyer','#institutions':'institution'};
 const readRole=()=>{const role=roleHashes[location.hash]||new URLSearchParams(location.search).get('audience');if(role)selectRole(role);};
 window.addEventListener('hashchange',readRole);readRole();
})();

/* Align the desktop enquiry group with the Contact supplier row in the Passport artwork. */
(() => {
  const group = document.querySelector('.home-intro > .hero-start-links');
  const description = document.querySelector('.home-intro > .hero-promise + p');
  const artwork = document.querySelector('.home-hero-spread .passport-artwork img');
  if (!group || !description || !artwork) return;
  let scheduled = false;
  function align() {
    scheduled = false;
    if (!window.matchMedia('(min-width: 761px)').matches) {
      group.style.removeProperty('--passport-enquiry-gap');
      return;
    }
    const image = artwork.getBoundingClientRect();
    if (!image.height) return;
    // The Contact supplier button starts at 90.5% of this approved artwork's height.
    const gap = Math.max(28, image.top + image.height * 0.905 - description.getBoundingClientRect().bottom);
    const previous = parseFloat(group.style.getPropertyValue('--passport-enquiry-gap'));
    if (!Number.isFinite(previous) || Math.abs(previous - gap) > 0.5) {
      group.style.setProperty('--passport-enquiry-gap', gap.toFixed(2) + 'px');
    }
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(align); }
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(artwork);
    observer.observe(description);
  }
  artwork.addEventListener('load', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();
