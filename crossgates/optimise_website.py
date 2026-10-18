"""Conservative public-site normalisation. Standard library only; runs at build time."""
from pathlib import Path
import re, json, html
BASE='https://crossgatesconnect.com'
LANGS={'en':'English','fr':'Français','de':'Deutsch','sw':'Kiswahili','lg':'Luganda'}
LABELS={
'en':['Solutions','For suppliers','For buyers','For institutions','Trade Passport','How it works','Evidence & impact','About','Contact','Meet STIV','Login','Menu'],
'fr':['Solutions','Fournisseurs','Acheteurs','Institutions','Passeport commercial','Fonctionnement','Preuves & impact','À propos','Contact','STIV','Connexion','Menu'],
'de':['Lösungen','Lieferanten','Einkäufer','Institutionen','Trade Passport','So funktioniert es','Nachweise & Wirkung','Über uns','Kontakt','STIV','Anmelden','Menü'],
'sw':['Suluhisho','Wasambazaji','Wanunuzi','Taasisi','Pasipoti ya Biashara','Jinsi inavyofanya kazi','Ushahidi na matokeo','Kutuhusu','Wasiliana','STIV','Ingia','Menyu'],
'lg':['Ebigonjoola','Abatunzi','Abaguzi','Ebitongole','Trade Passport','Engeri gye kikola','Obujulizi n’ebivuddemu','Ebifa ku ffe','Tuukirira','STIV','Yingira','Menyu']}
META={
'index.html':('Crossgates Connect | Supplier evidence for international trade','Prepare for export and assess suppliers with clarity. Explore STIV guidance, scoped evidence review and the Verified Trade Passport.'),
'explore.html':('Explore Crossgates | Supplier readiness, evidence and people','Explore Crossgates services, reported progress, people, field photographs and the evidence behind business preparation.'),
'suppliers.html':('Export readiness for African suppliers | Crossgates Connect','Organise business and product records, identify evidence gaps and agree a scoped review. Start with one product and one intended market.'),
'buyers.html':('Supplier evidence and due diligence support | Crossgates Connect','Understand supplier identity, product documentation, review scope and unresolved questions. Discuss a supplier assessment with Crossgates.'),
'partners.html':('Export readiness programmes for institutions | Crossgates Connect','Design a scoped enterprise programme with baseline records, preparation support, evidence review and dated progress reporting.'),
'passports.html':('Verified Trade Passport demonstration | Crossgates Connect','Inspect a clearly labelled fictional supplier record, evidence statuses, review limitations and next actions. Understand what a Trade Passport can show.'),
'product-tour.html':('How a Verified Trade Passport works | Crossgates Connect','Explore how business identity, products, records and review scope can be brought together in one shareable supplier profile.'),
'impact.html':('Evidence and reported progress | Crossgates Connect','Examine company-reported progress, the evidence needed to support results, documented field activity and the limits of current claims.'),
'our-work.html':('People, markets and field activity | Crossgates Connect','See documented Crossgates field activity in Uganda, the UK and Denmark, alongside an initial East African market focus.'),
'stiv.html':('STIV trade-readiness mentor | Crossgates Connect','Understand how STIV supports trade preparation, what AI guidance cannot establish and why human-controlled evidence review remains separate.'),
'about.html':('About Crossgates Connect | Purpose, people and evidence','Meet Crossgates founders and contributors and understand our focus on structured supplier evidence and export readiness.'),
'contact.html':('Contact Crossgates | Supplier, buyer and programme enquiries','Discuss your product, country, intended market or supplier-review question. Choose email or WhatsApp, or prepare a structured enquiry.'),
'privacy.html':('Website privacy information — owner review draft | Crossgates','Draft factual explanation of website enquiries, language preferences and external services. Owner review is required before publication.')}

def canonical(rel):
 return BASE+('/' if str(rel)=='index.html' else '/'+str(rel).removesuffix('.html'))
