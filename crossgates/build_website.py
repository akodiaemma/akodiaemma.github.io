"""Build the approved website with preview-only indexing protection."""
from pathlib import Path
import os, shutil, zipfile
base=Path(__file__).resolve().parent
out=base/'website-staging'
if out.exists():shutil.rmtree(out)
out.mkdir()
with zipfile.ZipFile(base/'crossgates-website.zip') as archive:
 for name in archive.namelist():
  target=(out/name).resolve()
  if not target.is_relative_to(out.resolve()):raise ValueError('Unsafe archive path')
 archive.extractall(out)
for source in (base/'staging-source').rglob('*'):
 if source.is_file():
  dest=out/source.relative_to(base/'staging-source');dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(source,dest)
shutil.copy2(base/'video/stiv.mp4',out/'media/stiv.mp4')
from optimise_website import optimise
optimise(out)
# Keep review deployments out of search results; production uses archive defaults.
if os.environ.get('CONTEXT') != 'production':
 shutil.copy2(base/'qa_preview.html',out/'qa-preview.html')
 (out/'robots.txt').write_text('User-agent: *\nDisallow: /\n')
 with (out/'_headers').open('a') as headers:
  headers.write('\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n')
print('Built complete website:',out)
