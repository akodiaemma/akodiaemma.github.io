'use strict';
(()=>{
const form=document.querySelector('#secure-enquiry');if(!form)return;
const audience=document.querySelector('#enquiry-audience');
const query=new URLSearchParams(location.search);if(['supplier','buyer','institution','investor'].includes(query.get('audience')))audience.value=query.get('audience');
const product=form.elements.namedItem('product');if(query.get('product'))product.value=query.get('product').slice(0,160);
form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const button=form.querySelector('[type=submit]'),status=document.querySelector('#enquiry-status');button.disabled=true;status.textContent='Sending your enquiry…';
 try{
  const response=await fetch('/enquiry-received.html',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});
  if(!response.ok)throw new Error('Submission not accepted');
  // Netlify must have detected this form. No fallback to local email drafts.
  location.assign('/enquiry-received.html');
 }catch(error){status.textContent='We could not confirm receipt. Please try again or email info@crossgatesconnect.com. Your entries remain here.';button.disabled=false;}
});
})();
