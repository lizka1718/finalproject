// ==============================================
// ANIME LANDING PAGE - INTERACTIVE FEATURES
// ==============================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initCookieConsent();
    initBurgerMenu();
    initFormValidation();
    initScrollToTop();
    initHeaderScroll();
    initAnimeAPI();
    initGenreDropdown();
    initSmoothScrolling();
    initAnimations();
});

// ==============================================
// COOKIE CONSENT FUNCTIONALITY
// ==============================================

function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show cookie consent banner
        setTimeout(() => {
            cookieConsent.classList.remove('hidden');
        }, 1000);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.add('hidden');
        showNotification('Cookies accepted! Thank you 🍪', 'success');
    });
    
    // Decline cookies
    declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.add('hidden');
        showNotification('Cookies declined. Some features may be limited.', 'info');
    });
}

// ==============================================
// BURGER MENU FUNCTIONALITY
// ==============================================

function initBurgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeMenu.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ==============================================
// FORM VALIDATION
// ==============================================

function initFormValidation() {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');
    const termsCheckbox = document.getElementById('terms');
    
    // Regex patterns
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;
    
    // Password toggle functionality
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const showText = passwordToggle.querySelector('.show-text');
        const hideText = passwordToggle.querySelector('.hide-text');
        
        showText.classList.toggle('hidden');
        hideText.classList.toggle('hidden');
    });
    
    // Real-time validation
    nameInput.addEventListener('input', function() {
        validateField(nameInput, nameRegex, 'Name must contain only letters and spaces (2-30 characters)');
    });
    
    emailInput.addEventListener('input', function() {
        validateField(emailInput, emailRegex, 'Please enter a valid email address');
    });
    
    passwordInput.addEventListener('input', function() {
        validateField(passwordInput, passwordRegex, 'Password must be at least 8 characters long');
    });
    
    termsCheckbox.addEventListener('change', function() {
        validateCheckbox(termsCheckbox, 'You must agree to the Terms of Service');
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, nameRegex, 'Name must contain only letters and spaces (2-30 characters)');
        const isEmailValid = validateField(emailInput, emailRegex, 'Please enter a valid email address');
        const isPasswordValid = validateField(passwordInput, passwordRegex, 'Password must be at least 8 characters long');
        const isTermsValid = validateCheckbox(termsCheckbox, 'You must agree to the Terms of Service');
        
        if (isNameValid && isEmailValid && isPasswordValid && isTermsValid) {
            // Simulate successful registration
            showNotification('🎉 Registration successful! Welcome to Anime World!', 'success');
            form.reset();
            clearValidationErrors();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showNotification('❌ Please fix the errors and try again.', 'error');
        }
    });
}

function validateField(input, regex, errorMessage) {
    const errorElement = document.getElementById(input.id + '-error');
    const value = input.value.trim();
    
    if (!value) {
        showFieldError(input, errorElement, 'This field is required');
        return false;
    }
    
    if (!regex.test(value)) {
        showFieldError(input, errorElement, errorMessage);
        return false;
    }
    
    showFieldSuccess(input, errorElement);
    return true;
}

function validateCheckbox(checkbox, errorMessage) {
    const errorElement = document.getElementById(checkbox.id + '-error');
    
    if (!checkbox.checked) {
        showFieldError(checkbox, errorElement, errorMessage);
        return false;
    }
    
    showFieldSuccess(checkbox, errorElement);
    return true;
}

function showFieldError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
}

function showFieldSuccess(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

function clearValidationErrors() {
    const inputs = document.querySelectorAll('.registration-form input');
    const errorElements = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => input.classList.remove('error'));
    errorElements.forEach(element => element.textContent = '');
}

// ==============================================
// SCROLL TO TOP FUNCTIONALITY
// ==============================================

function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==============================================
// HEADER SCROLL EFFECT
// ==============================================

function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==============================================
// ANIME API INTEGRATION
// ==============================================

function initAnimeAPI() {
    fetchPopularAnime();
}

