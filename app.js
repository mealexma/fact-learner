const birds = [
  {id:'passer-domesticus',scientific:'Passer domesticus',en:'House sparrow',sv:'Gråsparv',zh:'Jiā má què',photo:'sparrow.jpg',credit:'Charles J. Sharp · CC BY-SA 3.0',source:'https://commons.wikimedia.org/wiki/File:House_sparrow_(Passer_domesticus).jpg'},
  {id:'anas-platyrhynchos',scientific:'Anas platyrhynchos',en:'Mallard',sv:'Gräsand',zh:'Lǜ tóu yā',photo:'mallard.jpg',credit:'Imran Shah · CC BY-SA 2.0',source:'https://commons.wikimedia.org/wiki/File:Mallard_(Anas_platyrhynchos)_(26436726209).jpg'},
  {id:'pica-pica',scientific:'Pica pica',en:'Eurasian magpie',sv:'Skata',zh:'Ōu yà xǐ què',photo:'magpie.jpg',credit:'Alexis Lours · CC BY 4.0',source:'https://commons.wikimedia.org/wiki/File:Eurasian_magpie_(Pica_pica).jpg'},
  {id:'parus-major',scientific:'Parus major',en:'Great tit',sv:'Talgoxe',zh:'Ōu yà dà shān què',photo:'great-tit.jpg',credit:'caroline legg · CC BY 2.0',source:'https://commons.wikimedia.org/wiki/File:Great_tit_-_Parus_major_(51988627968).jpg'},
  {id:'cyanistes-caeruleus',scientific:'Cyanistes caeruleus',en:'Eurasian blue tit',sv:'Blåmes',zh:'Lán shān què',photo:'blue-tit.jpg',credit:'TRinaud · CC BY 4.0',source:'https://commons.wikimedia.org/wiki/File:Eurasian_blue_tit_(Cyanistes_caeruleus)_2021.jpg'}
];

