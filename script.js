// Custom Cursor logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Slight delay for follower
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor interactive states
const hoverLinks = document.querySelectorAll('a, .btn-primary, .skill-list li, .glass-card, .marquee span');

hoverLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
    });
});

// Navbar background on scroll and Parallax Hero Background
const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const bgTextWrapper = document.getElementById('bgTextWrapper');
const heroPortrait = document.querySelector('.hero-portrait-container');

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    
    // Navbar
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Subtle parallax for hero section (background layer)
    if(hero) hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});

// Advanced mouse parallax for the Lando style hero portrait / wireframe
document.addEventListener('mousemove', (e) => {
    // Only animate if hero is visible to save performance
    if (window.scrollY < window.innerHeight) {
        // Calculate offsets safely
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        if (heroPortrait) {
            heroPortrait.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (bgTextWrapper) {
            bgTextWrapper.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
        }
    }
});

// Scroll Reveal Animation via Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            // Stop observing once animated for performance, or keep it to re-animate
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Magnetic Buttons Interaction
const magnets = document.querySelectorAll('.btn-primary, .nav-links a, .logo');

magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', function(e) {
        const position = magnet.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        magnet.style.transition = 'all 0s linear';
    });
    
    magnet.addEventListener('mouseleave', function() {
        magnet.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        magnet.style.transform = `translate(0px, 0px)`;
    });
});
