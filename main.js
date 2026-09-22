 window.addEventListener("DOMContentLoaded", () => {
    
    if (typeof gsap === "undefined") {
        console.error("GSAP isn't loaded!");
        return;
    }

    // ================= GSAP INTRO TIMELINE =================
    const introTL = gsap.timeline({
        onComplete: () => {
            const loader = document.getElementById("introLoader");
            if (loader) loader.style.display = "none";

            // تفعيل الـ Hover Mask
            initMaskHoverEffect();
        }
    });
    

    // 1. Bounce ديال الكورة
    introTL.to("#introBall", {
        y: -80,
        duration: 0.45,
        repeat: 3,
        yoyo: true,
        ease: "power2.out"
    })
    // 2. Squash
    .to("#introBall", {
        scaleX: 1.4,
        scaleY: 0.7,
        duration: 0.15,
        ease: "power1.inOut"
    })
    // إخفاء النص KJ
    .to(".ball-text", {
        opacity: 0,
        duration: 0.1
    }, "-=0.05")
    // 3. الانفجار Explode
    .to("#introBall", {
        scale: 90,
        duration: 0.8,
        ease: "expo.inOut"
    })
    // 4. إظهار الـ Main Content
    .to("#mainContent", {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out"
    }, "-=0.3")
    .to("#introLoader", {
        opacity: 0,
        duration: 0.2
    }, "-=0.2")

    // 5. التصويرة كتحرك من اليسار للوسط
    .fromTo("#heroImageWrapper", 
        { 
            x: "-100vw",
            clipPath: "inset(0% 0% 0% 0%)"
        }, 
        { 
            x: 0,
            duration: 1.0, 
            ease: "power3.out"
        },
        "-=0.1"
    )

    // 6. الاختفاء من التحت للفوق
    .to("#heroImageWrapper", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9, 
        ease: "power2.inOut"
    }, "+=0.5")
.set("#imgBase", {
        attr: { src: "img/animekahdija 1 (1).png" } // <-- Hna ddir l-chemin dyal l-tswira l-jdiida!
    })
    // 7. تحريك التصويرة لليمين وهي مخفية
    .set("#heroImageWrapper", {
        x: 390, 
        clipPath: "inset(0% 0% 100% 0%)"
    })

    // 8. إظهار التصويرة + تشغيل أنيميشن الكتابة (Reveal + Flicker)
    .to("#heroImageWrapper", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1, 
        ease: "power2.out",
        onStart: () => {
            gsap.set("#heroText", { opacity: 1 });
            animateTextReveal();
        }
    }, "+=0.3");


    // ================= REVEAL + FLICKER TEXT ANIMATION =================
     function animateTextReveal() {
    const bgLines = document.querySelectorAll("#heroText .bg-line");

    bgLines.forEach((line) => {
        // 1. Tqti3 l-text l-Hrouf w t-dkhil-hom f-Spans
        const rawText = line.textContent;
        line.innerHTML = "";
        
        const chars = [];
        for (let char of rawText) {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.opacity = "0"; // Khaba f-l-lowel
            
            if (char === "K") {
                span.classList.add("flicker-letter");
            }
            
            span.innerText = char === " " ? "\u00A0" : char;
            line.appendChild(span);
            chars.push(span);
        }

        // 2. T-rtib 3ashwa2i dyal l-hrouf (Shuffle)
        const shuffledChars = [...chars].sort(() => Math.random() - 0.5);

        // 3. Double Flicker Animation (Ytfa w Ych3el 2 times 3ad y-thbet)
        shuffledChars.forEach((charEl, index) => {
            const tl = gsap.timeline({ delay: index * 0.04 });

            tl// --- First Flicker (Mera lowla) ---
              .to(charEl, { opacity: 0.9, filter: "blur(3px)", duration: 0.04 })
              .to(charEl, { opacity: 0.1, filter: "blur(0px)", duration: 0.03 })
              
              // --- Second Flicker (Mera thanya - bad bulb) ---
              .to(charEl, { opacity: 1, filter: "blur(5px)", duration: 0.06 })
              .to(charEl, { opacity: 0, filter: "blur(1px)", duration: 0.04 })
              .to(charEl, { opacity: 0.8, filter: "blur(0px)", duration: 0.03 })
              .to(charEl, { opacity: 0.1, filter: "blur(2px)", duration: 0.04 })

              // --- Final Reveal (Kay-thbet m9ad) ---
              .to(charEl, { 
                  opacity: 1, 
                  filter: "blur(0px)", 
                  duration: 0.08,
                  onComplete: () => {
                      // F-l-lkhir dyal animation, t-khlli gha K y-b9a y-flickeri
                      if (index === shuffledChars.length - 1) {
                          initKFlickerOnly();
                      }
                  }
              });
        });
    });
}

