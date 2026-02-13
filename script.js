// ฟังก์ชันสำหรับเปลี่ยนหน้า
function nextPage(num) {
    // ซ่อนทุกหน้า
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // แสดงเฉพาะหน้าเป้าหมาย
    const targetId = num === 4.5 ? 'page4.5' : 'page' + num;
    const target = document.getElementById(targetId);
    if(target) target.classList.add('active');
    
    // สั่งรันโค้ดเฉพาะทางในแต่ละหน้า
    if(num === 4) startTimer();
    if(num === 4.5) startChat();
    if(num === 5) initPuzzle();
    if(num === 7) initScratch();
}

// ฟังก์ชันเปิดซองจดหมาย
function openEnvelope() {
    const wrapper = document.getElementById('env-wrap');
    // ถ้ายังไม่ได้เปิด ให้ทำการเปิด
    if (!wrapper.classList.contains('open')) {
        wrapper.classList.add('open');
        document.getElementById('click-hint').style.opacity = '0';
        
        // สร้างเอฟเฟกต์หัวใจกระจายหลังจากซองเริ่มแยก (0.7 วินาที)
        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                setTimeout(createHeart, i * 50);
            }
        }, 700);
    }
}

// ฟังก์ชันสร้างหัวใจพุ่งกระจาย
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'heart';
    // สุ่มทิศทางที่จะพุ่งไป
    const x = (Math.random() - 0.5) * 400;
    const y = -(Math.random() * 300 + 150);
    heart.style.setProperty('--x', `${x}px`);
    heart.style.setProperty('--y', `${y}px`);
    // ตั้งตำแหน่งเริ่มต้นที่กลางซอง
    heart.style.left = '50%'; heart.style.top = '40%';
    document.getElementById('page1').appendChild(heart);
    // ลบหัวใจออกเมื่อจบแอนิเมชัน (ป้องกันเครื่องอืด)
    setTimeout(() => heart.remove(), 1500);
}

// ฟังก์ชันอื่นๆ (Timer, Chat, Puzzle) ใส่ตามโครงเดิมได้เลยครับ
