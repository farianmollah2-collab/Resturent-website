/* ============================================
   SAVORIA - Premium Restaurant Website Scripts
   ============================================ */

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            updateActiveNavLink(this);
        }
    });
});

// Update active navigation link
function updateActiveNavLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    if (clickedLink.classList.contains('nav-link')) {
        clickedLink.classList.add('active');
    }
}

// ============================================
// SCROLL SPY - Highlight active section in nav
// ============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// REVIEWS SLIDER
// ============================================

const reviewTrack = document.getElementById('reviewTrack');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');
const reviewCards = document.querySelectorAll('.review-card');

let currentReview = 0;
const totalReviews = reviewCards.length;

// Update slider position
function updateReviewSlider() {
    const offset = -currentReview * 100;
    reviewTrack.style.transform = `translateX(${offset}%)`;
}

// Next review
reviewNext.addEventListener('click', () => {
    currentReview = (currentReview + 1) % totalReviews;
    updateReviewSlider();
});

// Previous review
reviewPrev.addEventListener('click', () => {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    updateReviewSlider();
});

// Auto-play reviews (optional - every 5 seconds)
let reviewInterval = setInterval(() => {
    currentReview = (currentReview + 1) % totalReviews;
    updateReviewSlider();
}, 5000);

// Pause auto-play on hover
const reviewsSlider = document.querySelector('.reviews-slider');
reviewsSlider.addEventListener('mouseenter', () => {
    clearInterval(reviewInterval);
});

reviewsSlider.addEventListener('mouseleave', () => {
    reviewInterval = setInterval(() => {
        currentReview = (currentReview + 1) % totalReviews;
        updateReviewSlider();
    }, 5000);
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

const reservationForm = document.getElementById('reservationForm');
const formSuccess = document.getElementById('formSuccess');

// Form field elements
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const guestsInput = document.getElementById('guests');

// Error message elements
const nameError = document.getElementById('nameError');
const phoneError = document.getElementById('phoneError');
const dateError = document.getElementById('dateError');
const timeError = document.getElementById('timeError');
const guestsError = document.getElementById('guestsError');

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 2) {
        showError(nameError, 'Please enter a valid name (at least 2 characters)');
        return false;
    }
    hideError(nameError);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    // Basic phone validation - at least 10 digits
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError(phoneError, 'Please enter a valid phone number');
        return false;
    }
    hideError(phoneError);
    return true;
}

function validateDate() {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!dateInput.value) {
        showError(dateError, 'Please select a date');
        return false;
    }
    
    if (selectedDate < today) {
        showError(dateError, 'Please select a future date');
        return false;
    }
    
    hideError(dateError);
    return true;
}

function validateTime() {
    if (!timeInput.value) {
        showError(timeError, 'Please select a time');
        return false;
    }
    hideError(timeError);
    return true;
}

function validateGuests() {
    if (!guestsInput.value) {
        showError(guestsError, 'Please select number of guests');
        return false;
    }
    hideError(guestsError);
    return true;
}

// Show/hide error messages
function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function hideError(element) {
    element.textContent = '';
    element.classList.remove('show');
}

// Real-time validation on blur
nameInput.addEventListener('blur', validateName);
phoneInput.addEventListener('blur', validatePhone);
dateInput.addEventListener('blur', validateDate);
timeInput.addEventListener('blur', validateTime);
guestsInput.addEventListener('blur', validateGuests);

// Form submission
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isDateValid = validateDate();
    const isTimeValid = validateTime();
    const isGuestsValid = validateGuests();
    
    // Check if all validations passed
    if (isNameValid && isPhoneValid && isDateValid && isTimeValid && isGuestsValid) {
        // Show success message
        formSuccess.classList.add('show');
        
        // Log form data (in real application, send to server)
        const formData = {
            name: nameInput.value,
            phone: phoneInput.value,
            date: dateInput.value,
            time: timeInput.value,
            guests: guestsInput.value,
            message: document.getElementById('message').value
        };
        
        console.log('Reservation Data:', formData);
        
        // Reset form after 2 seconds
        setTimeout(() => {
            reservationForm.reset();
            formSuccess.classList.remove('show');
        }, 3000);
        
        // In a real application, you would send this data to your backend:
        /*
        fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ============================================
// QUICK VIEW FUNCTIONALITY (Dish Cards)
// ============================================

const quickViewButtons = document.querySelectorAll('.quick-view-btn');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishCard = button.closest('.dish-card');
        const dishName = dishCard.querySelector('.dish-name').textContent;
        const dishPrice = dishCard.querySelector('.dish-price').textContent;
        const dishDescription = dishCard.querySelector('.dish-description').textContent;
        
        // In a real application, you would open a modal with full details
        alert(`${dishName}\n${dishPrice}\n\n${dishDescription}\n\nIn a production version, this would open a beautiful modal with full dish details, ingredients, and ordering options.`);
        
        // Example: You can create a modal instead
        /*
        showDishModal({
            name: dishName,
            price: dishPrice,
            description: dishDescription,
            image: dishCard.querySelector('.dish-image').src
        });
        */
    });
});

// ============================================
// SET MINIMUM DATE FOR RESERVATION (Today)
// ============================================

function setMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    dateInput.setAttribute('min', minDate);
}

setMinDate();

// ============================================
// LOADING ANIMATION (Optional - runs on page load)
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ============================================
// PARALLAX EFFECT (Optional enhancement)
// ============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function handleParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax on hero image
    const heroImage = document.querySelector('.food-hero-img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🍽️ Welcome to Savoria! ', 'background: #ff6b35; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cBuilt with passion for culinary excellence', 'color: #8b5a3c; font-size: 14px;');
console.log('%cInterested in the code? Check out the HTML, CSS, and JS files!', 'color: #666; font-size: 12px;');

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// PERFORMANCE MONITORING (Development only)
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for review slider
document.addEventListener('keydown', (e) => {
    if (e.target.closest('.reviews-slider')) {
        if (e.key === 'ArrowLeft') {
            reviewPrev.click();
        } else if (e.key === 'ArrowRight') {
            reviewNext.click();
        }
    }
});

// Focus trap for mobile menu (accessibility)
navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.focus();
    }
});

// ============================================
// IMAGE LAZY LOADING FALLBACK
// ============================================

// Modern browsers support native lazy loading, but here's a fallback
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
    document.body.appendChild(script);
}

// ============================================
// END OF SCRIPT
// ============================================

console.log('✅ All scripts loaded successfully!');