// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Smooth Scrolling for Internal Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation classes when elements come into view
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe service cards and other elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .service-item, .feature, .contact-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 10) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2-');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})/, '($1) ');
            }
            
            e.target.value = value;
        });
    }
});

// Add loading state to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        if (button.getAttribute('href') && (button.getAttribute('href').includes('tel:') || button.getAttribute('href').includes('mailto:'))) {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Connecting...';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        }
    });
});

// Consolidated DOMContentLoaded for CSS animations
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .service-item,
        .feature,
        .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in,
        .service-item.animate-in,
        .feature.animate-in,
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .nav-links.active {
            display: flex;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                flex-direction: column;
                padding: 20px;
                z-index: 1000;
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .hamburger {
                display: flex;
                flex-direction: column;
                cursor: pointer;
                padding: 5px;
            }
            
            .hamburger span {
                width: 25px;
                height: 3px;
                background: #333;
                margin: 3px 0;
                transition: 0.3s;
            }
        }
    `;
    
    // Only add style if it doesn't already exist
    if (!document.querySelector('#dynamic-styles')) {
        style.id = 'dynamic-styles';
        document.head.appendChild(style);
    }
});


