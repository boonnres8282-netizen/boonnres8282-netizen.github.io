function openEnvelope() {
    const wrap = document.getElementById('env-wrap');
    if (!wrap.classList.contains('open')) {
        wrap.classList.add('open');
        document.getElementById('click-hint').style.display = 'none';
    }
}

function nextPage(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = (num === 4.5) ? 'page4.5' : 'page' + num;
    document.getElementById(target).classList.add('active');
    
    if (num === 4) startTimer();
    if (num === 4.5) startChat();
    if (num === 5) initPuzzle();
    if (num === 7) initScratch();
}

function checkPass() {
    if (document.getElementById('pass-input').value === "1402") nextPage(4);
    else alert("ลองรหัสใหม่อีกครั้งนะ!");
}

function startTimer() {
    const start = new Date('2024-02-14T00:00:00');
    setInterval(() => {
        const diff = new Date() - start;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('timer').innerText = days + " วันแล้วที่รักกัน";
    }, 1000);
}

const msgs = [{t: "ดีครับ", s: "left"}, {t: "ดีค่าา", s: "right"}, {t: "ปามมี่ใช่ป่าว", s: "right"}, {t: "ใช่ค่ะะ", s: "left"}];
function startChat() {
    const box = document.getElementById('chat-box'); if(box.children.length > 0) return;
    let i = 0; const itv = setInterval(() => {
        if(i < msgs.length) {
            const b = document.createElement('div'); b.className = `bubble ${msgs[i].s}`; b.innerText = msgs[i].t;
            box.appendChild(b); setTimeout(() => b.classList.add('show'), 50); i++;
        } else { clearInterval(itv); document.getElementById('chat-next').style.display = 'block'; }
    }, 1000);
}

function initPuzzle() {
    const board = document.getElementById('puzzle-board'); if(board.children.length > 0) return;
    let solved = 0;
    for(let i=0; i<9; i++) {
        const p = document.createElement('div'); p.className = 'puzzle-piece';
        p.style.backgroundImage = `url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300')`;
        p.style.backgroundPosition = `${-(i%3)*100}px ${-Math.floor(i/3)*100}px`;
        p.style.left = Math.random()*200+'px'; p.style.top = Math.random()*200+'px';
        p.onmousedown = p.ontouchstart = (e) => {
            const moveEv = e.type==='mousedown'?'mousemove':'touchmove';
            const onMove = (me) => {
                let cx = me.clientX || me.touches[0].clientX, cy = me.clientY || me.touches[0].clientY;
                let r = board.getBoundingClientRect(); p.style.left = (cx-r.left-50)+"px"; p.style.top = (cy-r.top-50)+"px";
            };
            document.addEventListener(moveEv, onMove);
            document.onmouseup = document.ontouchend = () => {
                document.removeEventListener(moveEv, onMove);
                const tx = (i%3)*100, ty = Math.floor(i/3)*100;
                if(Math.abs(parseInt(p.style.left)-tx)<30 && Math.abs(parseInt(p.style.top)-ty)<30) {
                    p.style.left = tx+'px'; p.style.top = ty+'px'; p.style.pointerEvents="none"; solved++;
                    if(solved === 9) document.getElementById('puzzle-next').style.display='block';
                }
            };
        };
        board.appendChild(p);
    }
}

function initScratch() {
    const canvas = document.getElementById('scratch-canvas'); const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#C0C0C0'; ctx.fillRect(0, 0, 300, 150); ctx.globalCompositeOperation = 'destination-out';
    const scratch = (e) => {
        const r = canvas.getBoundingClientRect();
        const cx = (e.clientX || (e.touches && e.touches[0].clientX)) - r.left;
        const cy = (e.clientY || (e.touches && e.touches[0].clientY)) - r.top;
        ctx.beginPath(); ctx.arc(cx, cy, 20, 0, 6.28); ctx.fill();
    };
    canvas.addEventListener('mousemove', scratch); canvas.addEventListener('touchmove', scratch);
}
