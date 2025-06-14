document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(darkModeToggle);

    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'dark' || (!savedMode && systemDark)) {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'dark');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'light');
    }

    function toggleDarkMode() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Intersection Observer for skill bars animation
    const skillsSection = document.querySelector('.skills');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Project Data with Categories
    const projects = [
        {
            title: "SCHOOLPro",
            description: "A streamlined school management system that handles student records, exam reports, fee payments, and instant SMS updates to parents.",
            category: "Desktop",
            tags: ["C#", "SQL Server", "SMS Integration"],
            image: "images/schoolpro.avif",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "EPL Race Chart",
            description: "Dynamic Python visualizations that bring football seasons to life — watch teams climb and fall across 38 matchweeks in seconds.",
            category: "data",
            tags: ["Python", "Pandas", "Matplotlib", "Web Scraping"],
            image: "/images/race_chart.png",
            videoId: "ejXOeJgTM9o",
            codeUrl: "#"
        },
        {
            title: "Climate Finance Watch",
            description: "A Django-powered tool designed to promote transparency and accountability in climate finance in Kenya.",
            category: "Web",
            tags: ["Django", "PostgreSQL", "D3.js", "Data Visualization"],
            image: "images/climate.avif",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Library Pro",
            description: "A Django-powered system with RFID tracking, predictive search, and streamlined borrowing.",
            category: "Web",
            tags: ["Django", "Python", "Bootstrap", "jQuery"],
            image: "images/lib.jpg",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Social Media Dashboard",
            description: "Analytics dashboard for social media metrics with interactive charts and data visualization.",
            category: "data",
            tags: ["React", "Chart.js", "REST API"],
            image: "images/social.avif",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Weather Dashboard",
            description: "Real-time weather information with 5-day forecast using data from a weather API.",
            category: "web",
            tags: ["JavaScript", "API", "CSS3"],
            image: "images/climate.avif",
            liveUrl: "#",
            codeUrl: "#"
        }
    ];

    // Render Projects with Filtering and Staggered Animations
    function renderProjects(filters = []) {
        const grid = document.querySelector(".projects-grid");
        if (!grid) return;
        
        grid.innerHTML = "";

        const filteredProjects = filters.length === 0 
            ? projects 
            : projects.filter(p => filters.includes(p.category));

        filteredProjects.forEach((project, index) => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.dataset.category = project.category;
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" width="350" height="200">
                    ${project.videoId ? 
                        `<div class="play-overlay" onclick="showVideoModal('${project.videoId}')" role="button" aria-label="Play ${project.title} demo">
                            <i class="fas fa-play-circle"></i>
                        </div>` : ''
                    }
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
                    </div>
                    <div class="project-links">
                        ${project.videoId ? 
                            `<button onclick="showVideoModal('${project.videoId}')" class="btn primary" aria-label="Watch ${project.title} demo">
                                <i class="fas fa-play"></i> Watch Demo
                            </button>` : 
                            `<a href="${project.liveUrl}" class="btn primary" aria-label="View ${project.title} live demo">Live Demo</a>`
                        }
                        <a href="${project.codeUrl}" class="btn secondary" aria-label="View ${project.title} source code">More Details</a>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
            
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);
        });
    }

    // Setup Filter Buttons with multi-select capability
    function setupFilters() {
        const buttons = document.querySelectorAll(".filter-btn");
        if (!buttons.length) return;
        
        let activeFilters = [];
        
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;
                
                if (filter === "all") {
                    activeFilters = [];
                    buttons.forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                } else {
                    button.classList.toggle("active");
                    if (button.classList.contains("active")) {
                        activeFilters.push(filter);
                    } else {
                        activeFilters = activeFilters.filter(f => f !== filter);
                    }
                    
                    const allBtn = document.querySelector('[data-filter="all"]');
                    if (activeFilters.length === 0) {
                        allBtn.classList.add("active");
                    } else {
                        allBtn.classList.remove("active");
                    }
                }
                
                renderProjects(activeFilters);
            });
        });
    }

    // Initialize Projects
    renderProjects();
    setupFilters();

    // Form submission with proper Netlify handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });
                
                if (response.ok) {
                    showToast('Message sent successfully!');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                showToast('Error sending message. Please try again later.', 'error');
                console.error('Form submission error:', error);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Scroll-triggered animations for sections
    const sections = document.querySelectorAll('section:not(#home)');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    // Debounce scroll event for better performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkScroll, 66);
    }, false);
    
    // Initial check on load
    checkScroll();
});

// Toast notification function with type support
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Video Modal Functions
function showVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    if (!modal || !iframe) return;
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('allowfullscreen', '');
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus trap for accessibility
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.focus();
    
    modal.addEventListener('keydown', function trapFocus(e) {
        if (e.key === 'Escape') {
            closeVideo();
        }
        
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === closeBtn) {
                e.preventDefault();
                iframe.focus();
            } else if (!e.shiftKey && document.activeElement === iframe) {
                e.preventDefault();
                closeBtn.focus();
            }
        }
    });
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-iframe');
    
    if (!modal || !iframe) return;
    
    iframe.src = "";
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
    const modal = document.getElementById('video-modal');
    if (modal && e.target === modal) {
        closeVideo();
    }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        closeVideo();
    }
});

// Auto-update copyright year
window.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});