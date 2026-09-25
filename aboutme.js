 document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");
    const letters = document.querySelectorAll(".about-section .about-flicker-letter");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add("active", "light-theme");

                letters.forEach((letter) => {
                    const randomDelay = (Math.random() * 0.9).toFixed(2);
                    // 1.2s باش تبان التقطيعة ديال التشعال والطفان ناضية
                    letter.style.animation = `aboutLightBulbFlicker 1.2s ${randomDelay}s forwards`;
                });
            } else {
                aboutSection.classList.remove("active", "light-theme");
                letters.forEach((letter) => {
                    letter.style.animation = "none";
                });
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تفعيل الأنيماسيون فاش توصل للسكشن
                aboutSection.classList.add("reveal-active");
            } else {
                // حيد الكلاس إلا بغيت الأنيماسيون تعاود فاش ترجع تطلع
                aboutSection.classList.remove("reveal-active");
            }
        });
    }, { threshold: 0.25 }); // كيبدا فاش يبان 25% من السكشن

    if (aboutSection) {
        revealObserver.observe(aboutSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add("reveal-active");
            } else {
                aboutSection.classList.remove("reveal-active");
            }
        });
    }, { threshold: 0.25 });

    if (aboutSection) {
        revealObserver.observe(aboutSection);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");
    const statNumbers = document.querySelectorAll(".stat-number");
    let hasCounted = false;

    // التأكد من أن جميع الأرقام تبدأ بـ 0+
    statNumbers.forEach(counter => {
        counter.innerText = "0+";
    });

    // دالة العد التدريجي
    const runCounter = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10);
            let current = 0;
            const duration = 1200; // المدة الزمانية للعد بالملي ثانية
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
                current += 1;
                counter.innerText = current + "+";
                if (current >= target) {
                    counter.innerText = target + "+";
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // IntersectionObserver باش يتسنى السكرول حتى يوصل لـ About Me
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تفعيل أنيميشن السكشن
                aboutSection.classList.add("reveal-active");

                // يبدا الـ Counter غير فاش توصل للسكشن
                if (!hasCounted) {
                    runCounter();
                    hasCounted = true; // باش مايتعودش الحساب كل مرة
                }
            }
        });
    }, { 
        threshold: 0.4 // خاص يبان على الأقل 40% من السكشن فـ الشاشة وعاد يبدا الحساب
    });

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector(".about-section");
    if (!aboutSection) return;

    const letters = document.querySelectorAll(".about-section .about-flicker-letter");
    const statNumbers = document.querySelectorAll(".stat-number");
    let hasCounted = false;

    // 1. تثبيت القيمة على 0+ في البداية
    statNumbers.forEach(counter => {
        counter.textContent = "0+";
    });

    // 2. دالة العد التدريجي
    const animateCounter = (element, target, duration = 1400) => {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // حساب الرقم التدريجي
            const currentCount = Math.floor(progress * target);
            element.textContent = `${currentCount}+`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = `${target}+`;
            }
        };

        window.requestAnimationFrame(step);
    };

    // 3. IntersectionObserver موحد
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // تفعيل أنيميشن الـ CSS لظهور العناصر والـ Theme
                aboutSection.classList.add("active", "light-theme", "reveal-active");

                // أنيميشن الفليكر للأحرف
                letters.forEach((letter) => {
                    const randomDelay = (Math.random() * 0.9).toFixed(2);
                    letter.style.animation = `aboutLightBulbFlicker 1.2s ${randomDelay}s forwards`;
                });

                // بدء حساب الأرقام بعد مهلة لانتهاء أنيميشن دخول الكروت (transition-delay ديال CSS)
                if (!hasCounted) {
                    hasCounted = true;
                    setTimeout(() => {
                        statNumbers.forEach(counter => {
                            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
                            animateCounter(counter, target, 1500);
                        });
                    }, 700); // 700ms متناسبة مع transition-delay (.stat-box:nth-child) في الـ CSS
                }
            }
        });
    }, { 
        threshold: 0.45 // يبدأ التفعيل فقط عند ظهور 45% من السكشن في الشاشة
    });

    observer.observe(aboutSection);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});