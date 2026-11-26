// Run after changing CSS, JavaScript or the embedded animation.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const name of ['style.css','script.js','assets/segmentasyon-animasyonu.html']){
 const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12);
 const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 html=html.replace(new RegExp('(["\\\'])'+escaped+'(?:\\?[^"\\\']*)?(["\\\'])','g'),`$1${name}?v=${hash}$2`);
}
fs.writeFileSync(path.join(root,'index.html'),html);
