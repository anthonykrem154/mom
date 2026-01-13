
const surprise = document.getElementById("surprise");
const song = document.getElementById("bdaySong");

document.getElementById("surpriseBtn").addEventListener("click", async () => {
  surprise.classList.add("show");
  popConfetti(220);


  try {
    song.currentTime = 0;
    await song.play();
  } catch (e) {

    console.log("Music blocked until user interacts again:", e);
  }
});

document.getElementById("closeSurprise").addEventListener("click", () => {
  surprise.classList.remove("show");

});



document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = document.querySelector(".message").innerText.trim();
  try {
    await navigator.clipboard.writeText(text);
    hintFlash("Copied! ✅ Paste it in iMessage/WhatsApp.");
  } catch {
    hintFlash("Copy failed (browser blocked). Highlight + Ctrl+C instead.");
  }
});

function hintFlash(msg){
  const hint = document.getElementById("hint");
  const old = hint.innerHTML;
  hint.textContent = msg;
  setTimeout(() => (hint.innerHTML = old), 2200);
}


const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let W, H;
function resize(){
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

let pieces = [];
let anim = null;

document.getElementById("confettiBtn").addEventListener("click", () => popConfetti(180));

function popConfetti(count=140){
  for(let i=0;i<count;i++){
    pieces.push({
      x: Math.random()*W,
      y: -20*devicePixelRatio,
      vx: (Math.random()*2-1) * 3 * devicePixelRatio,
      vy: (Math.random()*3+2) * devicePixelRatio,
      size: (Math.random()*6+4) * devicePixelRatio,
      rot: Math.random()*Math.PI,
      vr: (Math.random()*0.2-0.1),
      life: 0,
      max: 180 + Math.random()*80
    });
  }
  if(!anim) animate();
}

function animate(){
  anim = requestAnimationFrame(animate);
  ctx.clearRect(0,0,W,H);

  pieces = pieces.filter(p => p.life < p.max);
  for(const p of pieces){
    p.life++;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.03*devicePixelRatio;
    p.rot += p.vr;

 
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${(p.life*4 + p.size*10)%360} 90% 70%)`;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    ctx.restore();
  }

  if(pieces.length === 0){
    cancelAnimationFrame(anim);
    anim = null;
    ctx.clearRect(0,0,W,H);
  }
}


setTimeout(() => popConfetti(80), 600);
