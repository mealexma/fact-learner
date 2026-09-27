const birds = [
  {id:'passer-domesticus',scientific:'Passer domesticus',en:'House sparrow',sv:'Gråsparv',zh:'Jiā má què',image:'images/sparrow.jpg',credit:'Charles J. Sharp · CC BY-SA 3.0',source:'https://commons.wikimedia.org/wiki/File:House_sparrow_(Passer_domesticus).jpg'},
  {id:'anas-platyrhynchos',scientific:'Anas platyrhynchos',en:'Mallard',sv:'Gräsand',zh:'Lǜ tóu yā',image:'images/mallard.jpg',credit:'Imran Shah · CC BY-SA 2.0',source:'https://commons.wikimedia.org/wiki/File:Mallard_(Anas_platyrhynchos)_(26436726209).jpg'},
  {id:'pica-pica',scientific:'Pica pica',en:'Eurasian magpie',sv:'Skata',zh:'Ōu yà xǐ què',image:'images/magpie.jpg',credit:'Alexis Lours · CC BY 4.0',source:'https://commons.wikimedia.org/wiki/File:Eurasian_magpie_(Pica_pica).jpg'},
  {id:'parus-major',scientific:'Parus major',en:'Great tit',sv:'Talgoxe',zh:'Ōu yà dà shān què',image:'images/great-tit.jpg',credit:'caroline legg · CC BY 2.0',source:'https://commons.wikimedia.org/wiki/File:Great_tit_-_Parus_major_(51988627968).jpg'},
  {id:'cyanistes-caeruleus',scientific:'Cyanistes caeruleus',en:'Eurasian blue tit',sv:'Blåmes',zh:'Lán shān què',image:'images/blue-tit.jpg',credit:'TRinaud · CC BY 4.0',source:'https://commons.wikimedia.org/wiki/File:Eurasian_blue_tit_(Cyanistes_caeruleus)_2021.jpg'}
];
const spanish = [
  {id:'chico',es:'Chico',sv:'kille',image:'images/spanish/chico.png'},
  {id:'chica',es:'Chica',sv:'tjej',image:'images/spanish/chica.png'},
  {id:'yo-tambien',es:'Yo también',sv:'jag också',image:'images/spanish/conversacion.png'},
  {id:'la-capital',es:'La capital',sv:'huvudstaden',image:'images/spanish/ciudad.png'},
  {id:'una-ciudad',es:'Una ciudad',sv:'en stad',image:'images/spanish/ciudad.png'},
  {id:'que',es:'Que',sv:'som',image:'images/spanish/conversacion.png'},
  {id:'se-llama',es:'Se llama',sv:'(den) heter',image:'images/spanish/conversacion.png'},
  {id:'en',es:'En',sv:'i',image:'images/spanish/ciudad.png'},
  {id:'si',es:'Sí',sv:'ja',image:'images/spanish/conversacion.png'},
  {id:'no',es:'No',sv:'nej',image:'images/spanish/conversacion.png'},
  {id:'pero',es:'Pero',sv:'men',image:'images/spanish/conversacion.png'}
];
const topics = {
  birds:{title:'Birds',subtitle:'Five familiar species · English, Swedish, Mandarin pinyin',image:'images/blue-tit.jpg',items:birds,languages:[['en','English'],['sv','Swedish'],['zh','Mandarin pinyin']]},
  spanish:{title:'Kapitelord 1–4',subtitle:'Spanish homework · 1 October',image:'images/spanish/ciudad.png',items:spanish,languages:[['es','Spanish'],['sv','Swedish']]}
};
const KEY='fact-learner-v1';
const freshPractice=id=>({index:0,mode:id==='birds'?'picture':'sv',revealed:false,results:{}});
const freshMatch=id=>({players:['Player 1','Player 2'],scores:[0,0],turn:0,itemId:topics[id].items[0].id,awards:{},history:[],ended:false});
let stored={};try{stored=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{}
const state={
  page:'home',topicId:'birds',
  practices:{
    birds:{...freshPractice('birds'),...(stored.practices?.birds||stored.practice)},
    spanish:{...freshPractice('spanish'),...stored.practices?.spanish}
  },
  matches:{
    birds:{...freshMatch('birds'),...(stored.matches?.birds||stored.match)},
    spanish:{...freshMatch('spanish'),...stored.matches?.spanish}
  }
};
if(stored.match?.birdId&&!stored.match.itemId)state.matches.birds.itemId=stored.match.birdId;
state.matches.birds.history=state.matches.birds.history.map(s=>({...s,itemId:s.itemId||s.birdId||birds[0].id}));
const app=document.querySelector('#app');
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const topic=()=>topics[state.topicId];
const practiceState=()=>state.practices[state.topicId];
const matchState=()=>state.matches[state.topicId];
const itemImage=(item,hidden=false)=>`<img class="hero-img" src="${item.image}" alt="${hidden?'Illustration or photo; answer hidden until reveal':esc(item.en||item.es)}">`;
const itemNames=item=>state.topicId==='birds'?`<dl class="names"><dt>English</dt><dd>${esc(item.en)}</dd><dt>Swedish</dt><dd>${esc(item.sv)}</dd><dt>Mandarin pinyin</dt><dd>${esc(item.zh)}</dd></dl>`:`<dl class="names"><dt>Spanish</dt><dd>${esc(item.es)}</dd><dt>Swedish</dt><dd>${esc(item.sv)}</dd></dl>`;
const credit=item=>item.source?`<p class="credit">Photo: <a href="${item.source}" target="_blank" rel="noopener">${esc(item.credit)}</a></p>`:'';
const back=()=>`<button class="back" data-page="home">← All topics</button>`;
const nav=()=>`<div class="topic-nav"><button class="btn secondary" data-page="topic">Overview</button><button class="btn secondary" data-page="learn">Learn</button><button class="btn secondary" data-page="practice">Practice</button><button class="btn secondary" data-page="match">Match</button></div>`;

function home(){return `<section class="hero"><p class="eyebrow">Your learning library</p><h1>Pick a topic.</h1><p>Choose what to study, then learn, practice, or play a spoken match.</p></section><h2>Topics</h2><div class="topic-grid">${Object.entries(topics).map(([id,t])=>`<article class="topic"><img src="${t.image}" loading="lazy" decoding="async" alt="${id==='birds'?'Eurasian blue tit':'Illustration of a city square'}"><div class="topic-body"><p class="eyebrow">${t.items.length} facts</p><h3>${esc(t.title)}</h3><p>${esc(t.subtitle)}</p><button class="btn" data-topic="${id}">Open topic</button></div></article>`).join('')}</div>`}
function overview(){const t=topic(),p=practiceState(),done=Object.values(p.results).filter(x=>x==='got').length;return `${back()}<p class="eyebrow">Your topic</p><h1>${esc(t.title)}</h1><p class="lead">${esc(t.subtitle)}</p><div class="panel"><p class="progress">${done} of ${t.items.length} marked Got it</p><h2>What would you like to do?</h2><div class="row"><button class="btn" data-page="learn">Learn</button><button class="btn secondary" data-page="practice">Practice</button><button class="btn secondary" data-page="match">Match</button></div></div><p class="small muted">Progress and match scores stay in this browser.</p>`}
function learn(){const t=topic();return `${back()}${nav()}<p class="eyebrow">${esc(t.title)} · Learn</p><h1>Get to know it.</h1><p class="lead">Read each fact and its matching words.</p><div class="grid">${t.items.map(item=>`<article class="bird"><img src="${item.image}" loading="lazy" decoding="async" alt="${esc(item.en||item.es)}"><h3>${esc(item.en||item.es)}</h3>${item.scientific?`<p class="meta"><i>${esc(item.scientific)}</i></p>`:''}${itemNames(item)}${credit(item)}</article>`).join('')}</div>`}
function practice(){const t=topic(),p=practiceState(),item=t.items[p.index%t.items.length],done=Object.values(p.results).filter(x=>x==='got').length;const options=state.topicId==='birds'?[['picture','Picture only'],...t.languages]:t.languages;const prompt=p.mode==='picture'?'What bird is this?':esc(item[p.mode]);return `<div class="practice-shell"><div class="practice-head"><button class="back" data-page="topic">← ${esc(t.title)}</button><span class="practice-count">${p.index%t.items.length+1} / ${t.items.length}</span></div><p class="eyebrow">Practice · ${esc(t.title)}</p><div class="row"><label>Show me<select id="mode">${options.map(([value,label])=>`<option value="${value}" ${p.mode===value?'selected':''}>${esc(label)}</option>`).join('')}</select></label><span class="progress">${done} got it</span></div>${itemImage(item,true)}<p class="practice-prompt">${prompt}</p>${p.revealed?`<div class="practice-reveal"><h2>${esc(item.en||item.es)}</h2>${itemNames(item)}${credit(item)}</div><div class="practice-actions"><button class="btn secondary" id="again">Again</button><button class="btn" id="got">Got it</button></div>`:`<div class="practice-actions"><button class="btn" id="reveal">Reveal answer</button></div>`}</div>`}
function match(){const t=topic(),m=matchState(),item=t.items.find(x=>x.id===m.itemId)||t.items[0],langs=state.topicId==='birds'?t.languages:[['es','Spanish']];return `${back()}${nav()}<p class="eyebrow">${esc(t.title)} · Match</p><h1>Name it together.</h1><p class="lead">${state.topicId==='birds'?'Name the bird in each language.':'Translate the Swedish prompt into Spanish.'} Give the point to the speaker; judge answers and repeats together.</p><section class="panel stack"><div class="scores">${m.players.map((name,i)=>`<div class="score ${m.turn===i&&!m.ended?'turn':''}">${m.turn===i&&!m.ended?'<span class="badge">Naming turn</span>':''}<span>${esc(name)}</span><strong>${m.scores[i]}</strong></div>`).join('')}</div><div class="row">${m.players.map((name,i)=>`<label>Player ${i+1}<input data-player="${i}" value="${esc(name)}" maxlength="24"></label>`).join('')}</div>${m.ended?`<h2>Match ended</h2><p>${m.scores[0]===m.scores[1]?'Tie game':esc(m.players[m.scores[0]>m.scores[1]?0:1])+' wins'} · ${m.scores.join('–')}</p><div class="row"><button class="btn secondary" id="resume">Resume match</button><button class="btn" id="new">New match</button></div>`:`<div class="match-photo"><span class="photo-label">${state.topicId==='birds'?'Bird to name':'Swedish prompt'}</span>${itemImage(item,true)}${state.topicId==='spanish'?`<h2>${esc(item.sv)}</h2>`:''}</div><p class="small muted">${Object.keys(m.awards).length}/${langs.length} languages scored this round. Next turn and Pass advance to the next item.</p><div>${langs.map(([lang,label])=>`<div class="language"><span>${label}</span>${m.awards[lang]!==undefined?`<em>Point to ${esc(m.players[m.awards[lang]])}</em>`:m.players.map((name,i)=>`<button class="btn secondary" data-award="${lang}" data-speaker="${i}">+1 ${esc(name)}</button>`).join('')}</div>`).join('')}</div><div class="row"><button class="btn" id="next">Next turn</button><button class="btn secondary" id="pass">Pass</button><button class="btn secondary" id="undo" ${m.history.length?'':'disabled'}>Undo</button><button class="btn secondary" id="end">End match</button></div>`}<p class="status" role="status">${esc(m.message||'')}</p></section>`}
function render(){document.body.classList.toggle('practice-view',state.page==='practice');app.innerHTML=state.page==='home'?home():state.page==='topic'?overview():state.page==='learn'?learn():state.page==='practice'?practice():match();bind()}
function snapshot(){const m=matchState();m.history.push({scores:[...m.scores],turn:m.turn,itemId:m.itemId,awards:{...m.awards},ended:m.ended});if(m.history.length>100)m.history.shift()}
function nextItem(){const t=topic(),m=matchState(),index=t.items.findIndex(x=>x.id===m.itemId);m.itemId=t.items[((index<0?0:index)+1)%t.items.length].id}
function bind(){
  document.querySelectorAll('[data-topic]').forEach(x=>x.onclick=()=>{state.topicId=x.dataset.topic;state.page='topic';save();render()});
  document.querySelectorAll('[data-page]').forEach(x=>x.onclick=()=>{state.page=x.dataset.page;save();render()});
  if(state.page==='practice'){
    const p=practiceState(),t=topic();
    document.querySelector('#mode').onchange=e=>{p.mode=e.target.value;p.revealed=false;save();render()};
    const reveal=document.querySelector('#reveal');if(reveal)reveal.onclick=()=>{p.revealed=true;save();render()};
    for(const [id,val] of [['again','again'],['got','got']]){const x=document.querySelector('#'+id);if(x)x.onclick=()=>{const item=t.items[p.index%t.items.length];p.results[item.id]=val;p.index=(p.index+1)%t.items.length;p.revealed=false;save();render()}}
  }
  if(state.page==='match'){
    const m=matchState();
    document.querySelectorAll('[data-player]').forEach(x=>x.onchange=()=>{m.players[+x.dataset.player]=x.value.trim()||`Player ${+x.dataset.player+1}`;save();render()});
    document.querySelectorAll('[data-award]').forEach(x=>x.onclick=()=>{if(m.awards[x.dataset.award]!==undefined)return;snapshot();const i=+x.dataset.speaker;m.awards[x.dataset.award]=i;m.scores[i]++;m.message=`Point to ${m.players[i]}`;save();render()});
    for(const [id,msg] of [['next','Next naming turn'],['pass','Turn passed']]){const x=document.querySelector('#'+id);if(x)x.onclick=()=>{snapshot();m.turn=1-m.turn;nextItem();m.awards={};m.message=msg;save();render()}}
    const undo=document.querySelector('#undo');if(undo)undo.onclick=()=>{const prior=m.history.pop();if(prior){Object.assign(m,prior);m.message='Last action undone';save();render()}};
    const end=document.querySelector('#end');if(end)end.onclick=()=>{snapshot();m.ended=true;m.message='';save();render()};
    const resume=document.querySelector('#resume');if(resume)resume.onclick=()=>{m.ended=false;save();render()};
    const n=document.querySelector('#new');if(n)n.onclick=()=>{state.matches[state.topicId]={...freshMatch(state.topicId),players:[...m.players]};save();render()};
  }
}
render();