// Function dyal flicker l-khasse b-harf K bohdou f-l-lkhir
function initKFlickerOnly() {
    const kLetters = document.querySelectorAll(".flicker-letter");
    if (!kLetters.length) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    tl.to(kLetters, { opacity: 0.1, duration: 0.05 })
      .to(kLetters, { opacity: 1, duration: 0.04 })
      .to(kLetters, { opacity: 0.2, filter: "blur(2px)", duration: 0.08 })
      .to(kLetters, { opacity: 1, filter: "blur(0px)", duration: 0.05 })
      .to(kLetters, { opacity: 0, duration: 0.03 })
      .to(kLetters, { opacity: 1, duration: 0.09 });
}

    // ================= MASK HOVER REVEAL EFFECT =================
    function initMaskHoverEffect() {
        var container  = document.getElementById('revealContainer');
        var maskPath   = document.getElementById('maskPath');
        var cursorDot  = document.getElementById('cursorDot');

        if (!container || !maskPath) return;

        var rect = container.getBoundingClientRect();
        var target = { x: 0.5, y: 0.5 };
        var current = { x: 0.5, y: 0.5 };
        var hovering = false;
        var scaleTarget = 0;
        var scaleCurrent = 0;
        var rafId = null;
        var t = 0;

        var LERP_POS = 0.05; 
        var LERP_SCALE = 0.08;

        function lerp(a, b, n) { return a + (b - a) * n; }
        function updateRect() { rect = container.getBoundingClientRect(); }

        window.addEventListener('resize', updateRect);

        var POINTS = 10;
        var seeds = [];
        for (var i = 0; i < POINTS; i++) {
            seeds.push({
                freq1: 0.6 + Math.random() * 0.9,
                freq2: 1.3 + Math.random() * 1.4,
                phase1: Math.random() * Math.PI * 2,
                phase2: Math.random() * Math.PI * 2,
                ampMix: 0.4 + Math.random() * 0.6
            });
        }

        function blobRadius(index, time, baseR, noiseAmp) {
            var s = seeds[index];
            var n1 = Math.sin(time * s.freq1 + s.phase1);
            var n2 = Math.sin(time * s.freq2 + s.phase2);
            var noise = (n1 * s.ampMix + n2 * (1 - s.ampMix));
            return baseR + noise * noiseAmp;
        }

        function pointsToSmoothPath(pts) {
            var n = pts.length;
            var d = 'M ' + pts[0].x.toFixed(4) + ' ' + pts[0].y.toFixed(4) + ' ';
            for (var i = 0; i < n; i++) {
                var p0 = pts[(i - 1 + n) % n];
                var p1 = pts[i];
                var p2 = pts[(i + 1) % n];
                var p3 = pts[(i + 2) % n];

                var c1x = p1.x + (p2.x - p0.x) / 6;
                var c1y = p1.y + (p2.y - p0.y) / 6;
                var c2x = p2.x - (p3.x - p1.x) / 6;
                var c2y = p2.y - (p3.y - p1.y) / 6;

                d += 'C ' + c1x.toFixed(4) + ' ' + c1y.toFixed(4) + ', ' +
                            c2x.toFixed(4) + ' ' + c2y.toFixed(4) + ', ' +
                            p2.x.toFixed(4) + ' ' + p2.y.toFixed(4) + ' ';
            }
            d += 'Z';
            return d;
        }

        function buildBlobPath(cx, cy, baseR, noiseAmp, time, aspect) {
            var pts = [];
            for (var i = 0; i < POINTS; i++) {
                var angle = (i / POINTS) * Math.PI * 2;
                var r = blobRadius(i, time, baseR, noiseAmp);
                var x = cx + Math.cos(angle) * r;
                var y = cy + Math.sin(angle) * r * aspect;
                pts.push({ x: x, y: y });
            }
            return pointsToSmoothPath(pts);
        }

        function frame() {
            t += 0.008;

            current.x = lerp(current.x, target.x, LERP_POS);
            current.y = lerp(current.y, target.y, LERP_POS);
            scaleCurrent = lerp(scaleCurrent, scaleTarget, LERP_SCALE);

            if (scaleCurrent > 0.001) {
                var aspect = rect.width / rect.height;
                var baseR = 0.38 * scaleCurrent; 
                var noiseAmp = 0.09 * scaleCurrent;

                var d = buildBlobPath(current.x, current.y, baseR, noiseAmp, t, aspect);
                maskPath.setAttribute('d', d);

                if (cursorDot) {
                    cursorDot.style.transform =
                        'translate(' + (current.x * rect.width) + 'px, ' + (current.y * rect.height) + 'px) scale(' + scaleCurrent + ')';
                }
            } else {
                maskPath.setAttribute('d', '');
            }

            rafId = requestAnimationFrame(frame);
        }

        container.addEventListener('mouseenter', function () {
            updateRect();
            hovering = true;
            scaleTarget = 1;
            container.classList.add('is-hovering');
            if (!rafId) frame();
        });

        container.addEventListener('mousemove', function (e) {
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            target.x = Math.min(1, Math.max(0, x));
            target.y = Math.min(1, Math.max(0, y));
        });

        container.addEventListener('mouseleave', function () {
            hovering = false;
            scaleTarget = 0;
            container.classList.remove('is-hovering');
        });

        frame();
    }

});


 
 // تشغيل الفليكر ديال K بوحدو بلا ما يقيس باقي النص
