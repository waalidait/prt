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