def replace_meta(s,tag,key,value):
 if tag=='title':return re.sub(r'<title>.*?</title>','<title>'+html.escape(value)+'</title>',s,flags=re.S)
 name,attr=key
 pattern=r'<'+tag+r'\b(?=[^>]*\b'+name+r'=["\']'+re.escape(attr)+r'["\'])[^>]*>'
 new='<'+tag+' '+name+'="'+attr+'" '+('content' if tag=='meta' else 'href')+'="'+html.escape(value,quote=True)+'">'
 return re.sub(pattern,new,s,flags=re.I) if re.search(pattern,s,re.I) else s.replace('</head>',new+'\n</head>')

def header(s,lang,prefix):
 brand=re.search(r'<a\b[^>]*class=["\']brand["\'][^>]*>.*?</a>',s,re.S)
 if not brand:return None
 brand=brand.group();brand=re.sub(r'href=["\'][^"\']*["\']','href="'+prefix+'index.html"',brand,count=1)
 L=LABELS[lang]; english=lambda f:prefix+f
 def a(label,href):return '<a href="'+href+'">'+html.escape(label)+'</a>'
 solutions='<details class="cg-solutions"><summary>'+L[0]+'</summary><div class="cg-solution-links">'+''.join(a(L[i]+(' (EN)' if lang!='en' else ''),english(f)) for i,f in [(1,'suppliers.html'),(2,'buyers.html'),(3,'partners.html')])+'</div></details>'
 items=solutions+''.join(a(L[i]+(' (EN)' if lang!='en' and i in (6,7,8,9) else ''),english(f) if i in (6,7,8,9) else f) for i,f in [(4,'passports.html'),(5,'how-it-works.html'),(6,'impact.html'),(7,'about.html'),(8,'contact.html'),(9,'stiv.html')])+a(L[10],'https://app.crossgatesconnect.com/login')
 language='<details class="language-switch"><summary>◎ '+LANGS[lang]+'</summary><nav aria-label="Choose language">'+''.join('<a lang="'+code+'" hreflang="'+code+'" data-language="'+code+'" href="'+prefix+('index.html?lang=en' if code=='en' else code+'/index.html')+'"'+(' aria-current="true"' if code==lang else '')+'>'+name+'</a>' for code,name in LANGS.items())+'</nav></details>'
 return '<header class="site-header cg-header"><nav class="cg-global-nav wrap" aria-label="Main navigation">'+brand+'<details class="cg-nav-menu"><summary>'+L[11]+'</summary><div class="cg-nav-items">'+items+'</div></details>'+language+'</nav></header>'

def footer(prefix):
 return '<footer class="cg-global-footer"><div class="wrap"><div><strong>Crossgates Connect Limited</strong><p>Structured supplier evidence. Clearer trade preparation.</p><p class="small">UK company no. 16731416 · © 2026</p></div><nav aria-label="Further information">'+''.join('<a href="'+prefix+u+'">'+t+'</a>' for t,u in [('For suppliers','suppliers.html'),('For buyers','buyers.html'),('For institutions','partners.html'),('Investors','investors.html'),('Evidence guide','guide.html'),('Our work','our-work.html'),('Website privacy — review draft','privacy.html'),('Contact','contact.html')])+'</nav><p class="small">STIV supports preparation. Human-controlled review decisions and official certification have separate scopes.</p></div></footer>'

