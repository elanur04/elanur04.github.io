/* Static, dependency-free portfolio. All project claims come from the CV and repositories. */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  document.documentElement.classList.add('js');
  const tr = Object.fromEntries($$('[data-i18n]').map(el => [el.dataset.i18n, el.innerHTML]));
  const en = {
    skip:'Skip to content', navProjects:'Projects', navAbout:'About', navExperience:'Experience', navContact:'Contact', navCV:'View my CV',
    availability:'Open to internships & junior roles', hello:'Hi, I’m Elanur.', hero1:'Turning data', hero2:'into products', hero3:'that work.',
    heroDescription:'At the intersection of AI, data and software. I build projects that turn satellite imagery into digital twins and machine learning models into usable applications.',
    viewProjects:'Explore my work', viewCV:'View my CV', heroDegree:'Computer Engineering · Bartın University', location:'Istanbul, Türkiye',
    digitalTwin:'DIGITAL TWIN', buildingDetection:'Building detection', fromData:'Data into models', artCaption:'A new way to understand a city.', artNote:'Interactive illustration inspired by GeoSim',
    focus:'MY FOCUS', focus1:'AI & data', focus2:'Backend development', focus3:'Cloud & DevOps', focus4:'Optimization',
    projectsEyebrow:'FROM IDEA TO APPLICATION', projectsTitle:'Selected work.', projectsDescription:'Real problems, different technologies.<br>Something learned. Something built.',
    allProjects:'All projects', filterAI:'AI & data', filterCloud:'Backend & cloud', filterOptimization:'Optimization', graduationProject:'GRADUATION PROJECT', ongoing:'In development',
    geoSubtitle:'From a map to a living digital twin.', geoDescription:'A full-stack platform combining satellite imagery and OpenStreetMap data to create editable urban models and traffic scenarios.',
    myContribution:'MY CONTRIBUTION', geoContribution:'Building detection service, geospatial data processing and an interactive 3D interface.', projectDetails:'Explore project',
    cloudCategory:'CLOUD & DEVOPS', cloudTitle:'From code to cloud.', cloudSubtitle:'Dry Cleaning Management System', cloudDescription:'I containerized a PHP/MySQL application with Docker and deployed it to Kubernetes. Built a GitHub Actions pipeline for automated deployment to GKE.',
    qosCategory:'OPTIMIZATION · TEAM PROJECT', qosTitle:'Finding a better route.', qosSubtitle:'QoS Network Optimization', qosDescription:'Multi-objective routing on a 250-node network. I contributed Q-Learning and topology modeling, and coordinated our seven-member team.', genetic:'Genetic algorithm',
    mlCategory:'DATA SCIENCE & MACHINE LEARNING', mlTitle:'The stories in data.', mlSubtitle:'Student Depression Prediction', mlDescription:'Exploratory analysis, preprocessing and model comparison on nearly 28,000 records. An SVM with 84% test accuracy, served through a Streamlit interface.',
    packingCategory:'ALGORITHMS & VISUALIZATION', packingTitle:'Making room for more.', packingSubtitle:'3D Bin Packing · PackOptima', packingDescription:'An interactive application comparing genetic and whale optimization algorithms on the same packing problem, with 3D visualizations of the results.',
    moreProjects:'More mobile, web and embedded projects on GitHub.', allRepos:'Browse all repositories',
    aboutEyebrow:'A LITTLE ABOUT ME', aboutTitle1:'Curiosity comes first.', aboutTitle2:'I learn by building.', aboutRole:'Computer Engineering Student',
    aboutLead:'Seeing a model’s output is exciting. Turning it into something people can actually use is just as rewarding.',
    aboutText:'I’m a fourth-year Computer Engineering student at Bartın University. I enjoy working across a project’s layers, from processing data in Python to building APIs and deploying to the cloud. I’m looking for a team where I can learn, contribute and take responsibility in AI and data-focused backend development.',
    educationLabel:'Education', educationFact:'Bartın University · Computer Engineering', graduationLabel:'Expected graduation', graduationFact:'July 2027', languageLabel:'Languages', languageFact:'Turkish (native) · English (B1)', downloadCV:'Download CV (PDF, Turkish)',
    experienceEyebrow:'ALWAYS LEARNING', experienceTitle:'Experience & journey.', experienceDescription:'Professional experience, technical learning<br>and the lessons of building together.',
    geoDate:'Aug 2026 — Present', geoExperience:'Developing an AI-assisted geospatial digital twin and traffic simulation platform.', beranetDate:'Jul — Sep 2024', internship:'INTERNSHIP · ISTANBUL', beranetTitle:'Web Developer Intern', beranetDescription:'Built and updated web pages using HTML, CSS and PHP based on client requirements. Used Git for version control.', bachelor:'BACHELOR’S · EXPECTED GRADUATION 2027', university:'Bartın University', degree:'Computer Engineering',
    learningTitle:'Beyond the classroom.', academy:'Machine Learning Training', academyDate:'Nov 2024 — Jun 2025', cyber:'Cybersecurity certificate program', club:'AI & Data Science Club', clubRole:'Management team member · ML instructor', volunteer:'Event volunteer',
    skillsEyebrow:'MY TOOLKIT', skillsTitle:'The right tool for the problem.', skillCode:'Software & backend', skillData:'Data & machine learning', skillGeo:'Geospatial & visualization', skillCloud:'Cloud & development tools',
    contactEyebrow:'WHAT’S NEXT', contactTitle1:'Good things start', contactTitle2:'with a hello.', contactDescription:'I’d love to connect about internship or junior opportunities in AI, data and backend development.', sendEmail:'Send an email', copyEmail:'Copy address', cvPDF:'CV (PDF, Turkish)', contactLocation:'Istanbul, Türkiye · Ready to learn and build.', backTop:'Back to top'
  };
  const details = {
    geosim: {
      repo:'geosim', title:['GeoSim','GeoSim'], category:['BİTİRME PROJESİ · AĞUSTOS 2026 — DEVAM EDİYOR','GRADUATION PROJECT · AUGUST 2026 — PRESENT'],
      intro:['Uydu görüntüsü ve açık harita verisini, düzenlenebilir bir dijital ikiz ve trafik simülasyonu ortamına dönüştürmek.','Turning satellite imagery and open map data into an editable digital twin and traffic simulation environment.'],
      work:[['FastAPI REST servisiyle uydu görüntülerinde örnek segmentasyonu tabanlı bina tespiti geliştirdim.','2×2 bölütleme ve IoU tabanlı non-maximum suppression ile tespitleri işledim; maskeleri coğrafi referanslı GeoJSON poligonlarına dönüştürdüm.','Shapely STRtree mekânsal indeksiyle OSM binalarını yapay zekâ tespitleriyle birleştirdim. Yol ağını Overpass API üzerinden aldım.','React ve deck.gl arayüzü; yol ağı üzerinde IDM araç takibi, Dijkstra rotalama ve Web Worker ile trafik senaryoları.'],['Built a FastAPI REST service for instance-segmentation-based building detection in satellite imagery.','Processed detections with 2×2 tiling and IoU-based non-maximum suppression, converting masks into georeferenced GeoJSON polygons.','Combined OSM buildings and AI detections with a Shapely STRtree spatial index. Retrieved the road network via the Overpass API.','React and deck.gl interface; traffic scenarios using IDM vehicle following, Dijkstra routing and Web Workers.']],
      result:['Bina ve yol verisinin bir arada düzenlenebildiği, mevcut ağ ile yol kapatma ve yeni bağlantı senaryolarının incelenebildiği tam yığın bir araştırma prototipi.','A full-stack research prototype for editing buildings and roads together, and exploring baseline, road-closure and new-connection scenarios.'],
      note:['Proje geliştirme aşamasındadır. Trafik modeli gerçek trafik sayımlarıyla kalibre edilmiş değildir. Portfolyodaki şehir görseli, projeden esinlenen bir illüstrasyondur.','The project is in development. Its traffic model has not been calibrated against real traffic counts. The city artwork in this portfolio is an illustration inspired by the project.']
    },
    cloud:{repo:'kuru-temizleme-k8s',title:['Kuru Temizleme Yönetim Sistemi','Dry Cleaning Management System'],category:['BULUT & DEVOPS · MAYIS — HAZİRAN 2026','CLOUD & DEVOPS · MAY — JUNE 2026'],intro:['Bir PHP/MySQL uygulamasını konteyner tabanlı bir bulut ortamına taşımak ve dağıtımı otomatikleştirmek.','Moving a PHP/MySQL application to a container-based cloud environment and automating deployment.'],
      work:[['Uygulamayı Docker ile konteynerleştirip Google Kubernetes Engine’e dağıttım.','3 replikalı rolling update Deployment, Service, PVC, ConfigMap ve NetworkPolicy manifestleri hazırladım.','GHCR ve Workload Identity kullanarak GitHub Actions üzerinden GKE’ye otomatik dağıtım hattı kurdum.'],['Containerized the application with Docker and deployed it to Google Kubernetes Engine.','Prepared manifests for a three-replica rolling-update Deployment, Services, PVC, ConfigMap and NetworkPolicy.','Built automated GitHub Actions deployment to GKE using GHCR and Workload Identity.']],
      result:['Uygulama, veritabanı ve dağıtım adımlarını birlikte ele alan; Kubernetes yapılandırması ve CI/CD hattı depoda incelenebilen bir bulut projesi.','A cloud project covering application, database and delivery, with Kubernetes configuration and the CI/CD pipeline available in the repository.'], note:['Proje kodu ve dağıtım yapılandırması GitHub’dadır; sürekli çalışan bir canlı servis bağlantısı sunulmamaktadır.','Source and deployment configuration are available on GitHub; this portfolio does not provide a continuously running live service.'], video:'https://youtu.be/Qqmm9rNvvak'},
    qos:{repo:'QoS-Network-Optimizer',title:['QoS Ağ Optimizasyonu','QoS Network Optimization'],category:['OPTİMİZASYON · 7 KİŞİLİK TAKIM','OPTIMIZATION · SEVEN-MEMBER TEAM'],intro:['250 düğümlü bir ağda gecikme, güvenilirlik ve kaynak kullanımını birlikte gözeten rotalar aramak.','Finding routes through a 250-node network while considering latency, reliability and resource usage together.'],
      work:[['Q-Learning ortamının durum, eylem ve ödül yapısı ile ağ topolojisi modellemesine katkı sağladım.','Güvenilirlik değerlerini optimizasyonda kullanılabilecek toplanabilir maliyetlere dönüştürdüm.','7 kişilik ekipte proje koordinasyonu, görev dağılımı, modül entegrasyonu ve raporlamayı üstlendim.'],['Contributed Q-Learning states, actions and rewards, alongside network topology modeling.','Converted reliability values into additive costs for optimization.','Coordinated the seven-member team, task allocation, module integration and reporting.']],
      result:['Q-Learning, genetik algoritma ve karınca kolonisi yöntemlerinin aynı ağ problemi üzerinde incelendiği bir takım çalışması.','A team project examining Q-Learning, genetic algorithms and ant colony optimization on the same network problem.'],note:['Takım projesidir; burada yalnızca kendi katkılarımı belirtiyorum. Sezgisel yöntemler için küresel en iyi çözüm garantisi verilmez.','This is a team project; the contributions listed here are my own. The heuristic methods do not guarantee a global optimum.']},
    ml:{repo:'student_depression',title:['Öğrenci Depresyon Tahmini','Student Depression Prediction'],category:['VERİ BİLİMİ · MAKİNE ÖĞRENMESİ','DATA SCIENCE · MACHINE LEARNING'],intro:['Öğrenci verilerinde keşifsel analiz ve sınıflandırma; model çıktısını kullanılabilir bir Streamlit arayüzüne taşımak.','Exploratory analysis and classification on student data, with model inference available through a Streamlit interface.'],
      work:[['27.901 kayıt üzerinde veri temizleme, ön işleme ve öznitelik mühendisliği yaptım.','SVM, Random Forest, KNN ve lojistik regresyon modellerini karşılaştırdım.','SVM tahminlerini Streamlit arayüzüyle erişilebilir hale getirdim.'],['Cleaned and preprocessed 27,901 records and worked on feature engineering.','Compared SVM, Random Forest, KNN and logistic regression classifiers.','Made SVM inference accessible through a Streamlit interface.']],
      result:['Depodaki notebook çıktılarında SVM test doğruluğu yaklaşık %84 (0,836); test kümesi 5.581 kayıttır. Random Forest ROC AUC değeri 0,91 olarak raporlanmıştır.','Recorded notebook results show approximately 84% SVM test accuracy (0.836) on 5,581 test records. Random Forest ROC AUC is reported as 0.91.'],note:['Eğitim amaçlı bir projedir; klinik tanı aracı değildir. Değerler depodaki deney çıktılarıdır, bağımsız doğrulama sonucu değildir. Notebook ön işlemesinde veri sızıntısı riski bulunduğundan sonraki adım, yalnızca eğitim verisine uyan bir Pipeline ile yeniden değerlendirmedir.','An educational project, not a clinical diagnostic tool. Metrics are recorded repository results, not independent validation. Some notebook preprocessing carries data leakage risk; the next step is reevaluation with a pipeline fitted only on training data.']},
    packing:{repo:'3D-Bin-Packing-Optimization',title:['3B Kutu Yerleştirme · PackOptima','3D Bin Packing · PackOptima'],category:['OPTİMİZASYON · ETKİLEŞİMLİ GÖRSELLEŞTİRME','OPTIMIZATION · INTERACTIVE VISUALIZATION'],intro:['Farklı boyutlardaki kutuları üç boyutlu bir hacme yerleştirmek ve iki optimizasyon yaklaşımını görsel olarak karşılaştırmak.','Packing boxes of different sizes into a three-dimensional volume and visually comparing two optimization approaches.'],
      work:[['Genetik algoritma ve balina optimizasyon algoritmasını yerleştirme probleminde karşılaştıran uygulama geliştirdim.','Plotly ile 3B yerleşimleri görselleştirdim.','Streamlit üzerinden algoritma parametrelerinin değiştirilebildiği bir arayüz hazırladım.'],['Built an application comparing genetic and whale optimization algorithms on a packing problem.','Visualized 3D placements with Plotly.','Created a Streamlit interface for adjusting algorithm parameters.']],
      result:['Yerleşim sonuçlarını ve yakınsama davranışını birlikte incelemeyi sağlayan, deney yapmaya açık bir optimizasyon uygulaması.','An optimization application for exploring packing layouts and convergence behavior together.'],note:['Görseller portfolyo için hazırlanmış şematik anlatımlardır. Sezgisel algoritmaların sonuçları başlangıç koşullarına ve parametrelere bağlıdır; optimum çözüm garantisi yoktur.','Portfolio visuals are schematic illustrations. Heuristic outcomes depend on initial conditions and parameters, with no guarantee of an optimal solution.']}
  };
  let language = 'tr';
  let selectedProject = null;
  const dialog = $('#project-dialog');
  function renderDetail(id) {
    const data = details[id], i = language === 'en' ? 1 : 0;
    const content = $('#dialog-content'); content.replaceChildren();
    const add = (tag, text, className) => { const el = document.createElement(tag); el.textContent = text; if(className) el.className = className; content.append(el); return el; };
    add('p',data.category[i],'eyebrow'); add('h2',data.title[i]).id = 'dialog-title'; add('p',data.intro[i],'dialog-intro');
    add('h3', i ? 'What I contributed' : 'Neler geliştirdim?');
    const list = add('ul',''); data.work[i].forEach(text => { const li=document.createElement('li'); li.textContent=text; list.append(li); });
    add('h3',i ? 'The outcome' : 'Ortaya çıkan'); add('p',data.result[i],'dialog-intro'); add('p',data.note[i],'dialog-note');
    const links = add('div','','dialog-links');
    const link = document.createElement('a'); link.className='button button-dark'; link.href=`https://github.com/elanur04/${data.repo}`; link.target='_blank'; link.rel='noopener'; link.textContent = i ? 'View source on GitHub' : 'Kodu GitHub’da incele'; links.append(link);
    if(data.video){ const video=link.cloneNode(); video.className='button button-outline'; video.href=data.video; video.textContent=i?'Watch project video':'Proje videosunu izle'; links.append(video); }
  }
  function updateMotionLabel() {
    const button=$('#motion-toggle');
    button.setAttribute('aria-label',language==='tr'?(paused?'Animasyonu oynat':'Animasyonu duraklat'):(paused?'Play animation':'Pause animation'));
    button.setAttribute('aria-pressed',String(paused));
    button.innerHTML=paused?'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="m5 2 9 6-9 6z"/></svg>':'<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 3h3v10H4zM10 3h3v10h-3z"/></svg>';
  }
  function setLanguage(next) {
    language=next; document.documentElement.lang=next;
    const dictionary=next==='en'?en:tr;
    $$('[data-i18n]').forEach(el=>{ el.innerHTML=dictionary[el.dataset.i18n] ?? tr[el.dataset.i18n]; });
    $('.lang-tr').classList.toggle('active',next==='tr'); $('.lang-en').classList.toggle('active',next==='en');
    $('#language').setAttribute('aria-label',next==='tr'?'Switch to English':'Türkçeye geç');
    $('#navigation').setAttribute('aria-label',next==='tr'?'Ana menü':'Main navigation');
    $('.project-filters').setAttribute('aria-label',next==='tr'?'Projeleri alana göre filtrele':'Filter projects by field');
    $('.dialog-close').setAttribute('aria-label',next==='tr'?'Pencereyi kapat':'Close dialog');
    $('#city').setAttribute('aria-label',next==='tr'?'GeoSim’den esinlenen izometrik şehir illüstrasyonu: bina katmanları, yol ağı ve hareketli trafik.':'Isometric city illustration inspired by GeoSim: building layers, roads and animated traffic.');
    $('#copy-status').textContent='';
    document.title=next==='tr'?'Elanur Beycan — Yapay Zekâ, Veri & Yazılım':'Elanur Beycan — AI, Data & Software';
    setMenu(false); updateMotionLabel(); updateFilterStatus();
    if(selectedProject) renderDetail(selectedProject);
    try { localStorage.setItem('portfolio-language',next); } catch { /* Storage is optional. */ }
  }
  function setMenu(open) {
    $('#navigation').classList.toggle('open',open);
    $('#menu-toggle').setAttribute('aria-expanded',String(open));
    $('#menu-toggle').setAttribute('aria-label',language==='tr'?(open?'Menüyü kapat':'Menüyü aç'):(open?'Close menu':'Open menu'));
  }
  $('#menu-toggle').addEventListener('click',()=>setMenu($('#menu-toggle').getAttribute('aria-expanded')!=='true'));
  $$('#navigation a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && $('#navigation').classList.contains('open')){setMenu(false); $('#menu-toggle').focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))setMenu(false);});
  window.matchMedia('(min-width:681px)').addEventListener('change',()=>setMenu(false));
  $('#language').addEventListener('click',()=>setLanguage(language==='tr'?'en':'tr'));
  function updateFilterStatus() {
    const count=$$('.project-card:not([hidden])').length;
    $('#filter-status').textContent=language==='tr'?`${count} proje gösteriliyor.`:`Showing ${count} projects.`;
  }
  $$('.filter').forEach(button=>button.addEventListener('click',()=>{
    $$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    $$('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.category.split(' ').includes(button.dataset.filter);}); updateFilterStatus();
  }));
  $$('[data-project]').forEach(button=>button.addEventListener('click',()=>{
    selectedProject=button.dataset.project; renderDetail(selectedProject); dialog.showModal(); dialog.scrollTop=0; document.body.classList.add('dialog-open');
  }));
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');selectedProject=null;});
  $('#copy-email').addEventListener('click',async()=>{
    try { await navigator.clipboard.writeText('beycanelanur@gmail.com'); $('#copy-status').textContent=language==='tr'?'E-posta adresi kopyalandı.':'Email address copied.'; }
    catch { $('#copy-status').textContent=language==='tr'?'Adresi seçip kopyalayabilirsiniz: beycanelanur@gmail.com':'Select and copy: beycanelanur@gmail.com'; }
  });
  const navLinks=$$('#navigation a');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>{const active=link.hash===`#${entry.target.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -65% 0px'});
    navLinks.forEach(link=>observer.observe($(link.hash)));
  }

  /* Original isometric city illustration. No external map service or API key. */
  const canvas=$('#city'), context=canvas.getContext('2d');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)');
  let paused=reducedMotion.matches, visible=true, frame=0, width=0, height=0, lastTime=0, elapsed=0, pointer={x:0,y:0};
  const buildings=[];
  let seed=2404;
  const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  for(let x=0;x<7;x++)for(let y=0;y<7;y++){
    if(x===2||x===5||y===2||y===5)continue;
    buildings.push({x:x*36-118,y:y*36-118,w:23+random()*4,d:23+random()*4,h:14+random()*47,highlight:random()>.77});
  }
  buildings.sort((a,b)=>(a.x+a.y)-(b.x+b.y));
  function project(x,y,z=0){const scale=width/520;return [width*.5+(x-y)*.88*scale+pointer.x*4,height*.51+(x+y)*.43*scale-z*scale+pointer.y*3];}
  function polygon(points,fill,stroke,lineWidth=1){context.beginPath();points.forEach((p,i)=>{const q=project(...p);if(i)context.lineTo(...q);else context.moveTo(...q);});context.closePath();if(fill){context.fillStyle=fill;context.fill();}if(stroke){context.strokeStyle=stroke;context.lineWidth=lineWidth;context.stroke();}}
  function line(points,color,lineWidth=1){context.beginPath();points.forEach((p,i)=>{const q=project(...p);if(i)context.lineTo(...q);else context.moveTo(...q);});context.strokeStyle=color;context.lineWidth=lineWidth;context.stroke();}
  function draw(){
    if(!context||!width)return;
    context.clearRect(0,0,width,height);
    // A quiet coordinate grid extends beyond the raised city tile.
    for(let n=-240;n<=240;n+=36){line([[n,-240,-10],[n,240,-10]],'#9ab3810d',.6);line([[-240,n,-10],[240,n,-10]],'#9ab3810d',.6);}
    polygon([[-143,-143,-7],[143,-143,-7],[143,143,-7],[-143,143,-7]],'#11291e','#91ab6033');
    polygon([[-143,143,0],[143,143,0],[143,143,-12],[-143,143,-12]],'#152e22','#4b6a3944');
    polygon([[143,-143,0],[143,143,0],[143,143,-12],[143,-143,-12]],'#10251c','#4b6a3944');
    polygon([[-143,-143,0],[143,-143,0],[143,143,0],[-143,143,0]],'#244332','#6d8e4855');
    // Roads and dashed lane markings.
    for(const n of [-59,49]){
      polygon([[n-7,-140,1],[n+7,-140,1],[n+7,140,1],[n-7,140,1]],'#173227');
      polygon([[-140,n-7,1],[140,n-7,1],[140,n+7,1],[-140,n+7,1]],'#173227');
      for(let k=-132;k<138;k+=16){line([[n,k,1.5],[n,k+5,1.5]],'#819d5966',.8);line([[k,n,1.5],[k+5,n,1.5]],'#819d5966',.8);}
    }
    // A highlighted route is schematic, not a measured journey.
    line([[-140,49,2],[-59,49,2],[-59,-59,2],[140,-59,2]],'#bfd98688',1.5);
    for(let i=0;i<14;i++){
      const t=((elapsed*.022+i*21)%275)-137;
      const lane=i%2?49:-59;
      const q=project(...(i%3?[t,lane,2]:[lane,t,2]));
      context.fillStyle=i%4?'#bfd4a6':'#ebf7b7';context.shadowColor='#d9f49d';context.shadowBlur=5;context.beginPath();context.arc(q[0],q[1],i%4?1.4:2,0,Math.PI*2);context.fill();context.shadowBlur=0;
    }
    for(const b of buildings){
      const {x,y,w,d,h,highlight}=b;
      polygon([[x+5,y+5,1],[x+w+18,y+5,1],[x+w+18,y+d+15,1],[x+5,y+d+15,1]],'#0a201b45');
      polygon([[x,y+d,0],[x+w,y+d,0],[x+w,y+d,h],[x,y+d,h]],highlight?'#7c9561':'#3b5c43',highlight?'#cce49399':'#7c9a6155',.7);
      polygon([[x+w,y,0],[x+w,y+d,0],[x+w,y+d,h],[x+w,y,h]],highlight?'#597c48':'#2e4c36',highlight?'#cce49399':'#7c9a6155',.7);
      polygon([[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]],highlight?'#b5ce85':'#769465',highlight?'#e6f7b2':'#9bb77f88',.8);
      polygon([[x+4,y+4,h+.3],[x+w-4,y+4,h+.3],[x+w-4,y+d-4,h+.3],[x+4,y+d-4,h+.3]],highlight?'#a3bf6e':'#678459','#cce59b33',.5);
      for(let floor=7;floor<h-5;floor+=9){
        for(let win=4;win<w-3;win+=7)line([[x+win,y+d+.3,floor],[x+win+2.3,y+d+.3,floor]],highlight?'#d6e9a9aa':'#adc98566',1.2);
        for(let win=4;win<d-3;win+=7)line([[x+w+.3,y+win,floor],[x+w+.3,y+win+2.3,floor]],'#adcc8066',1.1);
      }
      if(highlight){polygon([[x-3,y-3,h+4],[x+w+3,y-3,h+4],[x+w+3,y+d+3,h+4],[x-3,y+d+3,h+4]],null,'#d6ef9177',.8);}
    }
    // Reference corners make the spatial concept readable without decorative data.
    for(const [x,y] of [[-143,-143],[143,-143],[-143,143],[143,143]]){
      const q=project(x,y,1);context.strokeStyle='#bdd68b';context.lineWidth=1;context.beginPath();context.moveTo(q[0]-4,q[1]);context.lineTo(q[0]+4,q[1]);context.moveTo(q[0],q[1]-4);context.lineTo(q[0],q[1]+4);context.stroke();
    }
  }
  function tick(time){frame=0;if(paused||!visible||document.hidden)return;if(time-lastTime>=30){elapsed+=Math.min(time-lastTime,50);draw();lastTime=time;}frame=requestAnimationFrame(tick);}
  function schedule(){if(!frame&&!paused&&visible&&!document.hidden){lastTime=performance.now();frame=requestAnimationFrame(tick);}}
  function resize(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context?.setTransform(dpr,0,0,dpr,0,0);draw();}
  if(context){new ResizeObserver(resize).observe(canvas);resize();
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{threshold:0}).observe(canvas);
    canvas.addEventListener('pointermove',event=>{if(paused||reducedMotion.matches)return;const r=canvas.getBoundingClientRect();pointer={x:(event.clientX-r.left)/r.width-.5,y:(event.clientY-r.top)/r.height-.5};});
    canvas.addEventListener('pointerleave',()=>{pointer={x:0,y:0};if(paused)draw();});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
  }
  $('#motion-toggle').addEventListener('click',()=>{paused=!paused;updateMotionLabel();if(paused){cancelAnimationFrame(frame);frame=0;}else schedule();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotionLabel();if(paused){cancelAnimationFrame(frame);frame=0;draw();}else schedule();});
  let saved='tr';try {if(localStorage.getItem('portfolio-language')==='en')saved='en';}catch { /* Default remains Turkish. */ }
  setLanguage(saved);schedule();
})();
