/**
 * Scroll-triggered animations using Intersection Observer
 * Performance-optimized: no scroll event listeners
 * Respects prefers-reduced-motion
 */

(function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Make everything visible immediately, no animations
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Animation configurations
    const animationTypes = {
        'fade-up': {
            initial: { opacity: '0', transform: 'translateY(40px)' },
            final: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-up-small': {
            initial: { opacity: '0', transform: 'translateY(20px)' },
            final: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
            initial: { opacity: '0' },
            final: { opacity: '1' }
        },
        'scale-in': {
            initial: { opacity: '0', transform: 'scale(0.95)' },
            final: { opacity: '1', transform: 'scale(1)' }
        },
        'slide-right': {
            initial: { opacity: '0', transform: 'translateX(-30px)' },
            final: { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-left': {
            initial: { opacity: '0', transform: 'translateX(30px)' },
            final: { opacity: '1', transform: 'translateX(0)' }
        }
    };

    // Easing curves
    const easings = {
        smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',      // ease-out-quart
        bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',   // slight overshoot for numbers
        linear: 'linear'
    };

    // Counter animation for numbers
    function animateCounter(el, target, duration = 2000) {
        const start = performance.now();
        const isPercentage = target.includes('%');
        const isMoney = target.includes('$');
        const isPlus = target.includes('+');

        // Ranges like "10-20" shouldn't animate   display statically
        if (target.includes('-') && !isMoney) {
            el.textContent = target;
            return;
        }

        // Extract numeric value
        let numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        if (isNaN(numericValue)) numericValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = numericValue * eased;

            let display = '';
            if (isMoney) {
                display = '$' + Math.floor(current).toLocaleString() + 'K+';
            } else if (isPercentage) {
                display = current.toFixed(1) + '%';
            } else if (isPlus) {
                display = Math.floor(current) + '+';
            } else {
                display = Math.floor(current).toString();
            }

            el.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
                el.classList.add('pulse');
                setTimeout(() => el.classList.remove('pulse'), 600);
            }
        }

        requestAnimationFrame(update);
    }

    // Set up intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || '0';
                const type = el.dataset.animate || 'fade-up';
                const duration = el.dataset.duration || '800';
                const easing = el.dataset.easing || 'smooth';

                // Apply delay
                el.style.transitionDelay = `${delay}ms`;
                
                // Apply animation
                const config = animationTypes[type];
                if (config) {
                    el.style.transition = `opacity ${duration}ms ${easings[easing]}, transform ${duration}ms ${easings[easing]}`;
                    el.style.opacity = config.final.opacity;
                    el.style.transform = config.final.transform;
                }

                // Handle counter animation
                if ((el.classList.contains('metric-number') || el.classList.contains('hero-metric-value')) && !el.dataset.animated) {
                    el.dataset.animated = 'true';
                    const target = el.dataset.target || el.textContent;
                    el.dataset.target = target;
                    animateCounter(el, target, 2000);
                }

                // Handle staggered children
                if (el.dataset.stagger) {
                    const children = el.querySelectorAll('[data-stagger-child]');
                    children.forEach((child, index) => {
                        const staggerDelay = parseInt(el.dataset.stagger) * index;
                        setTimeout(() => {
                            child.style.transition = `opacity 600ms ${easings.smooth}, transform 600ms ${easings.smooth}`;
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, staggerDelay);
                    });
                }

                // Unobserve after animation
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Initialize: set initial states and observe
    function initAnimations() {
        // Set initial states for main animated elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            const type = el.dataset.animate || 'fade-up';
            const config = animationTypes[type];
            
            if (config) {
                el.style.opacity = config.initial.opacity;
                el.style.transform = config.initial.transform;
                el.style.willChange = 'opacity, transform';
            }
            
            observer.observe(el);
        });

        // Set initial states for stagger children
        document.querySelectorAll('[data-stagger-child]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.willChange = 'opacity, transform';
        });
    }

    // Hero entrance animation (immediate, not scroll-triggered)
    function animateHero() {
        const heroElements = document.querySelectorAll('.hero [data-animate]');
        heroElements.forEach((el, index) => {
            const baseDelay = parseInt(el.dataset.delay || '0');
            el.style.transitionDelay = `${baseDelay}ms`;
            
            // Trigger after a small initial delay
            setTimeout(() => {
                const type = el.dataset.animate || 'fade-up';
                const config = animationTypes[type];
                const duration = el.dataset.duration || '800';
                
                if (config) {
                    el.style.transition = `opacity ${duration}ms ${easings.smooth}, transform ${duration}ms ${easings.smooth}`;
                    el.style.opacity = config.final.opacity;
                    el.style.transform = config.final.transform;
                }
            }, 100 + (index * 100));
            
            observer.unobserve(el);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAnimations();
            animateHero();
        });
    } else {
        initAnimations();
        animateHero();
    }

    // Re-init on dynamic content (if needed later)
    window.reinitAnimations = initAnimations;
})();
