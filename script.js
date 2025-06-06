document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (keep existing)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link (keep existing)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect (keep existing)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate skill bars when they come into view (keep existing)
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

    // Intersection Observer for skill bars animation (keep existing)
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

    observer.observe(skillsSection);

    // Updated Project Data with Categories
    const projects = [
        {
            title: "E-commerce Platform",
            description: "A full-featured online store with product listings, cart functionality, and secure checkout.",
            category: "web",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Task Management App",
            description: "A productivity application for organizing tasks with drag-and-drop functionality and team collaboration.",
            category: "web",
            tags: ["Vue.js", "Firebase", "Tailwind CSS"],
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Weather Dashboard",
            description: "Real-time weather information with 5-day forecast using data from a weather API.",
            category: "web",
            tags: ["JavaScript", "API", "CSS3"],
            image: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Social Media Dashboard",
            description: "Analytics dashboard for social media metrics with interactive charts and data visualization.",
            category: "data",
            tags: ["React", "Chart.js", "REST API"],
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Recipe Finder App",
            description: "Search for recipes based on ingredients with filtering options and nutritional information.",
            category: "data",
            tags: ["React Native", "Edamam API", "Redux"],
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website to showcase my work and skills (this website!).",
            category: "web",
            tags: ["HTML5", "CSS3", "JavaScript"],
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            liveUrl: "#",
            codeUrl: "#"
        }
    ];

    // Render Projects with Filtering
    function renderProjects(filter = "all") {
        const grid = document.querySelector(".projects-grid");
        grid.innerHTML = "";

        const filteredProjects = filter === "all" 
            ? projects 
            : projects.filter(p => p.category === filter);

        filteredProjects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.dataset.category = project.category;
            card.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="btn primary">Live Demo</a>
                        <a href="${project.codeUrl}" class="btn secondary">View Code</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Setup Filter Buttons
    function setupFilters() {
        const buttons = document.querySelectorAll(".filter-btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                renderProjects(button.dataset.filter);
            });
        });
    }

    // Initialize Projects
    renderProjects();
    setupFilters();

    // Form submission (keep existing)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Thank you for your message! I will get back to you soon.');
    this.reset();
});
    }
    

    // Newsletter form submission (keep existing)
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
       newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input');
    showToast(`Thank you for subscribing with ${emailInput.value}!`);
    emailInput.value = '';
});
    }
});
// Auto-update year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();