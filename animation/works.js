 document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) return;

    // إضافة delay تلقائي لكل حرف (0.04s) باش يطلعوا متسلسلين حرف بحرف
    const allChars = projectsSection.querySelectorAll(".reveal-char");
    allChars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.04}s`;
    });

    // مراقبة السكرول
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("reveal-active");
            }
        });
    }, {
        threshold: 0.25
    });

    projectsObserver.observe(projectsSection);
});

document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) return;

    // 1. إضافة delay تلقائي لكل حرف باش يطلعوا متسلسلين حرف بحرف
    const allChars = projectsSection.querySelectorAll(".reveal-char");
    allChars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.04}s`;
    });

    // 2. IntersectionObserver لمراقبة السكرول وتفعيل أنيميشن الأحرف
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("reveal-active");
            }
        });
    }, {
        threshold: 0.2
    });

    projectsObserver.observe(projectsSection);

    // 3. ترتيب الكروت فاش تكليكي على أي كارت ترجع هي الأولى للقدام
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.style.zIndex = '1');
            card.style.zIndex = '10';
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) return;

    // 1. Stagger Delay للأحرف
    const allChars = projectsSection.querySelectorAll(".reveal-char");
    allChars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.04}s`;
    });

    // 2. Observer تفعيل العنوان
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.1 });

    projectsObserver.observe(projectsSection);

    // 3. التحكم فـ قلب الكروت للقدام مع السكرول
    const cards = Array.from(document.querySelectorAll(".project-card"));
    const stackWrapper = document.querySelector(".cards-stack-wrapper");

    window.addEventListener("scroll", () => {
        if (!stackWrapper) return;

        const sectionRect = projectsSection.getBoundingClientRect();
        const scrollProgress = -sectionRect.top / (sectionRect.height - window.innerHeight);

        if (scrollProgress > 0 && scrollProgress < 1) {
            cards.forEach((card, index) => {
                const flipThreshold = (index + 1) * 0.22;

                if (scrollProgress >= flipThreshold) {
                    card.classList.add("flipped");
                } else {
                    card.classList.remove("flipped");
                }
            });
        } else if (scrollProgress <= 0) {
            cards.forEach(card => card.classList.remove("flipped"));
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) return;

    // 1. Stagger Delay للأحرف
    const allChars = projectsSection.querySelectorAll(".reveal-char");
    allChars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.04}s`;
    });

    // 2. Observer للعنوان
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.1 });

    projectsObserver.observe(projectsSection);

    // 3. ربط الحركة المباشرة بالسكرول (Scroll-Driven Physics)
    const cards = Array.from(document.querySelectorAll(".project-card"));
    const stackWrapper = document.querySelector(".cards-stack-wrapper");

    window.addEventListener("scroll", () => {
        if (!stackWrapper) return;

        const sectionRect = projectsSection.getBoundingClientRect();
        // حساب نسبة السكرول الكلية فـ السكشن
        const totalScroll = -sectionRect.top;
        const maxScroll = sectionRect.height - window.innerHeight;
        const progress = Math.max(0, Math.min(1, totalScroll / maxScroll));

        cards.forEach((card, index) => {
            // كل كارت عندها مجال سكرول خاص بها
            const startThreshold = index * 0.22;
            const endThreshold = startThreshold + 0.22;

            if (progress <= startThreshold) {
                // الكارت باقي ما وصلهاش السكرول (ترجع لبلاصتها)
                card.style.transform = `translateY(0px) rotateX(0deg) scale(1)`;
                card.style.zIndex = cards.length - index;
            } else if (progress >= endThreshold) {
                // الكارت فاتها السكرول (تكمل القلبة)
                card.style.transform = `translateY(-260px) rotateX(105deg) scale(0.95)`;
                card.style.zIndex = 50 + index;
            } else {
                // الكارت فـ وسط الحركة (مربوطة بالسكرول بالضبط)
                card.style.zIndex = 50 + index;
                const cardProgress = (progress - startThreshold) / 0.22; // نسبة من 0 لـ 1

                let translateY = 0;
                let rotateX = 0;
                let scale = 1;

                if (cardProgress <= 0.4) {
                    // المرحلة 1: ترفع الكارت لفوق فقط (من 0 لـ 40% ديال سكرول الكارت)
                    const subProgress = cardProgress / 0.4;
                    translateY = -120 * subProgress;
                    rotateX = 10 * subProgress;
                    scale = 1 + (0.02 * subProgress);
                } else {
                    // المرحلة 2: تكمل طلوع وتقلب لجهة الشاشة (من 40% لـ 100%)
                    const subProgress = (cardProgress - 0.4) / 0.6;
                    translateY = -120 - (140 * subProgress);
                    rotateX = 10 + (95 * subProgress);
                    scale = 1.02 - (0.07 * subProgress);
                }

                card.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
            }
        });
    });
});
  

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const curatedSection = document.querySelector(".curated-works");
    const orbit = document.querySelector(".works-orbit");
    const items = gsap.utils.toArray(".work-item");

    if (!curatedSection || !orbit) return;

    /* =========================
       GLOBAL ROSE MODE TRIGGER
       ========================= */
    ScrollTrigger.create({
        trigger: curatedSection,

        start: "top 50%", /* أول ما توصل السكشن لمنتصف الشاشة كتحول الصفحة كاملة للغوز */
        end: "bottom 30%",

        onEnter: () => {
            document.documentElement.classList.add("rose-mode");
            document.body.classList.add("rose-mode");
        },

        onLeave: () => {
            document.documentElement.classList.remove("rose-mode");
            document.body.classList.remove("rose-mode");
        },

        onEnterBack: () => {
            document.documentElement.classList.add("rose-mode");
            document.body.classList.add("rose-mode");
        },

        onLeaveBack: () => {
            document.documentElement.classList.remove("rose-mode");
            document.body.classList.remove("rose-mode");
        }
    });

    /* =========================
       ORBIT ROTATION
       ========================= */
    gsap.to(orbit, {
        rotate: 180,
        ease: "none",
        scrollTrigger: {
            trigger: curatedSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
        }
    });

    /* =========================
       KEEP IMAGES STRAIGHT
       ========================= */
    items.forEach((item) => {
        gsap.to(item, {
            rotate: -180,
            ease: "none",
            scrollTrigger: {
                trigger: curatedSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });
    });

});

