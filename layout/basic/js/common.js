/* ============================================
   BLOOM - Common JavaScript
   ============================================ */

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Search Overlay
function openSearch() {
    document.getElementById('searchOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.querySelector('.search-form input').focus();
    }, 300);
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Close search on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSearch();
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const btn = document.querySelector('.mobile-menu-btn');
    nav.classList.toggle('active');
    btn.classList.toggle('active');
}

// Product Image Gallery (for detail page)
function changeMainImage(src) {
    document.querySelector('.main-image img').src = src;
}

// Thumbnail Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail-list li');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const imgSrc = this.querySelector('img').src;
            changeMainImage(imgSrc);
        });
    });
});

// Quantity Control
function updateQuantity(action) {
    const input = document.querySelector('.quantity-control input');
    let value = parseInt(input.value) || 1;

    if (action === 'plus') {
        value++;
    } else if (action === 'minus' && value > 1) {
        value--;
    }

    input.value = value;
}

// Tab Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tabs button, .product-tabs button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            const siblings = this.parentElement.querySelectorAll('button');
            siblings.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab content
            const target = this.getAttribute('data-tab');
            if (target) {
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                document.getElementById(target).style.display = 'block';
            }
        });
    });
}

// FAQ Accordion
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item .question');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#none') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initFaq();
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}
