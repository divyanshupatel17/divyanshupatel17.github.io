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

    // 1. Hero Parallax
    gsap.to(".parallax-bg", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        yPercent: 30, // Move background down
        scale: 1.1 // Subtle scale
    });

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


    // 3. Contact Section Composite Parallax
    const contactTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    contactTimeline
        .to(".contact-layer-back", { yPercent: 20 }, 0) // Moves slower
        .to(".contact-layer-mid", { yPercent: 40 }, 0)  // Moves medium
        .to(".contact-layer-front", { yPercent: 60 }, 0); // Moves faster


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
});
