const fs=require('fs');
const h=fs.readFileSync('dist/index.html','utf8'),j=fs.readFileSync('dist/app.js','utf8');
const assets=[...h.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map(m=>m[1]);
for(const m of j.matchAll(/id:(\d+)/g))assets.push('assets/space-'+m[1]+'.jpg');
const missing=assets.filter(x=>!fs.existsSync('dist/'+x));
console.log(JSON.stringify({imageReferences:assets.length,missing,bookingLinks:(h.match(/https:\/\/m.booking.naver.com\/booking\/10\/bizes\/526188/g)||[]).length}));
if(missing.length)process.exit(1);
