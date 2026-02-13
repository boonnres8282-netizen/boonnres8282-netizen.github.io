function nextPage(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetId = num === 4.5 ? 'page4.5' : 'page' + num;
    document.getElementById(targetId).classList.add('active');
    
    if(num === 4) startTimer();
    if(num === 4.5) startChat();
    if(num === 5) initPuzzle();
    if(num === 7) initScratch();
}

function openEnvelope() {
    const wrapper = document.getElementById('env-wrap');
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
        document.getElementById('click-hint').style.opacity = '0';
        
        // รอให้ซองเปิดจนสุดก่อนค่อยพ่นหัวใจ (0.8 วินาที)
        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                setTimeout(createHeart, i * 50);
            }
        }, 800);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart';
    const x = (Math.random() - 0.5) * 450;
    const y = -(Math.random() * 350 + 200);
    heart.style.setProperty('--x', `${x}px`);
    heart.style.setProperty('--y', `${y}px`);
    heart.style.left = '50%'; heart.style.top = '40%';
    document.getElementById('page1').appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

function increaseYes() {
    const yes = document.getElementById('btn-yes');
    const no = document.getElementById('btn-no');
    const currentScale = parseFloat(yes.style.transform.replace('scale(', '').replace(')', '')) || 1;
    const newScale = currentScale + 1.2;
    yes.style.transform = `scale(${newScale})`;
    if(newScale > 5) {
        no.style.display = 'none';
        yes.style.position = 'fixed'; yes.style.top = '0'; yes.style.left = '0';
        yes.style.width = '100vw'; yes.style.height = '100vh'; yes.style.zIndex = '999';
    }
}

function checkPass() {
    const val = document.getElementById('pass-input').value;
    if(val === "1402") { nextPage(4); }
    else { document.getElementById('pass-hint').innerText = "ผิดครับ! ใบ้ให้: วันนี้วันอะไร?"; }
}

function startTimer() {
    const startDate = new Date('2025-02-14T00:00:00'); // แก้ไขวันที่เริ่มคุยกันตรงนี้
    setInterval(() => {
        const diff = new Date() - startDate;
        document.getElementById('d').innerText = Math.floor(diff / 86400000);
        document.getElementById('h').innerText = Math.floor((diff / 3600000) % 24);
        document.getElementById('m').innerText = Math.floor((diff / 60000) % 60);
        document.getElementById('s').innerText = Math.floor((diff / 1000) % 60);
    }, 1000);
}

const msgs = [{t: "😊", s: "right"}, {t: "ดีครับบ", s: "left"}, {t: "ดีค้าบ", s: "right"}, {t: "ชื่ออาราย", s: "right"}, {t: "ปามมี่ค้าบบ", s: "left"}, {t: "หวัดดีแบงค์", s: "left"}, {t: "น่ารักงับบ", s: "right"}];
function startChat() {
    const box = document.getElementById('chat-box'); if(box.children.length > 0) return;
    let i = 0; const itv = setInterval(() => {
        if(i < msgs.length) {
            const b = document.createElement('div'); b.className = `bubble ${msgs[i].s}`; b.innerText = msgs[i].t;
            box.appendChild(b); setTimeout(() => b.classList.add('show'), 50); box.scrollTop = box.scrollHeight; i++;
        } else { clearInterval(itv); document.getElementById('chat-next').style.display = 'block'; }
    }, 1200);
}

function initPuzzle() {
    const board = document.getElementById('puzzle-board'); if(board.children.length > 0) return;
    const imgUrl = "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=300&h=300&fit=crop"; 
    let solved = 0;
    for(let i=0; i<9; i++) {
        const p = document.createElement('div'); p.className = 'puzzle-piece';
        p.style.backgroundImage = `url(${imgUrl})`; p.style.backgroundPosition = `${-(i%3)*100}px ${-Math.floor(i/3)*100}px`;
        p.style.left = Math.random()*200 + 'px'; p.style.top = Math.random()*200 + 'px';
        p.onmousedown = p.ontouchstart = (e) => {
            e.preventDefault();
            let mv = e.type==='mousedown'?'mousemove':'touchmove';
            const onMove = (me) => { 
                let cx = me.clientX || me.touches[0].clientX; let cy = me.clientY || me.touches[0].clientY;
                let r = board.getBoundingClientRect(); p.style.left = (cx-r.left-50)+"px"; p.style.top = (cy-r.top-50)+"px"; 
            };
            document.addEventListener(mv, onMove);
            document.onmouseup = document.ontouchend = () => {
                document.removeEventListener(mv, onMove);
                const tx = (i%3)*100; const ty = Math.floor(i/3)*100;
                if(Math.abs(parseInt(p.style.left)-tx)<30 && Math.abs(parseInt(p.style.top)-ty)<30) {
                    p.style.left = tx+'px'; p.style.top = ty+'px'; p.style.pointerEvents="none"; solved++;
                    if(solved===9) document.getElementById('puzzle-next').style.display='block';
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
        const cx = (e.clientX || e.touches[0].clientX) - r.left;
        const cy = (e.clientY || e.touches[0].clientY) - r.top;
        ctx.beginPath(); ctx.arc(cx, cy, 25, 0, 6.28); ctx.fill();
    };
    canvas.addEventListener('mousemove', scratch); canvas.addEventListener('touchmove', scratch);
}
