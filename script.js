document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Loader
    const tlLoader = gsap.timeline();
    tlLoader
        .to('.loader-text', {
            opacity: 0,
            duration: 0.5,
            delay: 1
        })
        .to('.loader', {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut'
        })
        .to('body', {
            className: 'loaded'
        }, "-=0.5");

    // Navbar Scroll Effect
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-items a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    // Animations

    // Hero Text Stagger
    gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 2 // Wait for loader
    });

    // Global Parallax for all Sections
    gsap.utils.toArray('.parallax-wrapper').forEach((wrapper, i) => {
        const bg = wrapper.querySelector('.parallax-bg');
        // Check for Specific Composite Layers
        const lBack = wrapper.querySelector('[class*="layer-back"]');
        const lMid = wrapper.querySelector('[class*="layer-mid"]');
        const lFront = wrapper.querySelector('[class*="layer-front"]');

        // 1. Composite Layer Case (Contact)
        if (lBack && lMid && lFront) {
            gsap.to(lBack, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true } });
            gsap.to(lMid, { yPercent: 30, ease: 'none', scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true } });
            gsap.to(lFront, { yPercent: 45, ease: 'none', scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom top', scrub: true } });
        }
        // 2. Default Diagonal Parallax (Randomized Direction)
        else if (bg) {
            // Random direction: -1 (Left-to-Right) or 1 (Right-to-Left)
            const xDir = i % 2 === 0 ? -1 : 1;

            // Start from opposite side (-x) and move to side (x)
            // Scale is 120%, so we have +/- 10% wiggle room
            gsap.fromTo(bg,
                { xPercent: 10 * xDir, yPercent: -10 },
                {
                    xPercent: -10 * xDir,
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }
    });

    // Modern Mouse Move Parallax for Hero (Enhanced)
    const heroSection = document.querySelector('#hero');
    const heroBg = heroSection.querySelector('.parallax-bg'); // Select specifically the hero bg

    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // range -10 to 10
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.hero-content', {
            x: x * 1.5,
            y: y * 1.5,
            duration: 1,
            ease: 'power2.out'
        });

        // Apply mouse move to hero bg as well, compounding with scroll trigger
        gsap.to(heroBg, {
            x: -x * 3,
            y: -y * 3,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Section Titles Fade In
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // HORIZONTAL SCROLL FOR PROJECTS
    const projectsSection = document.querySelector('.projects-section');
    const projectsContainer = document.querySelector('.projects-container');

    // Calculate scroll distance: Total width of container - viewport width
    // Tailwind layout: 400% width container works well with -75% move?
    // Let's rely on scrollWidth for accuracy

    // Note: GSAP works best with explicit widths, but we can just use a large percentage 
    // since we set container width to 400% in CSS/Tailwind

    let scrollTween = gsap.to(projectsContainer, {
        xPercent: -75, // Move left to reveal all 4 parts (Intro + 3 Projects)
        ease: "none",
        scrollTrigger: {
            trigger: projectsSection,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=3500", // Increased scroll distance for slower, "snap-like" feel
        }
    });

    // ALTERNATING ZOOM PARALLAX FOR PROJECT IMAGES
    const projectImages = document.querySelectorAll('.project-preview img');
    projectImages.forEach((img, index) => {
        // Subtle Zoom + Pan
        gsap.fromTo(img,
            { scale: 1.2, xPercent: index % 2 === 0 ? -10 : 10 },
            {
                scale: 1.0,
                xPercent: index % 2 === 0 ? 10 : -10,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.project-card'),
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            }
        );
    });

    // About Image Parallax
    gsap.to('.about-image', {
        yPercent: -20, // Move image slightly against scroll
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Skills Fade Up
    const categories = gsap.utils.toArray('.skill-category');
    categories.forEach((cat, i) => {
        gsap.from(cat, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: cat,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Project Parallax Images
    gsap.utils.toArray('.project-item').forEach(project => {
        const img = project.querySelector('.project-preview img');

        // Parallax for image inside container
        gsap.fromTo(img,
            { yPercent: -15 },
            {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: project,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );

        // Fade in whole item
        gsap.from(project.querySelector('.project-content'), {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: project,
                start: 'top 80%'
            }
        });
    });

    // Footer Reveal
    /*     gsap.from('.contact-wrapper', {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 70%'
            }
        }); */

});
