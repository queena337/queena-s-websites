// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==================== HAMBURGER MENU (MOBILE) ====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close menu when clicking on nav link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ==================== TYPING ANIMATION ====================
const words = ["Web Designer", "UI/UX Design", "Creative Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.querySelector(".typed");

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const speed = isDeleting ? 100 : 200;
    setTimeout(typeEffect, speed);
}

if (typedElement) {
    typeEffect();
}

// ==================== SKILL PROGRESS BAR ====================
function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach(bar => {
        const width = bar.getAttribute("data-width");
        if (width) {
            bar.style.width = width;
        }
    });
}

// ==================== STATS COUNTER ANIMATION ====================
function animateStats() {
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target"));
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateCounter, 30);
            } else {
                stat.textContent = target;
            }
        };
        updateCounter();
    });
}

// ==================== SCROLL REVEAL ANIMATION ====================
function checkScroll() {
    const elements = document.querySelectorAll(".about-image, .about-text, .service-card, .portfolio-item, .stat-item, .contact-info, .contact-form");
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.classList.add("visible");
        }
    });
    
    // Check skill bars
    const aboutSection = document.querySelector(".about");
    if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (aboutTop < windowHeight - 100) {
            animateSkills();
        }
    }
    
    // Check stats section
    const statsSection = document.querySelector(".stats");
    if (statsSection) {
        const statsTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsTop < windowHeight - 100) {
            animateStats();
        }
    }
}

// Add visible class to elements initially
document.querySelectorAll(".about-image, .about-text, .service-card, .portfolio-item, .stat-item, .contact-info, .contact-form").forEach(el => {
    el.classList.add("animate-on-scroll");
});

// ==================== PORTFOLIO FILTER ====================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");
            
            const filterValue = button.getAttribute("data-filter");
            
            portfolioItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 10);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

// ==================== CONTACT FORM SUBMIT ====================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Terima kasih! Pesan Anda telah terkirim.");
        contactForm.reset();
    });
}

// ==================== SMOOTH SCROLL FOR NAV LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ==================== INITIALIZE ON LOAD ====================
window.addEventListener("load", () => {
    checkScroll();
    // Set initial opacity for portfolio items
    portfolioItems.forEach(item => {
        item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    });
});

window.addEventListener("scroll", checkScroll);
