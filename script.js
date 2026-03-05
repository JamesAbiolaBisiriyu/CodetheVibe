// ===== script.js =====
(function() {
    // ---------- THEME TOGGLE (with localStorage) ----------
    const body = document.body;
    const toggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    if (!toggleBtn || !themeIcon || !themeText) {
        console.warn('Theme elements not found');
        return;
    }

    // apply theme based on dark mode boolean
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark');
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light';
        } else {
            body.classList.remove('dark');
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark';
        }
        // store preference
        localStorage.setItem('preferredTheme', isDark ? 'dark' : 'light');
    }

    // initialize theme from localStorage or system preference
    const storedTheme = localStorage.getItem('preferredTheme');
    if (storedTheme) {
        setTheme(storedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }

    // toggle on click
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nowDark = !body.classList.contains('dark');
        setTheme(nowDark);
    });

    // keyboard support (Enter / Space)
    toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleBtn.click();
        }
    });

    // ---------- FADE-IN ANIMATIONS (intersection observer) ----------
    const cards = document.querySelectorAll('.product-card');
    
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // stop observing after animation
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px' // small offset for smoother feel
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // fallback: if any card never gets visible class (e.g. very fast scroll), force after 1s
    setTimeout(() => {
        cards.forEach(card => {
            if (!card.classList.contains('visible')) {
                card.classList.add('visible');
            }
        });
    }, 1000);

    // handle reduced motion preference – if user prefers reduced motion,
    // we already have a CSS media query that disables animation,
    // but we also set visible class immediately to ensure opacity 1
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.forEach(c => {
            c.style.animation = 'none';
            c.classList.add('visible'); // ensure visible
        });
    }

    // ---------- "LEARN MORE" INTERACTIVE MODAL ----------
    const modal = document.getElementById('productModal');
    const modalDialog = modal ? modal.querySelector('.product-modal-dialog') : null;
    const modalTitle = modal ? modal.querySelector('.modal-title') : null;
    const modalPrice = modal ? modal.querySelector('.modal-price') : null;
    const modalDescription = modal ? modal.querySelector('.modal-description') : null;
    const modalExtra = modal ? modal.querySelector('.modal-extra') : null;
    let lastFocusedElement = null;

    function openModal(card) {
        if (!modal || !modalDialog || !modalTitle || !modalPrice || !modalDescription) return;

        const titleEl = card.querySelector('.product-title');
        const priceEl = card.querySelector('.product-price');
        const descEl = card.querySelector('.product-description');
        const microcopy = card.getAttribute('data-microcopy');

        modalTitle.textContent = titleEl ? titleEl.textContent : '';
        modalPrice.textContent = priceEl ? priceEl.textContent : '';
        modalDescription.textContent = descEl ? descEl.textContent : '';

        if (modalExtra) {
            modalExtra.textContent = microcopy || '';
        }

        lastFocusedElement = document.activeElement;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');

        // focus dialog for accessibility
        modalDialog.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    // attach click handlers to each learn more button
    const learnMoreButtons = document.querySelectorAll('.buy-button');
    learnMoreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            if (card) {
                openModal(card);
            }
        });
    });

    // close when clicking backdrop or close button
    if (modal) {
        modal.addEventListener('click', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;

            if (target.dataset.modalClose !== undefined || target === modal) {
                closeModal();
            }
        });
    }

    // close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });

    // keyboard support for buttons (Enter already works by default)
    learnMoreButtons.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // optional: observe theme toggle changes for any extra effect? not needed.
})();