ScrollTrigger.create({
    trigger: ".curated-works",
    start: "top 50%", /* كينطلق التحول للغوز فـ دقة واحدة أول ما توصل السكشن للنص */
    end: "bottom 20%",

    onEnter: () => document.documentElement.classList.add("rose-mode"),
    onLeave: () => document.documentElement.classList.remove("rose-mode"),
    onEnterBack: () => document.documentElement.classList.add("rose-mode"),
    onLeaveBack: () => document.documentElement.classList.remove("rose-mode")
});

gsap.registerPlugin(ScrollTrigger);

// 1. Rose Mode Trigger (تغيير اللون)
ScrollTrigger.create({
    trigger: ".curated-works",
    start: "top 50%",
    end: "bottom 20%",
    onEnter: () => document.documentElement.classList.add("rose-mode"),
    onLeave: () => document.documentElement.classList.remove("rose-mode"),
    onEnterBack: () => document.documentElement.classList.add("rose-mode"),
    onLeaveBack: () => document.documentElement.classList.remove("rose-mode")
});

// 2. Expand Animation (تفتح الكروت بالـ Scroll)
const items = gsap.utils.toArray('.work-item');

gsap.set(items, {
    scale: 0,
    opacity: 0
});

gsap.to(items, {
    scale: 1,
    opacity: 1,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".curated-works",
        start: "top 75%",
        end: "top 30%",
        scrub: 1
    }
});

// 3. Auto-Rotate + Scroll Rotation + Counter-Rotation (لكروت واقفين مقادين)
let autoAngle = 0;
let scrollAngle = { value: 0 };

// كنزيدو rotation بالـ Scroll فوق الدوران العادي
gsap.to(scrollAngle, {
    value: 360, // شحال تدور فاش تسكرولي السكشن كاملة
    ease: "none",
    scrollTrigger: {
        trigger: ".curated-works",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});

// GSAP Ticker كيجْمَع الدوران التلقائي + الدوران ديال الـ Scroll فـ كل فريم
gsap.ticker.add(() => {
    autoAngle += 0.3; // السرعة ديال التدوير التلقائي

    // الزاوية الإجمالية = الدوران التلقائي + دوران السكرول
    const totalAngle = autoAngle + scrollAngle.value;

    // تدوير الحاوية الكبيرة
    gsap.set(".works-orbit", { rotation: totalAngle });

    // دوران عكسي للكروت باش يبقاو واقفين نيشان 100%
    gsap.set(".work-item", { rotation: -totalAngle });
});


document.addEventListener("DOMContentLoaded", function () {
        const trustSection = document.querySelector(".trust-section");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trustSection.classList.add("visible");
                }
            });
        }, {
            threshold: 0.35 // تبدأ الحركة ملي تدخل 35% من السيكشن فـ الشاشة
        });

        observer.observe(trustSection);
    });