def optimise(out):
 for f in sorted(out.rglob('*.html')):
  rel=f.relative_to(out)
  if len(rel.parts)>2:continue
  lang=rel.parts[0] if len(rel.parts)==2 and rel.parts[0] in LANGS else 'en';prefix='../' if lang!='en' else ''
  s=f.read_text();
  if re.search(r'http-equiv=["\']refresh',s,re.I):continue
  h=header(s,lang,prefix)
  if not h:continue
  s=re.sub(r'<header\b.*?</header>',h,s,count=1,flags=re.S)
  s=re.sub(r'<div class="language-bar">.*?</details></div></div>','',s,count=1,flags=re.S)
  gateway='gateway-home' in s
  s=re.sub(r'<footer\b.*?</footer>','' if gateway else footer(prefix),s,count=1,flags=re.S)
  if not gateway and '<footer' not in s:s=s.replace('</body>',footer(prefix)+'</body>')
  s=s.replace('</head>','<link rel="stylesheet" href="'+prefix+'site-system.css">\n</head>')
  s=s.replace('</body>','<script src="'+prefix+'site-system.js" defer></script>\n</body>')
  # Old deep links retain their audience query and go directly to the appropriate inner page.
  s=re.sub(r'href="((?:\.\./)?)index\.html(\?[^"#]*)?#enquiry"',lambda m:'href="'+m[1]+'contact.html'+(m[2] or '')+'#enquiry"',s)
  s=re.sub(r'href="((?:\.\./)?)index\.html#(?:team|about)"',lambda m:'href="'+m[1]+'about.html#team"',s)
  if lang!='en':s=re.sub(r'href="contact\.html', 'href="../contact.html', s)
  if f.name=='privacy.html':s=replace_meta(s,'meta',('name','robots'),'noindex,follow')
  url=canonical(rel);s=replace_meta(s,'link',('rel','canonical'),url);s=replace_meta(s,'meta',('property','og:url'),url)
  if lang=='en' and f.name in META:
   title,desc=META[f.name];s=replace_meta(s,'title',None,title);s=replace_meta(s,'meta',('name','description'),desc);s=replace_meta(s,'meta',('property','og:title'),title);s=replace_meta(s,'meta',('property','og:description'),desc)
  # Reciprocal hreflang only where the corresponding page actually exists.
  s=re.sub(r'<link\b(?=[^>]*\bhreflang=)[^>]*>','',s,flags=re.I)
  alternatives=[]
  for code in LANGS:
   p=Path(f.name) if code=='en' else Path(code)/f.name
   if (out/p).exists() and not re.search(r'http-equiv=["\']refresh',(out/p).read_text(),re.I):alternatives.append('<link rel="alternate" hreflang="'+code+'" href="'+canonical(p)+'">')
  s=s.replace('</head>','\n'.join(alternatives)+'\n</head>')
  # Give imported exploration pages a genuine primary heading without changing the approved words.
  if '<h1' not in s:s=re.sub(r'<h2(\b[^>]*)>(.*?)</h2>',r'<h1\1>\2</h1>',s,count=1,flags=re.S)
  s=s.replace('Example African Coffee Supplier','Elgon Harvest Coffee (fictional)')
  if 'type="application/ld+json"' not in s:
   data={'@context':'https://schema.org','@type':'WebPage','name':html.unescape(re.search(r'<title>(.*?)</title>',s,re.S)[1]),'url':url,'inLanguage':lang,'isPartOf':{'@type':'WebSite','name':'Crossgates Connect','url':BASE+'/'}}
   s=s.replace('</head>','<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False)+'</script>\n</head>')
  # Deferred image loading and decoding: do not touch the hero or eagerly loaded product demonstration.
  s=re.sub(r'<img\b[^>]*>',lambda m:m[0].replace('<img','<img decoding="async"',1) if 'decoding=' not in m[0] else m[0],s)
  s=s.replace('img/stiv-standing.png','img/stiv-standing.webp').replace('img/verified-trade-passport.png','img/verified-trade-passport.webp')
  f.write_text(s)
 # Canonical public URLs; no dated lastmod claims without source timestamps.
 urls=[]
 for f in sorted(out.rglob('*.html')):
  rel=f.relative_to(out)
  if len(rel.parts)>2 or f.name=='privacy.html':continue
  s=f.read_text()
  if 'http-equiv="refresh"' in s or "http-equiv='refresh'" in s:continue
  urls.append(canonical(rel))
 (out/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+u+'</loc></url>' for u in urls)+'</urlset>')
 (out/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+BASE+'/sitemap.xml\n')
 (out/'_headers').write_text('/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: frame-ancestors \'self\'\n\n/*.css\n  Cache-Control: public, max-age=3600\n\n/*.js\n  Cache-Control: public, max-age=3600\n\n/img/*\n  Cache-Control: public, max-age=86400\n\n/media/*\n  Cache-Control: public, max-age=86400\n')
 # Replace the old contact redirect now that a dedicated contact page exists.
 redirects=(out/'_redirects').read_text() if (out/'_redirects').exists() else ''
 redirects='\n'.join(line for line in redirects.splitlines() if not line.startswith('/contact.html '))+'\n'
 (out/'_redirects').write_text(redirects)