const KEY = 'fact-learner-v1';
const fresh = () => ({
  tab:'home',
  practice:{index:0,mode:'picture',revealed:false,results:{}},
  match:{players:['Player 1','Player 2'],scores:[0,0],turn:0,birdId:birds[0].id,awards:{},history:[],ended:false}
});
let stored = {};
try { stored = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { /* Start fresh if saved JSON is damaged. */ }
const state = {
  ...fresh(),
  ...stored,
  tab:'home',
  practice:{...fresh().practice,...stored.practice},
  match:{...fresh().match,...stored.match}
};
const app = document.querySelector('#app');
const save = () => localStorage.setItem(KEY,JSON.stringify(state));
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names = b => `<dl class="names"><dt>English</dt><dd>${esc(b.en)}</dd><dt>Swedish</dt><dd>${esc(b.sv)}</dd><dt>Mandarin pinyin</dt><dd>${esc(b.zh)}</dd></dl>`;
const photo = (b,hidden=false) => `<img class="hero-img" src="images/${b.photo}" alt="${hidden?'Bird photograph; name hidden until reveal':esc(b.en)}">`;
const credit = b => `<p class="credit">Photo: <a href="${b.source}" target="_blank" rel="noopener">${esc(b.credit)}</a></p>`;

function home(){
  return `<section class="hero"><p class="eyebrow">Your learning library</p><h1>Choose a<br>topic.</h1><p>Learn the facts, practice at your pace, then play together.</p></section>
    <h2 class="section-head">Topics</h2><div class="topic-grid">
      <article class="topic"><img src="images/blue-tit.jpg" alt="Eurasian blue tit perched on a branch"><div class="topic-body"><p class="eyebrow">Available now · 5 facts</p><h3>Birds</h3><p>Five familiar species in English, Swedish, and Mandarin pinyin.</p><div class="topic-actions"><button class="btn" data-open="learn">Start learning</button><button class="btn secondary" data-open="practice">Practice</button><button class="btn secondary" data-open="match">Match</button></div></div></article>
      <div class="topic coming"><p class="eyebrow">Your library can grow</p><h3>More topics later</h3><p>Birds is the first small pack. New topics will appear here after review.</p></div>
    </div>`;
}

function learn(){
  return `<p class="eyebrow">Birds · Learn</p><h1>Meet the birds.</h1><p class="lead">Browse five species. Each photo, name, and scientific identity refers to the same bird.</p>
    <div class="grid">${birds.map(b=>`<article class="bird"><img src="images/${b.photo}" alt="${esc(b.en)}"><h3>${esc(b.en)}</h3><p class="meta"><i>${esc(b.scientific)}</i></p>${names(b)}${credit(b)}</article>`).join('')}</div>`;
}

function practice(){
  const p=state.practice,b=birds[p.index%birds.length],done=Object.values(p.results).filter(x=>x==='got').length;
  return `<p class="eyebrow">Birds · Practice</p><h1>Try a name.</h1><p class="lead">Say your answer aloud or think it through, then reveal the names.</p>
    <section class="panel stack"><div class="row practice-top"><label>Prompt<select id="mode"><option value="picture" ${p.mode==='picture'?'selected':''}>Picture only</option><option value="en" ${p.mode==='en'?'selected':''}>English</option><option value="sv" ${p.mode==='sv'?'selected':''}>Swedish</option><option value="zh" ${p.mode==='zh'?'selected':''}>Mandarin pinyin</option></select></label><span class="progress">${done} of 5 got it</span></div>
    ${photo(b,!p.revealed)}${!p.revealed?`<p class="prompt">${p.mode==='picture'?'What bird is this?':`Starting clue: ${esc(b[p.mode])}`}</p><button class="btn" id="reveal">Reveal names</button>`:`<div><h2>${esc(b.en)}</h2><p class="meta"><i>${esc(b.scientific)}</i></p>${names(b)}${credit(b)}</div><div class="row"><button class="btn secondary" id="again">Again</button><button class="btn" id="got">Got it</button></div>`}</section>`;
}

function match(){
  const m=state.match,b=birds.find(x=>x.id===m.birdId)||birds[0],count=Object.keys(m.awards).length;
  return `<p class="eyebrow">Birds · Match</p><h1>Name it together.</h1><p class="lead">Speak the names. Give each language point to the person who said it, including partner bonuses. You judge correctness and repeats.</p>
    <section class="panel stack"><div class="scores">${m.players.map((name,i)=>`<div class="score ${m.turn===i&&!m.ended?'turn':''}">${m.turn===i&&!m.ended?'<span class="badge">Naming turn</span>':''}<span>${esc(name)}</span><strong>${m.scores[i]}</strong></div>`).join('')}</div>
    <div class="row">${m.players.map((n,i)=>`<label>Player ${i+1}<input data-player="${i}" value="${esc(n)}" maxlength="24"></label>`).join('')}</div>
    ${m.ended?`<h2>Match ended</h2><p>${m.scores[0]===m.scores[1]?'Tie game':esc(m.players[m.scores[0]>m.scores[1]?0:1])+' wins'} · ${m.scores.join('–')}</p><div class="row"><button class="btn secondary" id="resume">Resume match</button><button class="btn" id="new">New match</button></div>`:`
      <div class="match-photo"><span class="photo-label">Bird to name</span>${photo(b,true)}</div>
      <p class="small muted">${count}/3 languages scored this round. Each language earns one point. Next turn and Pass show the next bird.</p>
      <div>${[['en','English'],['sv','Swedish'],['zh','Mandarin pinyin']].map(([lang,label])=>`<div class="language"><span>${label}</span>${m.awards[lang]!==undefined?`<em>Point to ${esc(m.players[m.awards[lang]])}</em>`:m.players.map((n,i)=>`<button class="btn secondary" data-award="${lang}" data-speaker="${i}">+1 ${esc(n)}</button>`).join('')}</div>`).join('')}</div>
      <div class="row"><button class="btn" id="next">Next turn</button><button class="btn secondary" id="pass">Pass</button><button class="btn secondary" id="undo" ${m.history.length?'':'disabled'}>Undo</button><button class="btn secondary" id="end">End match</button></div>`}
    <p class="status" role="status">${esc(m.message||'')}</p></section>`;
}

function render(){
  document.querySelectorAll('nav button').forEach(x=>x.setAttribute('aria-current',x.dataset.tab===state.tab?'page':'false'));
  app.innerHTML=state.tab==='home'?home():state.tab==='learn'?learn():state.tab==='practice'?practice():match();
  bind();
}
function snapshot(){
  const m=state.match;
  m.history.push({scores:[...m.scores],turn:m.turn,birdId:m.birdId,awards:{...m.awards},ended:m.ended});
  if(m.history.length>100)m.history.shift();
}
function nextBird(){
  const m=state.match,index=birds.findIndex(b=>b.id===m.birdId);
  m.birdId=birds[((index<0?0:index)+1)%birds.length].id;
}
function bind(){
  const open=tab=>{state.tab=tab;save();render()};
  document.querySelectorAll('nav button').forEach(x=>x.onclick=()=>open(x.dataset.tab));
  document.querySelectorAll('[data-open]').forEach(x=>x.onclick=()=>open(x.dataset.open));
  if(state.tab==='practice'){
    const p=state.practice;
    document.querySelector('#mode').onchange=e=>{p.mode=e.target.value;p.revealed=false;save();render()};
    const reveal=document.querySelector('#reveal');if(reveal)reveal.onclick=()=>{p.revealed=true;save();render()};
    for(const [id,val] of [['again','again'],['got','got']]){const x=document.querySelector('#'+id);if(x)x.onclick=()=>{const b=birds[p.index%birds.length];p.results[b.id]=val;p.index=(p.index+1)%birds.length;p.revealed=false;save();render()}}
  }
  if(state.tab==='match'){
    const m=state.match;
    document.querySelectorAll('[data-player]').forEach(x=>x.onchange=()=>{m.players[+x.dataset.player]=x.value.trim()||`Player ${+x.dataset.player+1}`;save();render()});
    document.querySelectorAll('[data-award]').forEach(x=>x.onclick=()=>{if(m.awards[x.dataset.award]!==undefined)return;snapshot();const i=+x.dataset.speaker;m.awards[x.dataset.award]=i;m.scores[i]++;m.message=`Point to ${m.players[i]}`;save();render()});
    for(const [id,msg] of [['next','Next naming turn'],['pass','Turn passed']]){const x=document.querySelector('#'+id);if(x)x.onclick=()=>{snapshot();m.turn=1-m.turn;nextBird();m.awards={};m.message=msg;save();render()}}
    const undo=document.querySelector('#undo');if(undo)undo.onclick=()=>{const prior=m.history.pop();if(prior){Object.assign(m,prior);m.message='Last action undone';save();render()}};
    const end=document.querySelector('#end');if(end)end.onclick=()=>{snapshot();m.ended=true;m.message='';save();render()};
    const resume=document.querySelector('#resume');if(resume)resume.onclick=()=>{m.ended=false;save();render()};
    const n=document.querySelector('#new');if(n)n.onclick=()=>{state.match={...fresh().match,players:[...m.players]};save();render()};
  }
}
render();
