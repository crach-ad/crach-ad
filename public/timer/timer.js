
(()=>{
const root=document.getElementById('conference-bell'),q=s=>root.querySelector(s);
let running=false,elapsed=0,anchor=0,demo=false,baseSession=1,audio=null,lastPhaseIndex=0,demoDone=false;
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');
// Clip the original crest into triangles so every fragment retains its artwork.
const svgNS='http://www.w3.org/2000/svg',logo=q('.logo'),defs=q('.logo defs');
function svgElement(tag,attributes){const el=document.createElementNS(svgNS,tag);Object.entries(attributes).forEach(([key,value])=>el.setAttribute(key,value));return el;}
const fragments=svgElement('g',{'aria-hidden':'true'}),pieces=[];
logo.append(fragments);
for(let row=0;row<8;row++)for(let col=0;col<6;col++)for(let half=0;half<2;half++){
 const x=104+col*190/6,y=17+row*280/8,w=190/6,h=280/8,id='crest-piece-'+pieces.length;
 const clip=svgElement('clipPath',{id,clipPathUnits:'userSpaceOnUse'});
 clip.append(svgElement('polygon',{points:half?`${x+w},${y} ${x+w},${y+h} ${x},${y+h}`:`${x},${y} ${x+w},${y} ${x},${y+h}`}));defs.append(clip);
 const group=svgElement('g',{});group.append(svgElement('use',{href:'#conference-school-logo','clip-path':`url(#${id})`}));fragments.append(group);
 const i=pieces.length,cx=x+w/2,cy=y+h/2;
 pieces.push({group,cx,cy,dx:(cx-199)*.65+Math.sin(i*2.4)*22,dy:(cy-157)*.35+Math.cos(i*1.7)*20,angle:Math.sin(i*3.1)*65,delay:(i%9)*.012});
}
const clamp=n=>Math.max(0,Math.min(1,n)),smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
function renderCrest(s,fill){
 q('[data-logo-base]').style.display=s.rotation?'none':'';
 q('[data-logo-progress]').style.display=s.rotation?'none':'';
 fragments.style.display=s.rotation?'':'none';
 q('[data-logo-fill]').setAttribute('y',251-230*fill);q('[data-logo-fill]').setAttribute('height',230*fill);
 if(s.rotation)pieces.forEach(p=>{
  // Drift apart, then snap home over six seconds near the end, with one second to settle.
  const spread=smooth((s.fraction-p.delay)/.42)*(1-smooth((s.fraction-.86-p.delay*.3)/.09));
  const motion=reduced?.matches?0:spread;
  p.group.setAttribute('transform',`translate(${p.dx*motion} ${p.dy*motion}) rotate(${p.angle*motion} ${p.cx} ${p.cy})`);
  p.group.setAttribute('opacity',1-spread*(reduced?.matches ? .25 : .35));
 });
 logo.setAttribute('aria-label',s.rotation?'School crest breaking into fragments and reassembling before the next meeting':'School crest filling during the four-minute meeting');
}
function timing(){return demo?{meeting:10000,rotation:5000,cycle:15000}:{meeting:240000,rotation:60000,cycle:300000};}
function currentElapsed(){return running?Math.max(0,Date.now()-anchor):elapsed;}
function snapshot(){const t=timing(),e=currentElapsed(),round=Math.floor(e/t.cycle),within=e%t.cycle,rotation=within>=t.meeting;return {t,e,round,rotation,phaseIndex:round*2+(rotation?1:0),fraction:rotation?(within-t.meeting)/t.rotation:within/t.meeting};}
const storageKey='conference-timer-v5';
function save(){const s=snapshot();try{localStorage.setItem(storageKey,JSON.stringify({modelContent:{sound:q('[data-sound]').checked,awake:q('[data-awake]').checked,session:baseSession+(demo?0:s.round)},privateContent:{version:5,running,elapsed:s.e,anchor,demo,baseSession}}));}catch{}}
function restore(state){const m=state?.modelContent,p=state?.privateContent;if(m){baseSession=Math.max(1,Math.floor(Number(m.session)||1));q('[data-sound]').checked=m.sound!==false;q('[data-awake]').checked=m.awake!==false;}if(p?.version===5&&Number.isFinite(p.elapsed)&&p.elapsed>=0){demo=!!p.demo;elapsed=p.elapsed;baseSession=Math.max(1,Math.floor(Number(p.baseSession)||baseSession));running=!!p.running&&Number.isFinite(p.anchor);anchor=p.anchor||0;}lastPhaseIndex=snapshot().phaseIndex;render(false);}
function prepareAudio(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)throw Error();if(!audio)audio=new C();audio.resume().catch(()=>q('[data-notice]').textContent='Audio unavailable. The visual timer will continue.');}catch{q('[data-notice]').textContent='Audio unavailable. The visual timer will continue.';}}
function bell(rotation=true){if(!q('[data-sound]').checked)return;prepareAudio();if(!audio)return;const now=audio.currentTime;const notes=rotation?[0,.65,1.3]:[0,.45];notes.forEach(delay=>{[660,1320,1980].forEach((freq,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=rotation?freq:freq*1.25;g.gain.setValueAtTime(0,now+delay);g.gain.linearRampToValueAtTime(.16/(i+1),now+delay+.008);g.gain.exponentialRampToValueAtTime(.0001,now+delay+1.6);o.connect(g);g.connect(audio.destination);o.start(now+delay);o.stop(now+delay+1.7);});});}
const clockFormat=new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',hour12:true});
let lastClockMinute=-1;
function render(allowBell=true){
const clockMinute=Math.floor(Date.now()/60000);
if(clockMinute!==lastClockMinute){lastClockMinute=clockMinute;const label=clockFormat.format(Date.now());q('[data-clock]').textContent=label;q('[data-clock]').setAttribute('aria-label','Current local time: '+label);}
let s=snapshot();if(demo&&s.e>=s.t.cycle){if(allowBell&&running)bell(false);running=false;elapsed=0;demo=false;demoDone=true;lastPhaseIndex=0;s=snapshot();if(allowBell)save();}
if(s.phaseIndex!==lastPhaseIndex){if(allowBell&&running)bell(s.rotation);lastPhaseIndex=s.phaseIndex;if(allowBell)save();}
const fill=s.rotation?1-s.fraction:s.fraction,seconds=Math.ceil((s.rotation?60:240)*(1-s.fraction)-1e-9);
q('[data-time]').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');q('[data-phase]').textContent=(demo?'Demo · ':'')+(s.rotation?'Rotation':'Meeting');
q('[data-status]').textContent=!running&&s.e===0?(demoDone?'Demo complete. Ready to begin.':''):!running?'Paused — resume when ready.':s.rotation?'Time to move to your next meeting.':seconds<=30?'30 seconds — wrap up.':'';
root.classList.toggle('warning',running&&!s.rotation&&seconds<=30);root.classList.toggle('is-running',running);if(!running)root.classList.remove('controls-quiet');
q('[data-start]').textContent=running?'Pause':s.e>0?'Resume':'Start meetings';q('[data-session]').textContent=baseSession+(demo?0:s.round);

renderCrest(s,fill);
}
function reset(){const s=snapshot();baseSession+=demo?0:s.round;running=false;elapsed=0;demo=false;demoDone=false;lastPhaseIndex=0;render();save();syncWake();reveal();}
q('[data-start]').onclick=()=>{render();if(q('[data-sound]').checked)prepareAudio();if(running){elapsed=currentElapsed();running=false;}else{anchor=Date.now()-elapsed;running=true;demoDone=false;}render();save();syncWake();reveal();};q('[data-reset]').onclick=reset;
q('[data-sound]').onchange=()=>{if(q('[data-sound]').checked)prepareAudio();save();};q('[data-test]').onclick=()=>{q('[data-sound]').checked=true;bell();save();};
q('[data-demo]').onclick=()=>{const s=snapshot();baseSession+=demo?0:s.round;demo=true;demoDone=false;elapsed=0;anchor=Date.now();running=true;lastPhaseIndex=0;if(q('[data-sound]').checked)prepareAudio();render();save();syncWake();reveal();};
q('[data-preview-rotation]').onclick=()=>{demo=true;demoDone=false;elapsed=10000;anchor=Date.now()-elapsed;running=true;lastPhaseIndex=1;render(false);save();syncWake();q('.settings').open=false;reveal();};
q('[data-test-start]').onclick=()=>{q('[data-sound]').checked=true;bell(false);save();};
let wake=null,wakePending=false,idleTimer;
async function syncWake(){
 const wanted=running&&q('[data-awake]').checked&&document.visibilityState==='visible';
 if(!wanted){if(wake){const old=wake;wake=null;await old.release().catch(()=>{});}q('[data-awake-status]').textContent=q('[data-awake]').checked?'Screen awake while running':'Screen awake off';return;}
 if(!navigator.wakeLock){q('[data-awake-status]').textContent='Screen awake unavailable in this browser';return;}
 if(wake||wakePending)return;
 wakePending=true;
 try{const lock=await navigator.wakeLock.request('screen');
 if(!running||!q('[data-awake]').checked||document.visibilityState!=='visible'){await lock.release();return;}
 wake=lock;q('[data-awake-status]').textContent='Screen awake is active';
 lock.addEventListener('release',()=>{if(wake===lock){wake=null;q('[data-awake-status]').textContent='Screen awake released by browser';}});
 }catch{q('[data-awake-status]').textContent='Screen awake unavailable — check device settings';}finally{wakePending=false;}
}
q('[data-awake]').onchange=()=>{syncWake();save();};
document.addEventListener('visibilitychange',()=>{render();syncWake();});
q('[data-fullscreen]').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else q('[data-notice]').textContent='Fullscreen is unavailable in this browser.';}catch{q('[data-notice]').textContent='Fullscreen is unavailable in this browser.';}};
document.addEventListener('fullscreenchange',()=>{const active=!!document.fullscreenElement;q('[data-fullscreen]').textContent=active?'Exit fullscreen':'Fullscreen';q('[data-fullscreen]').setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');reveal();});
function reveal(){root.classList.remove('controls-quiet');clearTimeout(idleTimer);if(running)idleTimer=setTimeout(()=>{if(!q('.settings').open)root.classList.add('controls-quiet');},3500);}
root.addEventListener('pointermove',reveal);root.addEventListener('pointerdown',reveal);root.addEventListener('focusin',reveal);q('.settings').addEventListener('toggle',reveal);
document.addEventListener('keydown',e=>{reveal();if(e.key==='Escape')q('.settings').open=false;if(e.code==='Space'&&!e.repeat&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.target.closest('button,input,summary,select,textarea,[contenteditable]')){e.preventDefault();q('[data-start]').click();}});
document.addEventListener('pointerdown',e=>{if(!q('.settings').contains(e.target))q('.settings').open=false;});
let saved=null;try{saved=JSON.parse(localStorage.getItem(storageKey));}catch{}
restore(saved);render(false);syncWake();reveal();setInterval(()=>{const wasRunning=running;render();if(wasRunning!==running)syncWake();},50);
})();
