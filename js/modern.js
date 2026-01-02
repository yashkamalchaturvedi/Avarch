document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Navigation & Mobile Menu
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Active nav link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // Navbar Scroll Effects
    // ============================================
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // ============================================
    // Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ============================================
    // Rotating Words Animation
    // ============================================
    let currentWordIndex = 0;
    const words = document.querySelectorAll('.rotating-words .word');

    if (words.length > 0) {
        words[0].classList.add('active');

        setInterval(() => {
            words[currentWordIndex].classList.remove('active');
            currentWordIndex = (currentWordIndex + 1) % words.length;
            words[currentWordIndex].classList.add('active');
        }, 3000);
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Button Ripple Effect
    // ============================================
    const buttons = document.querySelectorAll('.btn, .ripple');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // Card Hover Effects with Mouse Tracking
    // ============================================
    const cards = document.querySelectorAll('.feature-card, .portfolio-item, .testimonial-card, .partner-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });

    // ============================================
    // Parallax Effect on Hero Background
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');

    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled <= heroHeight) {
                const parallaxSpeed = 0.5;
                heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ============================================
    // Counter Animation for Stats
    // ============================================
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // Form Validation & Submission
    // ============================================
    const form = document.querySelector('.contact-form form');

    if (form) {
        const inputs = form.querySelectorAll('input, textarea');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="loading"></span> Sending...';

                // Simulate form submission
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error
        input.classList.remove('error');
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        if (input.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            input.classList.add('error');
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = errorMessage;
            error.style.color = 'var(--error)';
            error.style.fontSize = '0.875rem';
            error.style.marginTop = '0.25rem';
            error.style.display = 'block';
            input.parentElement.appendChild(error);
        }

        return isValid;
    }

    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            background: type === 'success' ? 'var(--success)' : 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease',
            maxWidth: '400px'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
    // Image Lazy Loading with Fade-in
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                };

                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // Cursor Follow Effect (Optional)
    // ============================================
    if (window.innerWidth > 968) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        Object.assign(cursor.style, {
            width: '20px',
            height: '20px',
            border: '2px solid var(--primary)',
            borderRadius: '50%',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'all 0.1s ease',
            opacity: '0'
        });
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Cursor scale on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(0, 212, 255, 0.2)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }

    // ============================================
    // Tilt Effect on Cards
    // ============================================
    const tiltCards = document.querySelectorAll('.feature-card, .portfolio-item');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // Scroll Progress Indicator
    // ============================================
    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        background: 'var(--gradient-2)',
        zIndex: '10000',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        transition: 'transform 0.1s ease'
    });
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = scrolled / scrollHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });

    // ============================================
    // Add CSS Animations Dynamically
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        input.error,
        textarea.error {
            border-color: var(--error) !important;
            animation: shake 0.3s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c🚀 AvArch Website', 'font-size: 20px; font-weight: bold; color: #00D4FF;');
    console.log('%cBuilt with modern UI/UX standards', 'font-size: 14px; color: #94A3B8;');
});
