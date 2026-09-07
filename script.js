document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Theme Toggle (Day/Night Mode) ---
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        } else {
            themeBtn.textContent = '🌙';
            themeBtn.setAttribute('aria-label', 'Toggle Night Mode');
        }
    });

    // --- 2. Skeuomorphic Audio Player Toggle ---
    const playBtn = document.getElementById('playBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const timeDisplay = document.getElementById('timeDisplay');
    let isPlaying = false;
    let timeInterval;
    let seconds = 0;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audioPlayer.classList.add('is-playing');
            playBtn.textContent = '⏸';
            timeInterval = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }, 1000);
        } else {
            audioPlayer.classList.remove('is-playing');
            playBtn.textContent = '▶';
            clearInterval(timeInterval);
        }
    });

    // --- 3. Magnetic Hover & 3D Tilt Elements ---
    const magneticElems = document.querySelectorAll('.magnetic-elem, .tilt-card');

    magneticElems.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            if (elem.classList.contains('tilt-card') || elem.classList.contains('tilt-box')) {
                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;
                elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            } else {
                const deltaX = (x - centerX) * 0.3;
                const deltaY = (y - centerY) * 0.3;
                elem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            elem.style.transform = elem.classList.contains('tilt-card') || elem.classList.contains('tilt-box') 
                ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' 
                : 'translate(0px, 0px)';
            
            setTimeout(() => {
                elem.style.transition = ''; 
            }, 600);
        });
    });

    // --- 4. Pixel Grid Dissolve Canvas (Laboratory Sandbox) ---
    const canvas = document.getElementById('pixelCanvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        const cols = 20; const rows = 10;
        const blockW = canvas.width / cols;
        const blockH = canvas.height / rows;

        function drawGrid(opacityLimit) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (Math.random() < opacityLimit) {
                        ctx.fillStyle = `rgba(56, 189, 248, ${Math.random() * 0.8 + 0.2})`;
                        ctx.fillRect(i * blockW, j * blockH, blockW, blockH);
                    }
                }
            }
        }
        
        drawGrid(0.9); 

        const pixelContainer = document.getElementById('pixelContainer');
        let dissolveInterval;

        pixelContainer.addEventListener('mouseenter', () => {
            let opacity = 0.9;
            clearInterval(dissolveInterval);
            dissolveInterval = setInterval(() => {
                opacity -= 0.1;
                drawGrid(Math.max(opacity, 0.1));
                if (opacity <= 0.1) clearInterval(dissolveInterval);
            }, 50);
        });

        pixelContainer.addEventListener('mouseleave', () => {
            let opacity = 0.1;
            clearInterval(dissolveInterval);
            dissolveInterval = setInterval(() => {
                opacity += 0.1;
                drawGrid(Math.min(opacity, 0.9));
                if (opacity >= 0.9) clearInterval(dissolveInterval);
            }, 50);
        });
    }

    // --- 5. Neon Spotlight & Ripple (Laboratory Sandbox) ---
    const neonStage = document.getElementById('neonStage');
    const spotlight = document.getElementById('spotlight');

    if (neonStage && spotlight) {
        neonStage.addEventListener('mousemove', (e) => {
            const rect = neonStage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.transform = `translate(${x}px, ${y}px)`;
        });

        neonStage.addEventListener('click', (e) => {
            const rect = neonStage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            neonStage.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // --- 6. Fixed Scroll-Driven Animation Tracker ---
    const scrollTracker = document.getElementById('scrollTracker');
    const scrollStage = document.getElementById('scrollStage');
    
    if (scrollTracker && scrollStage) {
        window.addEventListener('scroll', () => {
            // Get scroll percentage
            const scrollPos = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollPos / maxScroll);
            
            // Calculate maximum movement inside the small container card
            const stageWidth = scrollStage.offsetWidth;
            const trackerWidth = scrollTracker.offsetWidth;
            const maxMove = stageWidth - trackerWidth - 32; // 32px accounts for padding
            
            const moveAmount = scrollPercent * maxMove; 
            
            scrollTracker.style.transform = `translateX(${moveAmount}px)`;
        });
    }
});