function initKFlickerOnly() {
    const kLetter = document.querySelector(".flicker-letter");
    if (!kLetter) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

    tl.to(kLetter, { opacity: 0.1, duration: 0.05 })
      .to(kLetter, { opacity: 1, duration: 0.04 })
      .to(kLetter, { opacity: 0.2, filter: "blur(2px)", duration: 0.08 })
      .to(kLetter, { opacity: 1, filter: "blur(0px)", duration: 0.05 })
      .to(kLetter, { opacity: 0, duration: 0.03 })
      .to(kLetter, { opacity: 1, duration: 0.09 });
}

// عيط عليها فاش يسالي اللودر أو فـ اللخر ديال main.js
initKFlickerOnly();

 

function animateHeroSequence() {
    const bgLines = document.querySelectorAll("#heroText .bg-line");
    if (bgLines.length < 2) return;

    const line1 = bgLines[0]; // Line 1: MY NAME IS
    const line2 = bgLines[1]; // Line 2: KHADIJA JAMAL / A DESIGNER / A CREATIVE

    // Helper Function: Split Text to Spans
    function splitToSpans(element, text, isOutlined = false) {
        element.innerHTML = "";
        if (isOutlined) {
            element.classList.add("outlined-text");
        } else {
            element.classList.remove("outlined-text");
        }

        const chars = [];
        for (let char of text) {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.opacity = "0";
            if (char === "K") span.classList.add("flicker-letter");
            span.innerText = char === " " ? "\u00A0" : char;
            element.appendChild(span);
            chars.push(span);
        }
        return chars;
    }

    // Function dyal Flicker In (Random Reveal)
    function flickerIn(chars, onComplete) {
        const shuffled = [...chars].sort(() => Math.random() - 0.5);
        shuffled.forEach((charEl, index) => {
            gsap.timeline({
                delay: index * 0.03,
                onComplete: () => {
                    if (index === shuffled.length - 1 && onComplete) onComplete();
                }
            })
            .to(charEl, { opacity: 0.8, filter: "blur(3px)", duration: 0.04 })
            .to(charEl, { opacity: 0.1, filter: "blur(0px)", duration: 0.03 })
            .to(charEl, { opacity: 1, filter: "blur(4px)", duration: 0.05 })
            .to(charEl, { opacity: 0, filter: "blur(1px)", duration: 0.03 })
            .to(charEl, { opacity: 1, filter: "blur(0px)", duration: 0.07 });
        });
    }

    // Function dyal Flicker Out (Random Hide)
    function flickerOut(chars, onComplete) {
        const shuffled = [...chars].sort(() => Math.random() - 0.5);
        shuffled.forEach((charEl, index) => {
            gsap.timeline({
                delay: index * 0.02,
                onComplete: () => {
                    if (index === shuffled.length - 1 && onComplete) onComplete();
                }
            })
            .to(charEl, { opacity: 0.3, filter: "blur(3px)", duration: 0.04 })
            .to(charEl, { opacity: 0.9, filter: "blur(0px)", duration: 0.03 })
            .to(charEl, { opacity: 0, filter: "blur(4px)", duration: 0.05 });
        });
    }

    // Array dyal l-steps
    const items = [
        { text: "KHADIJA JAMAL", outlined: false },
        { text: "A DESIGNER", outlined: true },
        { text: "A CREATIVE", outlined: true }
    ];

    let currentIndex = 0;

    function playLoopStep() {
        const currentItem = items[currentIndex];

        // Prepare both lines
        const chars1 = splitToSpans(line1, "MY NAME IS", false);
        const chars2 = splitToSpans(line2, currentItem.text, currentItem.outlined);

        // Flicker In Line 1 & Line 2
        flickerIn(chars1);
        flickerIn(chars2, () => {
            // Khlli l-joumla باينة 2.5s
            gsap.delayedCall(2.5, () => {
                // Flicker Out Line 1 & Line 2
                flickerOut(chars1);
                flickerOut(chars2, () => {
                    // Mchiy l-step li mn wraha
                    currentIndex = (currentIndex + 1) % items.length;
                    playLoopStep();
                });
            });
        });
    }

    // Start Full Loop Sequence
    playLoopStep();
}