async function fetchPopularAnime() {
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const animeGrid = document.getElementById('anime-grid');
    
    try {
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        animeGrid.innerHTML = '';
        
        // Using Jikan API for better anime data
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=12');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayAnimeData(data.data);
        } else {
            throw new Error('No anime data found');
        }
        
    } catch (error) {
        console.error('Error fetching anime data:', error);
        showAnimeError('Failed to load anime data. Showing sample content instead.');
        displaySampleAnime();
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function displayAnimeData(animeList) {
    const animeGrid = document.getElementById('anime-grid');
    animeGrid.innerHTML = '';
    
    animeList.forEach((anime, index) => {
        const animeCard = createAnimeCard({
            title: anime.title || 'Unknown Title',
            image: anime.images?.jpg?.image_url || '',
            rating: anime.score || 'N/A',
            synopsis: anime.synopsis || 'No description available.',
            year: anime.year || 'Unknown',
            episodes: anime.episodes || 'Unknown'
        });
        
        // Add staggered animation
        animeCard.style.animationDelay = `${index * 0.1}s`;
        animeCard.classList.add('animate-fade-in-up');
        
        animeGrid.appendChild(animeCard);
    });
}

function displaySampleAnime() {
    const sampleAnime = [
        {
            title: "Attack on Titan",
            image: "",
            rating: "9.0",
            synopsis: "Humanity fights for survival against giant humanoid Titans.",
            year: "2013",
            episodes: "25"
        },
        {
            title: "Demon Slayer",
            image: "",
            rating: "8.7",
            synopsis: "A young boy becomes a demon slayer to save his sister.",
            year: "2019",
            episodes: "26"
        },
        {
            title: "My Hero Academia",
            image: "",
            rating: "8.5",
            synopsis: "A boy without superpowers dreams of becoming a hero.",
            year: "2016",
            episodes: "13"
        },
        {
            title: "One Piece",
            image: "",
            rating: "9.2",
            synopsis: "A pirate crew searches for the ultimate treasure.",
            year: "1999",
            episodes: "1000+"
        },
        {
            title: "Naruto",
            image: "",
            rating: "8.9",
            synopsis: "A ninja with a demon fox sealed within him seeks recognition.",
            year: "2002",
            episodes: "220"
        },
        {
            title: "Death Note",
            image: "",
            rating: "9.1",
            synopsis: "A student discovers a supernatural notebook that kills anyone whose name is written in it.",
            year: "2006",
            episodes: "37"
        }
    ];
    
    displayAnimeData(sampleAnime);
}

function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    
    const imageUrl = anime.image || `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'><rect width='300' height='400' fill='%23${Math.floor(Math.random()*16777215).toString(16)}'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='white' font-size='24'>🎌</text></svg>`;
    
    card.innerHTML = `
        <div class="anime-image">
            ${anime.image ? 
                `<img src="${anime.image}" alt="${anime.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                 <div style="display:none; width:100%; height:100%; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); align-items:center; justify-content:center; font-size:3rem; color:white;">🎌</div>` :
                `<div style="width:100%; height:100%; background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%); display:flex; align-items:center; justify-content:center; font-size:3rem; color:white;">🎌</div>`
            }
        </div>
        <div class="anime-info">
            <h3 class="anime-title">${anime.title}</h3>
            <div class="anime-rating">
                <span>⭐</span>
                <span>${anime.rating}</span>
                ${anime.year ? `<span style="margin-left: auto; color: var(--text-muted); font-size: 0.9rem;">${anime.year}</span>` : ''}
            </div>
            <p class="anime-description">${truncateText(anime.synopsis, 100)}</p>
            ${anime.episodes ? `<div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">Episodes: ${anime.episodes}</div>` : ''}
        </div>
    `;
    
    return card;
}

function showAnimeError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.querySelector('p').textContent = message;
    errorMessage.classList.remove('hidden');
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// ==============================================
// GENRE DROPDOWN FUNCTIONALITY
// ==============================================

function initGenreDropdown() {
    const genreDropdown = document.getElementById('genre-dropdown');
    const genreCards = document.querySelectorAll('.genre-card');
    
    genreDropdown.addEventListener('change', function() {
        const selectedGenre = this.value.toLowerCase();
        
        if (selectedGenre) {
            // Highlight corresponding genre card
            genreCards.forEach(card => {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                if (cardTitle === selectedGenre) {
                    card.style.transform = 'scale(1.05)';
                    card.style.boxShadow = 'var(--shadow-xl)';
                    card.style.borderColor = 'var(--primary-color)';
                    
                    // Scroll to card
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                } else {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                    card.style.borderColor = '';
                }
            });
            
            showNotification(`Selected genre: ${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} 🎭`, 'success');
        } else {
            // Reset all cards
            genreCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            });
        }
    });
    
    // Add click listeners to genre cards
    genreCards.forEach(card => {
        card.addEventListener('click', function() {
            const genreTitle = this.querySelector('h3').textContent.toLowerCase();
            genreDropdown.value = genreTitle;
            genreDropdown.dispatchEvent(new Event('change'));
        });
    });
}

// ==============================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==============================================

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==============================================
// ANIMATIONS ON SCROLL
// ==============================================

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    const cards = document.querySelectorAll('.genre-card, .contact-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        max-width: 350px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--success-color)';
        case 'error': return 'var(--error-color)';
        case 'warning': return 'var(--warning-color)';
        default: return 'var(--primary-color)';
    }
}

// ==============================================
// KEYBOARD ACCESSIBILITY
// ==============================================

document.addEventListener('keydown', function(e) {
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
    
    // Space key on custom checkboxes
    if (e.key === ' ' && e.target.type === 'checkbox') {
        e.preventDefault();
        e.target.checked = !e.target.checked;
        e.target.dispatchEvent(new Event('change'));
    }
});

// ==============================================
// ADD NOTIFICATION ANIMATIONS TO CSS
// ==============================================

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
    
    .notification {
        cursor: pointer;
        user-select: none;
    }
    
    .notification:hover {
        transform: translateX(-5px);
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);

// ==============================================
// PERFORMANCE OPTIMIZATION
// ==============================================

// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Scroll handlers here are already optimized
    // This is for any additional scroll functionality
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ==============================================
// ERROR HANDLING
// ==============================================

window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Failed to load some content. Please check your connection.', 'warning');
});

// ==============================================
// WELCOME MESSAGE
// ==============================================

// Show welcome message after page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        showNotification('🎌 Welcome to Anime World! Discover amazing anime series.', 'success');
    }, 2000);
});

console.log('🎌 Anime World loaded successfully! All features initialized.'); 