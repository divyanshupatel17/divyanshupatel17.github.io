document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Fade In Body
    document.body.classList.add('loaded');

    // Smooth Scroll (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Audio Player ---
    const musicBtn = document.getElementById('music-btn');
    const audio = new Audio('src/space.mp3');
    audio.loop = true;
    audio.volume = 0.2; // Start with low volume
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="ri-music-2-line text-lg"></i>';
            musicBtn.classList.remove('text-white');
            musicBtn.classList.add('text-accent');
        } else {
            audio.play().catch(error => console.log("Audio play failed:", error));
            musicBtn.innerHTML = '<i class="ri-pause-line text-lg"></i>';
            musicBtn.classList.remove('text-accent');
            musicBtn.classList.add('text-white');
        }
        isPlaying = !isPlaying;
    });

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            mobileMenuBtn.innerHTML = '<i class="ri-close-line"></i>';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
            document.body.style.overflow = '';
        });
    });

    // --- Animations ---



    // 2. Project Cards Fade In
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });





    // 4. Fade In Elements (Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });

    // --- Hackathon Data Fetching & Rendering ---
    const hackathonContainer = document.getElementById('hackathon-container');

    if (hackathonContainer) {
        fetch('src/hackathons.json')
            .then(response => response.json())
            .then(data => {
                // Sort by date (newest first)
                data.sort((a, b) => new Date(b.date) - new Date(a.date));

                function renderHackathons(data) {
                    hackathonContainer.innerHTML = '';

                    // 1. Create Cards
                    data.forEach((hackathon, index) => {
                        const card = document.createElement('div');
                        card.classList.add('hackathon-card');
                        card.dataset.index = index; // Store index for row calc

                        // Add tier class for styling
                        const tier = hackathon.tier || 'bronze';

                        const dateObj = new Date(hackathon.date);
                        const formattedDate = dateObj.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        card.innerHTML = `
                            <div class="hackathon-card-content">
                                <div class="hackathon-header">
                                    <div class="hackathon-icon-box tier-${tier}">
                                        <i class="ri-trophy-fill"></i>
                                    </div>
                                    <div class="hackathon-meta">
                                        <span class="hackathon-name">${hackathon.hackathonName}</span>
                                        <h3 class="project-title">${hackathon.projectName}</h3>
                                    </div>
                                </div>
                                
                                <div class="hackathon-date-row">
                                    <i class="ri-calendar-line"></i> ${formattedDate}
                                </div>

                                <div class="hackathon-details-expand">
                                    <div class="detail-section">
                                        <span class="detail-label">PROBLEM</span>
                                        <p class="detail-text">${hackathon.problemStatement}</p>
                                    </div>
                                    
                                    <div class="detail-section">
                                        <span class="detail-label">SOLUTION</span>
                                        <p class="detail-text">${hackathon.solution}</p>
                                    </div>

                                    <div class="hackathon-actions">
                                        <a href="${hackathon.repoUrl}" target="_blank" class="btn-action primary">
                                            <i class="ri-github-fill"></i> GitHub
                                        </a>
                                        <a href="${hackathon.hackathonUrl}" target="_blank" class="btn-action secondary">
                                            Event Page <i class="ri-arrow-right-up-line"></i>
                                        </a>
                                        <a href="${hackathon.liveDemo}" target="_blank" class="btn-action secondary">
                                            Live Demo <i class="ri-arrow-right-line"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        `;

                        hackathonContainer.appendChild(card);

                        // Trigger animation for new elements
                        if (typeof observer !== 'undefined') {
                            observer.observe(card);
                        }
                    });

                    // 2. Implement Synchronized Row Hover
                    const cards = Array.from(document.querySelectorAll('.hackathon-card'));

                    const getGridColumns = () => {
                        if (window.innerWidth >= 1024) return 3; // lg
                        if (window.innerWidth >= 768) return 2;  // md
                        return 1;                                // base
                    };

                    const handleRowHover = (index, isHovering) => {
                        const cols = getGridColumns();
                        const rowStart = Math.floor(index / cols) * cols;
                        const rowEnd = rowStart + cols;

                        for (let i = rowStart; i < rowEnd; i++) {
                            if (cards[i]) {
                                if (isHovering) {
                                    cards[i].classList.add('row-expanded');
                                } else {
                                    cards[i].classList.remove('row-expanded');
                                }
                            }
                        }
                    };

                    cards.forEach((card, index) => {
                        card.addEventListener('mouseenter', () => handleRowHover(index, true));
                        card.addEventListener('mouseleave', () => handleRowHover(index, false));
                    });
                }
                renderHackathons(data);
            })
            .catch(error => console.error('Error loading hackathons:', error));
    }
});