window.addEventListener("DOMContentLoaded", animateHeroSequence);
 

// --- 1. Sparkle / Particle Burst System (Optimisé) ---
const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

let particles = [];
const fireColors = ["#FFD700", "#FFA500", "#FF4500", "#FFEE58"];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2.5 + 1; // Hagm sghir shwiya باش y-kon khfif
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = Math.random() * -2;
        this.gravity = 0.2;
        this.opacity = 1;
        this.color = fireColors[(Math.random() * fireColors.length) | 0];
    }

    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.028; // Kiy-ghber asra3 باش ما y-trakmosh
    }

    draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function triggerSparkleBurst() {
    if (!canvas || !ctx) return;
    
    const heroText = document.getElementById("heroText");
    if (!heroText) return;
    const rect = heroText.getBoundingClientRect();

    // N9ssna 3dad l-particles l-40 bash y-b9a l-performance top
    for (let i = 0; i < 40; i++) {
        const randomX = rect.left + Math.random() * rect.width;
        const randomY = rect.top + Math.random() * rect.height;
        particles.push(new Particle(randomX, randomY));
    }
}

function renderParticles() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Zidna lighter hna d9a wehda blash ctx.save/restore f-kull particle
        ctx.globalCompositeOperation = "lighter";
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();
            if (p.opacity <= 0) particles.splice(i, 1);
        }
    }
    requestAnimationFrame(renderParticles);
}
renderParticles();


