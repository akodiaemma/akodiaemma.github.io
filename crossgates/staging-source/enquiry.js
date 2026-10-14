'use strict';
(() => {
const get=id=>document.getElementById(id);
const enquiryForm=document.getElementById('enquiry-form');
if(!enquiryForm)return;
const audienceSelect=document.getElementById('audience');
const draftResult=document.getElementById('draft-result');
const draftText=document.getElementById('draft-text');
const emailLink=document.getElementById('open-email');
const copyStatus=document.getElementById('copy-status');
function invalidateEnquiry(){draftResult.hidden=true;draftText.value='';emailLink.setAttribute('href','mailto:info@crossgatesconnect.com');copyStatus.textContent='';}
function setAudience(value){
 if(!['supplier','buyer','institution'].includes(value))return;
 audienceSelect.value=value;
 document.querySelectorAll('[data-fields]').forEach(fields=>{const active=fields.dataset.fields===value;fields.hidden=!active;fields.disabled=!active;});
 invalidateEnquiry();
}
audienceSelect.addEventListener('change',()=>setAudience(audienceSelect.value));
enquiryForm.addEventListener('input',invalidateEnquiry);
enquiryForm.addEventListener('change',invalidateEnquiry);
document.querySelectorAll('a[data-audience]').forEach(link=>link.addEventListener('click',event=>{
 const target=new URL(link.href,location.href);if(target.origin!==location.origin||target.pathname!==location.pathname)return;
 event.preventDefault();location.hash='enquiry';
 setAudience(link.dataset.audience);
 if(get('contact-form'))get('contact-form').open=true;
}));
function composeEnquiry(fields){
 const roles={supplier:'Supplier readiness enquiry',buyer:'Buyer / supplier review enquiry',institution:'Programme / institution enquiry'};
 const role=fields.audience;
 if(!Object.hasOwn(roles,role))throw new Error('Choose a valid enquiry type.');
 const clean=value=>String(value||'').trim();
 const lines=['Hello Crossgates team,','',roles[role],'Name: '+clean(fields.name),'Business / organisation: '+clean(fields.business)];
 const fieldsByRole={supplier:[['Country of operation','supplier_country'],['Product supplied','supplier_product'],['Intended export market','supplier_market']],buyer:[['Destination market','buyer_market'],['Product needed','buyer_product'],['Assessment interest','buyer_need']],institution:[['Programme objective','institution_goal'],['Countries','institution_countries'],['Number of businesses','institution_size']]};
 fieldsByRole[role].forEach(([label,key])=>{if(clean(fields[key]))lines.push(label+': '+clean(fields[key]));});
 if(clean(fields.notes))lines.push('','Additional information:',clean(fields.notes));
 lines.push('','Please let me know the available service, next steps, scope and pricing.','','Thank you,',clean(fields.name));
 const subject=roles[role];const body=lines.join('\n');return {subject,body,mailto:'mailto:info@crossgatesconnect.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)};
}
enquiryForm.addEventListener('submit',event=>{
 event.preventDefault();if(!enquiryForm.reportValidity())return;
 const draft=composeEnquiry(Object.fromEntries(new FormData(enquiryForm).entries()));
 draftText.value='Subject: '+draft.subject+'\n\n'+draft.body;
 emailLink.href=draft.mailto;draftResult.hidden=false;draftText.focus();
});
document.getElementById('copy-enquiry').addEventListener('click',async()=>{
 try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(draftText.value);copyStatus.textContent='Copied. Paste this into your email and send it when you are ready.';}
 catch(error){draftText.focus();draftText.select();copyStatus.textContent='The text is selected. Use your device’s Copy command, then paste it into your email.';}
});
const query=new URLSearchParams(location.search);
const requestedAudience=query.get('audience');if(['supplier','buyer','institution'].includes(requestedAudience) || location.hash==='#enquiry')if(get('contact-form'))get('contact-form').open=true;setAudience(['supplier','buyer','institution'].includes(requestedAudience)?requestedAudience:'supplier');const product={coffee:'Coffee',vanilla:'Vanilla','fresh-produce':'Fresh produce'}[query.get('product')];
if(product){const input=get(audienceSelect.value==='buyer'?'buyer-product':'supplier-product');if(input)input.value=product;}
enquiryForm.querySelectorAll('[required]').forEach(input=>{
 const validate=()=>{input.setCustomValidity(input.value.trim()?'':'Please enter a value.');};
 input.addEventListener('input',validate);input.addEventListener('change',validate);
});
enquiryForm.hidden=false;document.documentElement.classList.add('js-ready');


})();
