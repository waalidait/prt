 document.addEventListener('DOMContentLoaded', () => {
    const popupsContainer = document.querySelector('.popups-container');
    if (!popupsContainer) return;

    // Queue dyal les windows mkhbiyyin (fihom figma.png icon cards)
    let waitingQueue = Array.from(popupsContainer.querySelectorAll('.hidden-window'));

    popupsContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('close-btn')) return;

        const currentWin = e.target.closest('.popup-window');
        if (!currentWin || currentWin.classList.contains('closing')) return;

        const slotClass = Array.from(currentWin.classList).find(c => c.startsWith('window-slot-'));

        // 1. Close current card
        currentWin.classList.add('closing');

        setTimeout(() => {
            currentWin.classList.remove('closing');
            if (slotClass) currentWin.classList.remove(slotClass);
            currentWin.classList.add('hidden-window');

            // Zid l-card li tsaddat f akher l-queue
            waitingQueue.push(currentWin);

            // 2. Talla3 l-card l-jdid mn l-queue (li ghadikun fihom l-icon cards float)
            if (waitingQueue.length > 0) {
                const nextWin = waitingQueue.shift();

                if (slotClass) nextWin.classList.add(slotClass);

                nextWin.classList.remove('hidden-window');
                nextWin.classList.add('pop-in');

                setTimeout(() => {
                    nextWin.classList.remove('pop-in');
                }, 350);
            }
        }, 250);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('popupsContainer');
    const iconLeft = document.querySelector('.float-icon-left');
    const iconRight = document.querySelector('.float-icon-right');

    if (!container || !iconLeft || !iconRight) return;

    // 1. Idle Smooth Floating (3a-tiyan l-ḥis b-lli rahom f l-fada')
    let floatAngle = 0;
    function idleFloat() {
        floatAngle += 0.025;
        const floatY1 = Math.sin(floatAngle) * 14;
        const floatY2 = Math.cos(floatAngle) * 16;

        iconLeft.style.marginTop = `${floatY1}px`;
        iconRight.style.marginTop = `${floatY2}px`;

        requestAnimationFrame(idleFloat);
    }
    idleFloat();

    // 2. Mouse Parallax (Haraka smooth m3a l-souris)
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        
        // Cadrage dyal l-mouse mn centre dyal l-container
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        const mouseY = e.clientY - (rect.top + rect.height / 2);

        // Icon 1 (L-lsar): Motion m3a rotation خفيفة
        const moveX1 = mouseX * 0.08;
        const moveY1 = mouseY * 0.08;
        const rotate1 = -15 + (mouseX * 0.03);

        // Icon 2 (L-lymen): Motion f l-itijah l-m3aks (Depth effect)
        const moveX2 = mouseX * -0.1;
        const moveY2 = mouseY * -0.1;
        const rotate2 = 20 + (mouseX * -0.04);

        iconLeft.style.transform = `translate3d(${moveX1}px, ${moveY1}px, 0px) rotate(${rotate1}deg)`;
        iconRight.style.transform = `translate3d(${moveX2}px, ${moveY2}px, 0px) rotate(${rotate2}deg)`;
    });

    // Reset b-shwiya mni kat-khrj l-souris
    container.addEventListener('mouseleave', () => {
        iconLeft.style.transform = `translate3d(0px, 0px, 0px) rotate(-15deg)`;
        iconRight.style.transform = `translate3d(0px, 0px, 0px) rotate(20deg)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.draggable-space-icon');

    icons.forEach(icon => {
        let isDragging = false;
        let startX, startY;
        let currentX = 0, currentY = 0;
        let velocityX = 0, velocityY = 0;
        let lastMouseX = 0, lastMouseY = 0;
        let animationFrame;

        // Space Floating Loop (Friction & Drift f l-faḍā')
        function spacePhysicsLoop() {
            if (!isDragging) {
                // Ta-tḥrrak b-shwiya b l-Velocity li t3tat-lha
                currentX += velocityX;
                currentY += velocityY;

                // Friction sghīra bzzf (bḥal f l-faḍā’ t-taya3)
                velocityX *= 0.95;
                velocityY *= 0.95;

                // Rotations khfīfa m3a l-ḥaraka
                const rotation = velocityX * 2;

                icon.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(${rotation}deg)`;
            }

            animationFrame = requestAnimationFrame(spacePhysicsLoop);
        }

        spacePhysicsLoop();

        // Mni kat-dreb 3la l-icon b l-souris (MouseDown)
        icon.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            velocityX = 0;
            velocityY = 0;

            icon.style.zIndex = 100; // T-tla3 l-fo9 gha hya
        });

        // Mni kat-ḥrrek l-souris (MouseMove)
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            // Calcule position jdīda
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;

            // Calcule l-sūr3a (Velocity) dyal l-souris bach mli t-ṭl9ha t-tīr
            velocityX = (e.clientX - lastMouseX) * 0.8;
            velocityY = (e.clientY - lastMouseY) * 0.8;

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            const rotation = velocityX * 1.5;
            icon.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(${rotation}deg)`;
        });

        // Mni kat-ṭle9 l-souris (MouseUp)
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                icon.style.zIndex = 99;
            }
        });
    });
});