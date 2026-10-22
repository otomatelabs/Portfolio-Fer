/**
 * Theme toggle, navigation scroll behavior, mobile menu, and active section tracking
 */

(function() {
    // ── Theme toggle ──
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const STORAGE_KEY = 'portfolio-theme';
    
    function getTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    function applyTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme');
        }
    }
    
    function toggleTheme() {
        const current = getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }
    
    applyTheme(getTheme());
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ── Navigation ──
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!nav) return;
    
    let ticking = false;
    
    function updateNav() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
    
    // Scroll-spy: highlight nav link for visible section
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = [];
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;
        const section = document.querySelector(href);
        if (section) {
            sections.push({ link, section });
        }
    });
    
    if (sections.length) {
        let spyTicking = false;
        
        function updateActiveLink() {
            const scrollY = window.scrollY + window.innerHeight / 3; // upper third bias
            
            let activeSection = null;
            let minDistance = Infinity;
            
            sections.forEach(({ link, section }) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const distance = Math.abs(scrollY - sectionTop);
                
                if (scrollY >= sectionTop && distance < minDistance) {
                    minDistance = distance;
                    activeSection = link;
                }
            });
            
            // Also check if we're near the top (hero is visible)
            if (window.scrollY < 300) {
                activeSection = null; // no active link when hero is visible
            }
            
            sections.forEach(({ link }) => {
                link.classList.toggle('active', link === activeSection);
            });
            
            spyTicking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!spyTicking) {
                window.requestAnimationFrame(updateActiveLink);
                spyTicking = true;
            }
        });
        
        updateActiveLink();
    }
    
    // Mobile hamburger menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.add('active');
                hamburger.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    updateNav();
    
    // ── Console easter egg ──
    console.log(
        '%c👋 Hey there! %cLike what you see?',
        'font-size: 1.2em; font-weight: 700; color: #e07090;',
        'font-size: 1em;'
    );
    console.log(
        '%cFernando Perez Gonzalez %c  Automation & Systems Engineer',
        'font-weight: 600;',
        ''
    );
    console.log(
        '%c📧 businesscontact@otomatelabs.com  %c🔗 linkedin.com/in/fernandopgonzalez',
        'color: #c080d0;',
        'color: #a0a0c0;'
    );
    console.log('%cOpen to remote opportunities and consulting.', 'font-style: italic; color: #888;');
})();
