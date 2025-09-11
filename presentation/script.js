// APER Data Centralization Presentation - Scrollable Version
let totalSlides = 0;
let slides = [];

document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupSmoothScrolling();
    setupAnimations();
});

function initializePresentation() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    
    // Update total slides counter
    const totalSlidesElement = document.getElementById('totalSlides');
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
    // Update current slide counter to show "Scrollable"
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = 'Scrollable';
    }
    
    console.log(`APER Presentation initialized with ${totalSlides} slides (scrollable mode)`);
    
    // Trigger animations for visible slides
    observeSlideVisibility();
}

function setupSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optional: Add scroll-to-slide functionality for navigation
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            scrollToSlide(index);
        });
    });
}

function scrollToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        const slide = slides[index];
        slide.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupAnimations() {
    // Setup intersection observer for slide animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerSlideAnimations(entry.target);
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        observer.observe(slide);
    });
}

function observeSlideVisibility() {
    // Update current slide indicator based on scroll position
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = Array.from(slides).indexOf(entry.target);
                updateCurrentSlideIndicator(slideIndex);
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        observer.observe(slide);
    });
}

function updateCurrentSlideIndicator(index) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    // Update slide counter
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
        currentSlideElement.textContent = index + 1;
    }
}

function triggerSlideAnimations(slide) {
    // Add entrance animations based on slide content
    const animatedElements = slide.querySelectorAll(
        '.overview-item, .deliverable-card, .tech-card, .timeline-item, .stat, .migration-step'
    );
    
    animatedElements.forEach((element, index) => {
        if (!element.classList.contains('animated')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animated');
            }, index * 150);
        }
    });
    
    // Animate numbers for stats
    const statNumbers = slide.querySelectorAll('.stat-number, .data-count, .price-amount');
    statNumbers.forEach(stat => {
        if (!stat.classList.contains('animated')) {
            setTimeout(() => {
                animateNumber(stat);
                stat.classList.add('animated');
            }, 500);
        }
    });
}

function animateNumber(element) {
    const targetText = element.textContent;
    const isPercentage = targetText.includes('%');
    const isDollar = targetText.includes('$');
    const hasPlus = targetText.includes('+');
    const hasComma = targetText.includes(',');
    
    // Extract number from text
    let targetNumber = parseFloat(targetText.replace(/[^0-9.]/g, ''));
    
    if (isNaN(targetNumber)) return;
    
    let currentNumber = 0;
    const increment = targetNumber / 30; // 30 steps
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentNumber);
        
        // Format the number appropriately
        if (isDollar && targetNumber >= 1000) {
            if (targetNumber >= 1000000000) {
                displayValue = `$${(currentNumber / 1000000000).toFixed(1)}B`;
            } else if (targetNumber >= 1000000) {
                displayValue = `$${(currentNumber / 1000000).toFixed(1)}M`;
            } else if (targetNumber >= 1000) {
                displayValue = `$${(currentNumber / 1000).toFixed(1)}K`;
            } else {
                displayValue = `$${displayValue}`;
            }
        } else if (hasComma && targetNumber >= 1000 && !isDollar) {
            displayValue = displayValue.toLocaleString();
        }
        
        if (hasPlus && currentNumber >= targetNumber) {
            displayValue += '+';
        }
        
        if (isPercentage) {
            displayValue += '%';
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen().catch(err => {
            console.log(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
}

function exitFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
            console.log(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
}

function resetPresentation() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Demo function for system showcase
function showSystemDemo() {
    console.log('System demo requested');
    
    const demoButton = event.target.closest('.demo-button');
    if (!demoButton) return;
    
    const originalText = demoButton.innerHTML;
    
    demoButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Demo...';
    demoButton.disabled = true;
    
    setTimeout(() => {
        demoButton.innerHTML = originalText;
        demoButton.disabled = false;
        
        showNotification('Demo functionality would open here in the actual implementation.');
    }, 2000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.95);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        font-size: 1.1rem;
        font-weight: 600;
        z-index: 10000;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
        max-width: 500px;
        text-align: center;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Navigation functions for backward compatibility
function nextSlide() {
    const currentScroll = window.pageYOffset;
    const slideHeight = window.innerHeight;
    const nextPosition = currentScroll + slideHeight;
    window.scrollTo({ top: nextPosition, behavior: 'smooth' });
}

function prevSlide() {
    const currentScroll = window.pageYOffset;
    const slideHeight = window.innerHeight;
    const prevPosition = Math.max(0, currentScroll - slideHeight);
    window.scrollTo({ top: prevPosition, behavior: 'smooth' });
}

function goToSlide(index) {
    scrollToSlide(index);
}

// Export functions for global access
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
window.toggleFullscreen = toggleFullscreen;
window.resetPresentation = resetPresentation;
window.showSystemDemo = showSystemDemo;

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'Home':
            e.preventDefault();
            resetPresentation();
            break;
        case 'End':
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            break;
        case 'Escape':
            e.preventDefault();
            exitFullscreen();
            break;
        case 'F11':
            e.preventDefault();
            toggleFullscreen();
            break;
    }
});