// --- 2. GSAP Sequence & Optimisation ---
function animateHeroSequence() {
    const bgLines = document.querySelectorAll("#heroText .bg-line");
    if (bgLines.length < 2) return;

    const line1 = bgLines[0];
    const line2 = bgLines[1];

    function splitToSpans(element, text, isOutlined = false) {
        element.innerHTML = "";
        if (isOutlined) {
            element.classList.add("outlined-text");
        } else {
            element.classList.remove("outlined-text");
        }

        const chars = [];
        for (let char of text) {
            const span = document.createElement("span");
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.willChange = "opacity, transform"; // Key-3awen l-GPU
            if (char === "K") span.classList.add("flicker-letter");
            span.innerText = char === " " ? "\u00A0" : char;
            element.appendChild(span);
            chars.push(span);
        }
        return chars;
    }

    // Combined flickerIn bash ma y-triggerish l-burst 2 fois
    function flickerInCombined(chars1, chars2, onComplete) {
        triggerSparkleBurst(); // Sparkle Burst mra wehda f-l-dkhla

        const allChars = [...chars1, ...chars2].sort(() => Math.random() - 0.5);

        allChars.forEach((charEl, index) => {
            gsap.timeline({
                delay: index * 0.02, // Dkhla asra3 w-asless
                onComplete: () => {
                    if (index === allChars.length - 1 && onComplete) onComplete();
                }
            })
            // N9ssna mn l-blur hith huwa li kiy-t9el l-animation
            .to(charEl, { opacity: 0.8, duration: 0.03 })
            .to(charEl, { opacity: 0.1, duration: 0.02 })
            .to(charEl, { opacity: 1, duration: 0.04 })
            .to(charEl, { opacity: 0, duration: 0.02 })
            .to(charEl, { opacity: 1, duration: 0.05 });
        });
    }

    function flickerOutCombined(chars1, chars2, onComplete) {
        const allChars = [...chars1, ...chars2].sort(() => Math.random() - 0.5);

        allChars.forEach((charEl, index) => {
            gsap.timeline({
                delay: index * 0.015,
                onComplete: () => {
                    if (index === allChars.length - 1 && onComplete) onComplete();
                }
            })
            .to(charEl, { opacity: 0.3, duration: 0.03 })
            .to(charEl, { opacity: 0.8, duration: 0.02 })
            .to(charEl, { opacity: 0, duration: 0.04 });
        });
    }

    const items = [
        { text: "KHADIJA JAMAL", outlined: false },
        { text: "A DESIGNER", outlined: true },
        { text: "A CREATIVE", outlined: true }
    ];

    let currentIndex = 0;

    function playLoopStep() {
        const currentItem = items[currentIndex];

        const chars1 = splitToSpans(line1, "MY NAME IS", false);
        const chars2 = splitToSpans(line2, currentItem.text, currentItem.outlined);

        flickerInCombined(chars1, chars2, () => {
            gsap.delayedCall(2.5, () => {
                flickerOutCombined(chars1, chars2, () => {
                    currentIndex = (currentIndex + 1) % items.length;
                    playLoopStep();
                });
            });
        });
    }

    playLoopStep();
}

window.addEventListener("DOMContentLoaded", animateHeroSequence);

 // Call had l-function mlli t-kmal l-animation dyal l-image
function showHoverGuide() {
    const guide = document.querySelector(".hover-guide");
    if (!guide) return;

    // Y-ban m-mora ma l-image t-stqar f-blast-ha
    gsap.to(guide, {
        opacity: 0.9,
        duration: 0.8,
        delay: 0.5, // Delay bash ma y-banshi f-dkhla dyal l-page
        onComplete: () => {
            guide.classList.add("active");
        }
    });
}

// Ila bghiti t-calliha direct f-l-end dyal l-sequence dyal l-hero text:
// Zid "showHoverGuide();" f-l-akhira dyal flickerInCombined

// غير تدوز 5 ثواني (5000 ملي ثانية) كيبان السهم تلقائياً
setTimeout(() => {
    const guide = document.getElementById("hoverGuide");
    if (guide) {
        guide.classList.add("show");
    }
}, 5000);

const aboutSection = document.querySelector('#about');
let timer = null;

if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // كيتسنى 1 ثانية وعاد كتوّسّع الكورة البيضاء
                timer = setTimeout(() => {
                    aboutSection.classList.add('light-theme');
                }, 1000);
            } else {
                // فاش كترجع لفوق الكورة كتجمع وترجع كحلة
                clearTimeout(timer);
                aboutSection.classList.remove('light-theme');
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(aboutSection);
}
 