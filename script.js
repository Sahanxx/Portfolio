// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a short delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        animateSkillBars();
    }, 1500);

    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize animations
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            showSection(targetSection);
            setActiveNavItem(item);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top of main content
        mainContent.scrollTop = 0;
        
        // Re-animate skill bars if skills section is shown
        if (sectionId === 'skills') {
            setTimeout(animateSkillBars, 300);
        }
    }
}

function setActiveNavItem(activeItem) {
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill bars animation
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 100);
    });
}

// Contact form functionality
function initializeContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize animations and interactions
function initializeAnimations() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add typing effect to profile title
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) {
        const text = profileTitle.textContent;
        profileTitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(profileTitle, text, 100);
        }, 2000);
    }
}

// Typing effect function
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
    
    // Arrow keys for section navigation
    if (e.altKey) {
        const currentActiveNav = document.querySelector('.nav-item.active');
        const currentIndex = Array.from(navItems).indexOf(currentActiveNav);
        
        if (e.key === 'ArrowDown' && currentIndex < navItems.length - 1) {
            e.preventDefault();
            navItems[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            navItems[currentIndex - 1].click();
        }
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
});

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// Add smooth transitions for theme switching (future enhancement)
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Console message for developers
console.log(`
🚀 Portfolio Website by I.H. Sahan Anjana
📧 Contact: sahananjana168@gmail.com
🔗 LinkedIn: linkedin.com/in/sahan-anjana
💻 GitHub: github.com/Sahanxx

Thanks for checking out the code! 
Feel free to reach out if you have any questions.
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        setActiveNavItem,
        isValidEmail,
        showNotification
    };
}

