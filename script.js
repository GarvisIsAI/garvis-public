// Garvis Website Interactive Elements
// Professional animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .faq-item, .tech-diagram, .demo-chat').forEach(el => {
        observer.observe(el);
    });

    // Consciousness meter animation
    const meterFill = document.querySelector('.meter-fill');
    if (meterFill) {
        const meterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    meterFill.style.animation = 'fillMeter 2s ease-out forwards';
                    meterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        meterObserver.observe(meterFill);
    }

    // Form validation and submission
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            const requiredFields = ['name', 'email', 'company', 'use-case'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (data.email && !emailRegex.test(data.email)) {
                emailInput.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Success state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.background = '#10b981';
                submitBtn.disabled = true;
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // In production, you would send the data to your backend
                console.log('Demo request submitted:', data);
            } else {
                // Show error message
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
        
        // Remove error styling on input
        demoForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile nav when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Remove duplicate parallax function - handled in handleScroll now

    // Demo chat simulation
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        // Add loading animation to reasoning trace steps
        const traceSteps = document.querySelectorAll('.trace-step');
        traceSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '0.5';
                step.style.animation = 'fadeInUp 0.5s ease-out forwards';
            }, index * 500);
        });
    }

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // Simplified title animation - no typing effect that might cause issues
    setTimeout(() => {
        const heroTitleMain = document.querySelector('.hero-title-main');
        const heroTitleAccent = document.querySelector('.hero-title-accent');
        
        if (heroTitleMain && heroTitleAccent) {
            heroTitleMain.style.opacity = '1';
            heroTitleAccent.style.opacity = '1';
        }
    }, 100);

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Progress bar for consciousness meter
    function animateProgressBar() {
        const progressBar = document.querySelector('.meter-fill');
        if (progressBar) {
            let width = 0;
            const targetWidth = 92;
            const increment = 2;
            
            const interval = setInterval(() => {
                if (width >= targetWidth) {
                    clearInterval(interval);
                } else {
                    width += increment;
                    progressBar.style.width = width + '%';
                }
            }, 50);
        }
    }

    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 40);
        });
    }

    // Initialize animations based on scroll position
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar();
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        heroObserver.observe(heroSection);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Enhanced scroll animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Gentle parallax for floating elements only (not the hero background)
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        
        // Update consciousness meter based on scroll
        const meter = document.querySelector('.meter-value');
        if (meter && scrolled > 100) {
            const scrollProgress = Math.min(scrolled / 1000, 1);
            const consciousnessLevel = (0.8 + (scrollProgress * 0.12)).toFixed(2);
            meter.textContent = consciousnessLevel;
        }
    }

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });

    // Initialize page
    console.log('Garvis website loaded - Synthetic Intelligence Platform ready');
});

// Add CSS for additional animations
const additionalStyles = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .feature-card,
    .faq-item,
    .tech-diagram,
    .demo-chat {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease-out;
    }
    
    .feature-card:not(.animate-in),
    .faq-item:not(.animate-in),
    .tech-diagram:not(.animate-in),
    .demo-chat:not(.animate-in) {
        opacity: 0.8;
        transform: translateY(10px);
    }
    
    .nav-links.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.3);
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: #254b6d;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification-error {
        background: #ef4444;
    }
    
    .notification-success {
        background: #10b981;
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
        
        .nav-toggle {
            display: flex;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);