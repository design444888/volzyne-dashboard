document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize Lucide Icons
    lucide.createIcons();

    // 1. Sticky Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 3. Mobile Dropdown Toggle on Click
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown-menu');
        
        if (dropdown && link) {
            link.addEventListener('click', (e) => {
                // Only toggle dropdown on click if it's mobile view
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('mobile-dropdown-active');
                }
            });
        }
    });

    // Close menu when clicking a link (unless it has a dropdown on mobile)
    const links = document.querySelectorAll('.nav-menu a:not(.nav-link-dropdown)');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 4. Features tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Deactivate all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activate current button and panel
            btn.classList.add('active');
            const targetPanel = document.getElementById(`tab-panel-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 5. Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const billMonthly = document.getElementById('billing-monthly');
    const billYearly = document.getElementById('billing-yearly');
    
    // Price spans
    const starterPrice = document.getElementById('starter-price');
    const proPrice = document.getElementById('pro-price');
    const growthPrice = document.getElementById('growth-price');

    const prices = {
        monthly: {
            starter: '20',
            pro: '29',
            growth: '49'
        },
        yearly: {
            starter: '16',
            pro: '24',
            growth: '39'
        }
    };

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            pricingToggle.classList.toggle('yearly');
            
            const isYearly = pricingToggle.classList.contains('yearly');
            
            if (isYearly) {
                billYearly.classList.add('active');
                billMonthly.classList.remove('active');
                
                // Update text values
                starterPrice.textContent = prices.yearly.starter;
                proPrice.textContent = prices.yearly.pro;
                growthPrice.textContent = prices.yearly.growth;
            } else {
                billMonthly.classList.add('active');
                billYearly.classList.remove('active');
                
                // Update text values
                starterPrice.textContent = prices.monthly.starter;
                proPrice.textContent = prices.monthly.pro;
                growthPrice.textContent = prices.monthly.growth;
            }
        });
    }

    // 6. Intersection Observer for Fade-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
});
