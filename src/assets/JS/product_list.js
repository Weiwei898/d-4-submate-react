/*
// ★ 新增：列表篩選（依 nav 的 data-filter 過濾 .catalog-item）
document.addEventListener('click', (e) => {
    // 篩選控制
    const filterBtn = e.target.closest('#catalogFilters .nav-link');
    if (filterBtn) {
        e.preventDefault();

        // active 樣式
        document.querySelectorAll('#catalogFilters .nav-link')
            .forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');

        const key = filterBtn.dataset.filter; // all | stream | ai
        document.querySelectorAll('#catalogGrid .catalog-item')
            .forEach(item => {
                const show = (key === 'all' || item.dataset.cat === key);
                item.classList.toggle('d-none', !show);
            });
        return;
    }

    // 卡片內三顆按鈕 → 切換下方內容
    const switchBtn = e.target.closest('.card-switch [data-view]');
    if (switchBtn) {
        const card = switchBtn.closest('.card');
        const view = switchBtn.dataset.view; // intro | plan | note

        // 切換 active 按鈕
        card.querySelectorAll('.card-switch [data-view]')
            .forEach(b => b.classList.toggle('active', b === switchBtn));

        // 切換對應內容
        card.querySelectorAll('.card-pane')
            .forEach(pane => pane.classList.toggle('d-none', pane.dataset.view !== view));

        return;
    }
});

// 輪播控制用需要 bootstrap.Carousel 已載入（bootstrap bundle）
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('heroCarousel');
    const carousel = bootstrap.Carousel.getOrCreateInstance(el, {
        ride: 'carousel',   // 保留自動輪播；不要就改成 false
        interval: 5000,
        touch: true,        // 觸控滑動（行動裝置）— Bootstrap 內建
        wrap: true
    });

    // 滑鼠拖曳切換（桌面）
    let startX = 0, deltaX = 0, dragging = false;
    const THRESHOLD = 50;             // 觸發切換的位移門檻
    const isMouse = (e) => e.pointerType === 'mouse';

    el.addEventListener('pointerdown', (e) => {
        if (!isMouse(e) || e.buttons !== 1) return;
        dragging = true;
        startX = e.clientX;
        deltaX = 0;
        el.setPointerCapture?.(e.pointerId);
        // 避免選字
        el.style.userSelect = 'none';
    }, { passive: true });

    el.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        deltaX = e.clientX - startX;
    }, { passive: true });

    const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        el.releasePointerCapture?.(e.pointerId);
        el.style.userSelect = '';
        if (Math.abs(deltaX) > THRESHOLD) {
            deltaX < 0 ? carousel.next() : carousel.prev();
        }
    };
    el.addEventListener('pointerup', endDrag, { passive: true });
    el.addEventListener('pointercancel', endDrag, { passive: true });
    el.addEventListener('dragstart', (e) => e.preventDefault()); // 禁止原生拖曳
});

//輪播自動按鈕active用
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.getElementById('heroCarousel');
    const dots = Array.from(document.querySelectorAll('#heroDots [data-bs-slide-to]'));

    // 設定某顆為 active：加 px-2 + bg-secondary-500；其他恢復 p-1 + bg-neutral-100
    const setActiveDot = (i) => {
        dots.forEach((btn, idx) => {
            const on = idx === i;
            btn.classList.toggle('px-2', on);
            btn.classList.toggle('bg-secondary-500', on);
            btn.classList.toggle('p-1', !on);
            btn.classList.toggle('bg-neutral-100', !on);
            btn.setAttribute('aria-current', on ? 'true' : 'false');
        });
    };

    // 初始：依目前 active item
    const items = Array.from(wrap.querySelectorAll('.carousel-item'));
    setActiveDot(Math.max(0, items.findIndex(el => el.classList.contains('active'))));

    // 輪播切換後同步
    wrap.addEventListener('slid.bs.carousel', (e) => setActiveDot(e.to));
});
*/