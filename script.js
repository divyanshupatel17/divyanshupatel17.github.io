/* ======================================
   PORTFOLIO - LARGE POLYGON 3D
   Less stars, more dramatic shapes
   ====================================== */

window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
        initApp();
    }, 1800);
});

function initApp() {
    new PolygonSpace();
    new Navigation();
    new TypeWriter();
    new CustomCursor();
    new ThemeToggle();
    new ScrollAnimations();
    new MagneticButtons();
    new TiltCards();
}

// ======================================
// POLYGON SPACE SCENE
// Large/medium 3D polygons + minimal stars
// ======================================
class PolygonSpace {
    constructor() {
        this.canvas = document.getElementById('space-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });

        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.scrollProgress = 0;

        this.polygons = [];
        this.stars = null;

        // Scroll zoom effect state
        this.lastScrollTime = Date.now();
        this.scrollDirection = 1; // 1 = down (zoom in), -1 = up (zoom out)
        this.lastScrollY = 0;
        this.idleZoomSpeed = 0;
        this.targetZoomSpeed = 0.15; // Speed of continuous zoom when idle

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 80;

        this.createPolygons();
        this.createMinimalStars();
        this.createGlowOrbs();

        this.setupScrollTrigger();

        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        this.animate();
    }

    createPolygons() {
        // Large and medium polygon shapes
        const shapes = [
            // Large polygons
            { geo: new THREE.IcosahedronGeometry(25, 1), pos: { x: -80, y: 40, z: -100 }, color: 0x6366f1, opacity: 0.08 },
            { geo: new THREE.OctahedronGeometry(20, 0), pos: { x: 90, y: -30, z: -150 }, color: 0x22d3ee, opacity: 0.06 },
            { geo: new THREE.DodecahedronGeometry(18, 0), pos: { x: -60, y: -50, z: -200 }, color: 0x8b5cf6, opacity: 0.07 },
            { geo: new THREE.IcosahedronGeometry(30, 1), pos: { x: 70, y: 60, z: -250 }, color: 0xf472b6, opacity: 0.05 },

            // Medium polygons
            { geo: new THREE.TetrahedronGeometry(12, 0), pos: { x: -40, y: 20, z: -80 }, color: 0x6366f1, opacity: 0.1 },
            { geo: new THREE.OctahedronGeometry(10, 0), pos: { x: 50, y: -10, z: -120 }, color: 0x22d3ee, opacity: 0.08 },
            { geo: new THREE.IcosahedronGeometry(15, 0), pos: { x: -100, y: -20, z: -180 }, color: 0x8b5cf6, opacity: 0.06 },
            { geo: new THREE.DodecahedronGeometry(12, 0), pos: { x: 100, y: 30, z: -220 }, color: 0x6366f1, opacity: 0.07 },
            { geo: new THREE.TetrahedronGeometry(8, 0), pos: { x: 20, y: -60, z: -160 }, color: 0xf472b6, opacity: 0.09 },
            { geo: new THREE.OctahedronGeometry(14, 0), pos: { x: -30, y: 70, z: -280 }, color: 0x22d3ee, opacity: 0.05 },

            // Smaller accent polygons
            { geo: new THREE.IcosahedronGeometry(6, 0), pos: { x: 30, y: 25, z: -60 }, color: 0x6366f1, opacity: 0.15 },
            { geo: new THREE.TetrahedronGeometry(5, 0), pos: { x: -25, y: -35, z: -90 }, color: 0x22d3ee, opacity: 0.12 },
            { geo: new THREE.OctahedronGeometry(7, 0), pos: { x: 60, y: 45, z: -130 }, color: 0x8b5cf6, opacity: 0.1 },
            { geo: new THREE.DodecahedronGeometry(5, 0), pos: { x: -70, y: 50, z: -170 }, color: 0xf472b6, opacity: 0.08 },
        ];

        shapes.forEach((shape, i) => {
            const material = new THREE.MeshBasicMaterial({
                color: shape.color,
                wireframe: true,
                transparent: true,
                opacity: shape.opacity
            });

            const mesh = new THREE.Mesh(shape.geo, material);
            mesh.position.set(shape.pos.x, shape.pos.y, shape.pos.z);

            mesh.userData = {
                originalPos: { ...shape.pos },
                rotSpeed: {
                    x: 0.001 + Math.random() * 0.002,
                    y: 0.001 + Math.random() * 0.002,
                    z: 0.0005 + Math.random() * 0.001
                },
                floatSpeed: 0.2 + Math.random() * 0.3,
                floatAmp: 3 + Math.random() * 5,
                parallaxFactor: 0.5 + Math.random() * 0.5
            };

            this.polygons.push(mesh);
            this.scene.add(mesh);
        });
    }

    createMinimalStars() {
        // Much fewer stars - just for accent
        const geometry = new THREE.BufferGeometry();
        const count = 400;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color(0xffffff),
            new THREE.Color(0x6366f1),
            new THREE.Color(0x22d3ee)
        ];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 600;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
            positions[i * 3 + 2] = -Math.random() * 800;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    createGlowOrbs() {
        // Soft glowing orbs for ambience
        this.orbs = [];
        const orbData = [
            { size: 40, pos: { x: -100, y: 50, z: -200 }, color: 0x6366f1 },
            { size: 60, pos: { x: 120, y: -40, z: -300 }, color: 0x8b5cf6 },
            { size: 50, pos: { x: 0, y: 80, z: -400 }, color: 0x22d3ee },
            { size: 70, pos: { x: -80, y: -60, z: -350 }, color: 0xf472b6 }
        ];

        orbData.forEach(orb => {
            const geometry = new THREE.SphereGeometry(orb.size, 32, 32);
            const material = new THREE.MeshBasicMaterial({
                color: orb.color,
                transparent: true,
                opacity: 0.015,
                side: THREE.BackSide
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(orb.pos.x, orb.pos.y, orb.pos.z);
            mesh.userData = { originalPos: { ...orb.pos } };

            this.orbs.push(mesh);
            this.scene.add(mesh);
        });
    }

    setupScrollTrigger() {
        // Track scroll for direction detection
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > this.lastScrollY) {
                this.scrollDirection = 1; // Scrolling down = zoom in
            } else if (currentScrollY < this.lastScrollY) {
                this.scrollDirection = -1; // Scrolling up = zoom out
            }
            this.lastScrollY = currentScrollY;
            this.lastScrollTime = Date.now();
            this.idleZoomSpeed = 0; // Reset idle zoom when actively scrolling
        });

        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                this.scrollProgress = self.progress;
            }
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;
        const now = Date.now();

        // Smooth mouse
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Check if scrolling is idle (more than 500ms since last scroll)
        const timeSinceScroll = now - this.lastScrollTime;
        const isIdle = timeSinceScroll > 500;

        // Continuous zoom when idle
        if (isIdle) {
            // Gradually increase zoom speed
            this.idleZoomSpeed += (this.targetZoomSpeed - this.idleZoomSpeed) * 0.02;

            // Apply continuous zoom based on scroll direction
            // Limit zoom range to prevent going too far
            const minZ = -400;
            const maxZ = 100;

            if (this.scrollDirection === 1 && this.camera.position.z > minZ) {
                this.camera.position.z -= this.idleZoomSpeed;
            } else if (this.scrollDirection === -1 && this.camera.position.z < maxZ) {
                this.camera.position.z += this.idleZoomSpeed;
            }
        } else {
            // Normal scroll-based camera movement
            const targetZ = 80 - this.scrollProgress * 600;
            this.camera.position.z += (targetZ - this.camera.position.z) * 0.05;
        }

        this.camera.position.x = this.mouse.x * 20;
        this.camera.position.y = this.mouse.y * 15;
        this.camera.lookAt(0, 0, this.camera.position.z - 100);

        // Animate polygons
        this.polygons.forEach((poly, i) => {
            // Rotation
            poly.rotation.x += poly.userData.rotSpeed.x;
            poly.rotation.y += poly.userData.rotSpeed.y;
            poly.rotation.z += poly.userData.rotSpeed.z;

            // Float animation
            poly.position.y = poly.userData.originalPos.y +
                Math.sin(time * poly.userData.floatSpeed + i) * poly.userData.floatAmp;

            // Parallax with mouse
            poly.position.x = poly.userData.originalPos.x +
                this.mouse.x * 30 * poly.userData.parallaxFactor;
        });

        // Animate stars
        if (this.stars) {
            this.stars.rotation.z += 0.0001;
        }

        // Animate orbs
        this.orbs.forEach((orb, i) => {
            orb.position.y = orb.userData.originalPos.y + Math.sin(time * 0.3 + i) * 10;
            orb.rotation.y += 0.001;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// ======================================
// NAVIGATION
// ======================================
class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.menuBtn = document.getElementById('menuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileLinks = document.querySelectorAll('.mobile-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.nav.classList.toggle('scrolled', window.scrollY > 50);
            this.updateActiveNav();
        });

        this.menuBtn.addEventListener('click', () => this.toggleMobile());
        this.mobileOverlay.addEventListener('click', () => this.closeMobile());

        this.mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.closeMobile();
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
                }
            });
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    toggleMobile() {
        this.menuBtn.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        this.mobileOverlay.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobile() {
        this.menuBtn.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) current = section.id;
        });
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }
}

// ======================================
// TYPEWRITER
// ======================================
class TypeWriter {
    constructor() {
        this.element = document.getElementById('typingText');
        this.texts = [
            'AI/ML Engineer',
            'Mobile App Developer',
            'Full-Stack Developer',
            'DSA Enthusiast'
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        if (this.element) this.type();
    }

    type() {
        const current = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = current.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? 40 : 80;

        if (!this.isDeleting && this.charIndex === current.length) {
            speed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// ======================================
// CUSTOM CURSOR
// ======================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.dot = document.querySelector('.cursor-dot');
        this.pos = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };
        if (this.cursor && window.innerWidth > 768) this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.target.x = e.clientX;
            this.target.y = e.clientY;
            gsap.to(this.dot, { left: e.clientX, top: e.clientY, duration: 0.1 });
        });

        document.querySelectorAll('a, button, .glass, .project-card, .skill-item').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });

        this.animate();
    }

    animate() {
        this.pos.x += (this.target.x - this.pos.x) * 0.12;
        this.pos.y += (this.target.y - this.pos.y) * 0.12;
        this.cursor.style.left = this.pos.x + 'px';
        this.cursor.style.top = this.pos.y + 'px';
        requestAnimationFrame(() => this.animate());
    }
}

// ======================================
// THEME TOGGLE
// ======================================
class ThemeToggle {
    constructor() {
        this.btn = document.getElementById('themeBtn');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        const stored = localStorage.getItem('theme') || 'dark';
        this.html.setAttribute('data-theme', stored);

        this.btn.addEventListener('click', () => {
            const current = this.html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            this.html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            gsap.fromTo(this.btn, { rotation: 0 }, { rotation: 360, duration: 0.5 });
        });
    }
}

// ======================================
// SCROLL ANIMATIONS
// ======================================
class ScrollAnimations {
    constructor() {
        this.heroAnimation();
        this.sectionAnimations();
    }

    heroAnimation() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-title .line', { opacity: 0, y: 50, duration: 0.8, stagger: 0.15, delay: 0.3 })
            .from('.hero-role', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
            .from('.hero-desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
            .from('.hero-buttons .btn', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.2')
            .from('.hero-socials .social-btn', { opacity: 0, scale: 0, duration: 0.3, stagger: 0.08 }, '-=0.2')
            .from('.hero-image-wrapper', { opacity: 0, scale: 0.8, duration: 1 }, '-=0.8')
            .from('.scroll-hint', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');
    }

    sectionAnimations() {
        // Use immediateRender: false to prevent initial opacity 0
        gsap.utils.toArray('.section-header').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                opacity: 0, y: 30, duration: 0.7, immediateRender: false
            });
        });

        gsap.from('.about-text', {
            scrollTrigger: { trigger: '.about-content', start: 'top 80%', once: true },
            opacity: 0, x: -40, duration: 0.8, immediateRender: false
        });

        gsap.from('.stat-card', {
            scrollTrigger: { trigger: '.about-stats', start: 'top 85%', once: true },
            opacity: 0, y: 30, stagger: 0.1, duration: 0.6, immediateRender: false
        });

        gsap.from('.skill-group', {
            scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', once: true },
            opacity: 0, y: 40, stagger: 0.15, duration: 0.7, immediateRender: false
        });

        // Project cards - use gsap.to with autoAlpha for visibility
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 60 },
                {
                    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%', once: true },
                    opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power2.out'
                }
            );
        });

        gsap.from('.contact-content', {
            scrollTrigger: { trigger: '.contact', start: 'top 80%', once: true },
            opacity: 0, y: 40, duration: 0.8, immediateRender: false
        });
    }
}

// ======================================
// MAGNETIC BUTTONS
// ======================================
class MagneticButtons {
    constructor() {
        if (window.innerWidth < 768) return;

        document.querySelectorAll('.btn, .social-btn').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }
}

// ======================================
// TILT CARDS
// ======================================
class TiltCards {
    constructor() {
        if (window.innerWidth < 768) return;

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }
}

console.log('%c🚀 Divyanshu Patel', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%cLarge polygon 3D space!', 'color: #22d3ee; font-size: 12px;');

// ======================================
// EMAIL MODAL
// ======================================
class EmailModal {
    constructor() {
        this.modal = document.getElementById('emailModal');
        this.btn = document.getElementById('getInTouchBtn');
        this.closeBtn = document.getElementById('emailModalClose');
        this.form = document.getElementById('contactForm');
        this.status = document.getElementById('emailStatus');

        if (this.modal && this.btn) this.init();
    }

    init() {
        this.btn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        gsap.fromTo(this.modal.querySelector('.email-modal-content'),
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
    }

    close() {
        gsap.to(this.modal.querySelector('.email-modal-content'), {
            scale: 0.9, opacity: 0, duration: 0.2,
            onComplete: () => {
                this.modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        this.status.textContent = 'Sending...';
        this.status.className = 'email-status';

        // EmailJS integration - replace with your credentials
        // For now, fallback to mailto
        try {
            if (typeof emailjs !== 'undefined') {
                // If EmailJS is configured
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: data.from_name,
                    from_email: data.from_email,
                    message: data.message,
                    to_email: 'itzdivyanshupatel@gmail.com'
                });
                this.status.textContent = 'Message sent successfully!';
                this.status.classList.add('success');
                this.form.reset();
                setTimeout(() => this.close(), 2000);
            } else {
                // Fallback to mailto
                const subject = `Portfolio Contact from ${data.from_name}`;
                const body = `Name: ${data.from_name}\nEmail: ${data.from_email}\n\nMessage:\n${data.message}`;
                window.location.href = `mailto:itzdivyanshupatel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                this.status.textContent = 'Opening email client...';
                this.status.classList.add('success');
            }
        } catch (error) {
            console.error('Email error:', error);
            this.status.textContent = 'Failed to send. Please try again.';
            this.status.classList.add('error');
        }
    }
}

// Initialize EmailModal
new EmailModal();

// ======================================
// SPACESHIP ARENA GAME - ENHANCED
// ======================================
class SpaceshipGame {
    constructor() {
        this.overlay = document.getElementById('gameOverlay');
        this.canvas = document.getElementById('game-canvas');
        this.enterBtn = document.getElementById('enterArenaBtn');
        this.exitBtn = document.getElementById('exitArenaBtn');
        this.loading = document.getElementById('gameLoading');
        this.controls = document.getElementById('gameControls');
        this.mobileControls = document.getElementById('mobileTouchControls');
        this.progressBar = document.getElementById('loadProgress');

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.spaceship = null;
        this.stars = null;
        this.isActive = false;
        this.animationId = null;

        // Game state
        this.score = 0;
        this.baseSpeed = 0.8;
        this.currentSpeed = this.baseSpeed;
        this.checkpoints = [];
        this.polygons = [];
        this.scoreDisplay = null;
        this.isGameOver = false;

        // Audio for arena
        this.arenaAudio = null;

        // Controls - W/ArrowUp forward, A/ArrowLeft turn, S/ArrowDown brake, D/ArrowRight turn
        this.keys = {
            forward: false,
            brake: false,
            left: false,
            right: false,
            pitchUp: false,
            pitchDown: false
        };
        this.velocity = { x: 0, y: 0, z: 0 };
        // Ship rotation starts at 0 - model is corrected in loadSpaceship
        this.shipRotation = { x: 0, y: 0, z: 0 };
        this.targetBank = 0;

        if (this.overlay && this.enterBtn) this.init();
    }

    init() {
        this.enterBtn.addEventListener('click', () => this.enterArena());
        this.exitBtn.addEventListener('click', () => this.exitArena());

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    async enterArena() {
        // Fade out page content
        const mainContent = document.querySelectorAll('.nav, main, section:not(.arena-section), .footer, .email-modal');

        gsap.to(mainContent, {
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            onComplete: () => {
                mainContent.forEach(el => el.style.visibility = 'hidden');
            }
        });

        // Show game overlay
        await new Promise(r => setTimeout(r, 300));
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Start arena music (looped)
        this.startArenaMusic();

        // Setup scene
        await this.setupScene();

        // Load spaceship
        await this.loadSpaceship();

        // Create checkpoints
        this.createCheckpoints();

        // Create score display
        this.createScoreDisplay();

        // Start game
        this.startGame();
    }

    setupScene() {
        return new Promise(resolve => {
            // Scene
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0x050510, 0.0008);

            // Camera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
            this.camera.position.set(0, 20, 80);

            // Renderer
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setClearColor(0x050510);

            // Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            this.scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
            directionalLight.position.set(50, 100, 50);
            this.scene.add(directionalLight);

            const pointLight1 = new THREE.PointLight(0x6366f1, 2, 400);
            pointLight1.position.set(-50, 30, -50);
            this.scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x22d3ee, 2, 400);
            pointLight2.position.set(50, 30, 50);
            this.scene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0xf472b6, 1.5, 300);
            pointLight3.position.set(0, -30, 0);
            this.scene.add(pointLight3);

            // Dynamic Stars
            const starsGeometry = new THREE.BufferGeometry();
            const starCount = 5000;
            const positions = new Float32Array(starCount * 3);
            const colors = new Float32Array(starCount * 3);
            const sizes = new Float32Array(starCount);

            for (let i = 0; i < starCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 3000;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 3000;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 3000;

                const colorChoice = Math.random();
                let color;
                if (colorChoice > 0.9) {
                    color = new THREE.Color(0x22d3ee);
                } else if (colorChoice > 0.8) {
                    color = new THREE.Color(0x6366f1);
                } else if (colorChoice > 0.7) {
                    color = new THREE.Color(0xf472b6);
                } else {
                    color = new THREE.Color(0xffffff);
                }
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
                sizes[i] = Math.random() * 3 + 1;
            }

            starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const starsMaterial = new THREE.PointsMaterial({
                size: 2.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                sizeAttenuation: true
            });

            this.stars = new THREE.Points(starsGeometry, starsMaterial);
            this.scene.add(this.stars);

            // Floating Polygons
            this.createFloatingPolygons();

            // Handle resize
            window.addEventListener('resize', () => this.onResize());

            resolve();
        });
    }

    createFloatingPolygons() {
        const polygonTypes = [
            new THREE.IcosahedronGeometry(15, 0),
            new THREE.OctahedronGeometry(12, 0),
            new THREE.TetrahedronGeometry(10, 0),
            new THREE.DodecahedronGeometry(8, 0)
        ];

        const colors = [0x6366f1, 0x22d3ee, 0xf472b6, 0x8b5cf6, 0x10b981];

        for (let i = 0; i < 30; i++) {
            const geometry = polygonTypes[Math.floor(Math.random() * polygonTypes.length)];
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.4,
                wireframe: Math.random() > 0.5,
                emissive: colors[Math.floor(Math.random() * colors.length)],
                emissiveIntensity: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 800
            );
            mesh.userData = {
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.2,
                floatAmp: Math.random() * 10 + 5,
                originalY: mesh.position.y,
                pulsePhase: Math.random() * Math.PI * 2
            };

            this.polygons.push(mesh);
            this.scene.add(mesh);
        }
    }

    createCheckpoints() {
        for (let i = 0; i < 15; i++) {
            this.spawnCheckpoint();
        }
    }

    spawnCheckpoint(isDanger = null) {
        // Randomly decide type if not specified: 70% green (+10), 30% red (danger)
        if (isDanger === null) {
            isDanger = Math.random() < 0.3;
        }

        // BIG transparent rectangle gate
        const width = 100;
        const height = 80;
        const geometry = new THREE.PlaneGeometry(width, height);

        const color = isDanger ? 0xff4444 : 0x22d3ee;
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });

        const checkpoint = new THREE.Mesh(geometry, material);

        // Create border frame
        const edgesGeometry = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({
            color: color,
            linewidth: 3,
            transparent: true,
            opacity: 0.9
        });
        const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        checkpoint.add(edges);

        // Add label text (circle for blue, X for red)
        if (isDanger) {
            // Add X symbol for danger (red)
            const xGeo1 = new THREE.PlaneGeometry(30, 8);
            const xMat = new THREE.MeshBasicMaterial({ color: 0xff4444, side: THREE.DoubleSide });
            const x1 = new THREE.Mesh(xGeo1, xMat);
            x1.rotation.z = Math.PI / 4;
            const x2 = new THREE.Mesh(xGeo1.clone(), xMat);
            x2.rotation.z = -Math.PI / 4;
            checkpoint.add(x1);
            checkpoint.add(x2);
        } else {
            // Add circle (ring) symbol for score (blue)
            const circleGeometry = new THREE.RingGeometry(10, 14, 32);
            const circleMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide });
            const circle = new THREE.Mesh(circleGeometry, circleMat);
            checkpoint.add(circle);
        }

        // Spawn around player - SAME Y LEVEL, GREATER DISTANCE
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 600 + 300;  // 300-900 distance (greater)

        if (this.spaceship) {
            checkpoint.position.set(
                this.spaceship.position.x + Math.cos(angle) * distance,
                0,  // Same Y level as ship (no height variation)
                this.spaceship.position.z + Math.sin(angle) * distance
            );
        } else {
            checkpoint.position.set(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            );
        }

        // Keep upright - no rotation (face camera automatically in scene)

        checkpoint.userData = {
            pulsePhase: Math.random() * Math.PI * 2,
            collected: false,
            isDanger: isDanger
        };

        this.checkpoints.push(checkpoint);
        this.scene.add(checkpoint);
    }

    createScoreDisplay() {
        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.className = 'game-score';
        this.scoreDisplay.innerHTML = `
            <div class="score-label">SCORE</div>
            <div class="score-value">0</div>
            <div class="speed-label">SPEED: <span class="speed-value">1.0x</span></div>
        `;
        document.querySelector('.game-ui').appendChild(this.scoreDisplay);
    }

    updateScoreDisplay() {
        if (this.scoreDisplay) {
            this.scoreDisplay.querySelector('.score-value').textContent = this.score;
            this.scoreDisplay.querySelector('.speed-value').textContent =
                (this.currentSpeed / this.baseSpeed).toFixed(1) + 'x';
        }
    }

    loadSpaceship() {
        return new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader();

            loader.load(
                'src/models/spaceship.glb',
                (gltf) => {
                    // Create a wrapper Group for the player
                    this.spaceship = new THREE.Group();

                    // Configure the inner model
                    const model = gltf.scene;
                    model.scale.set(30, 30, 30);
                    model.rotation.y = Math.PI; // Correct model orientation (local)
                    model.position.set(0, 0, 0);

                    // Add model to wrapper
                    this.spaceship.add(model);

                    // Add wrapper to scene
                    this.scene.add(this.spaceship);

                    if (this.progressBar) {
                        this.progressBar.style.width = '100%';
                    }

                    resolve();
                },
                (progress) => {
                    const percent = (progress.loaded / progress.total) * 100;
                    if (this.progressBar) {
                        this.progressBar.style.width = `${percent}%`;
                    }
                },
                (error) => {
                    console.error('Error loading spaceship:', error);
                    reject(error);
                }
            );
        });
    }

    startGame() {
        // Reset game state
        this.score = 0;
        this.currentSpeed = this.baseSpeed;
        this.updateScoreDisplay();

        // Hide loading, show controls
        gsap.to(this.loading, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                this.loading.style.display = 'none';
                this.controls.classList.add('active');
                this.exitBtn.classList.add('active');
                // Show mobile touch controls on mobile devices
                if (this.mobileControls && window.innerWidth <= 768) {
                    this.mobileControls.classList.add('active');
                    this.setupTouchControls();
                }
            }
        });

        this.isActive = true;
        this.animate();
    }

    handleKeyDown(e) {
        if (!this.isActive) return;
        e.preventDefault();

        const key = e.key.toLowerCase();
        // Arrow keys work same as WASD
        if (key === 'w' || key === 'arrowup') this.keys.forward = true;
        if (key === 's' || key === 'arrowdown') this.keys.brake = true;  // Brake instead of backward
        if (key === 'a' || key === 'arrowleft') this.keys.left = true;
        if (key === 'd' || key === 'arrowright') this.keys.right = true;
        // Q/E for pitch
        if (key === 'q') this.keys.pitchUp = true;
        if (key === 'e') this.keys.pitchDown = true;
    }

    handleKeyUp(e) {
        if (!this.isActive) return;

        const key = e.key.toLowerCase();
        if (key === 'w' || key === 'arrowup') this.keys.forward = false;
        if (key === 's' || key === 'arrowdown') this.keys.brake = false;
        if (key === 'a' || key === 'arrowleft') this.keys.left = false;
        if (key === 'd' || key === 'arrowright') this.keys.right = false;
        if (key === 'q') this.keys.pitchUp = false;
        if (key === 'e') this.keys.pitchDown = false;
    }

    animate() {
        if (!this.isActive) return;
        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;
        const turnSpeed = 0.025;
        const normalFriction = 0.96;
        const brakeFriction = 0.90;  // Stronger friction when braking

        // Movement with progressive speed
        if (this.keys.forward) this.velocity.z -= this.currentSpeed;
        // S/Down now brakes (applies stronger friction) instead of going backward
        if (this.keys.left) this.shipRotation.y += turnSpeed;
        if (this.keys.right) this.shipRotation.y -= turnSpeed;
        if (this.keys.pitchUp) this.shipRotation.x -= turnSpeed * 0.5;
        if (this.keys.pitchDown) this.shipRotation.x += turnSpeed * 0.5;

        // Apply friction - stronger when braking
        const friction = this.keys.brake ? brakeFriction : normalFriction;
        this.velocity.z *= friction;
        this.shipRotation.x *= 0.95;

        // Clamp pitch
        this.shipRotation.x = Math.max(-0.4, Math.min(0.4, this.shipRotation.x));

        if (this.spaceship) {
            // Apply rotation - Wrapper handles model correction, so just apply physics rotation
            this.spaceship.rotation.y = this.shipRotation.y;
            this.spaceship.rotation.x = this.shipRotation.x;

            // Smooth banking effect when turning
            this.targetBank = (this.keys.left ? 0.4 : 0) - (this.keys.right ? 0.4 : 0);
            this.spaceship.rotation.z += (this.targetBank - this.spaceship.rotation.z) * 0.08;

            // Move in facing direction
            const direction = new THREE.Vector3(0, 0, this.velocity.z);
            direction.applyQuaternion(this.spaceship.quaternion);
            this.spaceship.position.add(direction);

            // Camera follows spaceship smoothly
            const cameraOffset = new THREE.Vector3(0, 25, 70);
            cameraOffset.applyQuaternion(this.spaceship.quaternion);
            this.camera.position.lerp(
                this.spaceship.position.clone().add(cameraOffset),
                0.04
            );
            this.camera.lookAt(this.spaceship.position);

            // Check checkpoint collisions
            this.checkCheckpoints();

            // Make stars follow player - always centered around ship
            if (this.stars) {
                this.stars.position.copy(this.spaceship.position);
                this.stars.rotation.y += 0.0002;
            }

            // Reposition polygons that are too far away
            this.polygons.forEach((poly, i) => {
                const distToShip = poly.position.distanceTo(this.spaceship.position);

                // If polygon is too far, respawn near player
                if (distToShip > 600) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * 300 + 100;
                    poly.position.set(
                        this.spaceship.position.x + Math.cos(angle) * dist,
                        this.spaceship.position.y + (Math.random() - 0.5) * 200,
                        this.spaceship.position.z + Math.sin(angle) * dist
                    );
                    poly.userData.originalY = poly.position.y;
                }

                // Animate rotation
                poly.rotation.x += poly.userData.rotSpeed.x;
                poly.rotation.y += poly.userData.rotSpeed.y;
                poly.rotation.z += poly.userData.rotSpeed.z;

                // Float up and down
                poly.position.y = poly.userData.originalY +
                    Math.sin(time * poly.userData.floatSpeed + i) * poly.userData.floatAmp;

                // Pulse opacity
                poly.material.opacity = 0.3 + Math.sin(time + poly.userData.pulsePhase) * 0.15;
            });
        }

        // Animate checkpoints - pulse opacity instead of emissive
        this.checkpoints.forEach((checkpoint, i) => {
            // Gentle rotation
            checkpoint.rotation.z += 0.01;

            // Pulse scale
            const scale = 1 + Math.sin(time * 2 + checkpoint.userData.pulsePhase) * 0.1;
            checkpoint.scale.set(scale, scale, 1);

            // Pulse opacity
            checkpoint.material.opacity = 0.2 + Math.sin(time * 3 + i) * 0.1;
        });

        this.renderer.render(this.scene, this.camera);
    }

    checkCheckpoints() {
        const shipPos = this.spaceship.position;
        // Larger collision distance for big rectangles
        const collisionDistance = 60;

        for (let i = this.checkpoints.length - 1; i >= 0; i--) {
            const checkpoint = this.checkpoints[i];
            const distance = shipPos.distanceTo(checkpoint.position);

            // Respawn checkpoints that are too far away
            if (distance > 800) {
                this.scene.remove(checkpoint);
                this.checkpoints.splice(i, 1);
                this.spawnCheckpoint();
                continue;
            }

            if (distance < collisionDistance && !checkpoint.userData.collected) {
                checkpoint.userData.collected = true;

                if (checkpoint.userData.isDanger) {
                    // GAME OVER - hit red checkpoint
                    this.gameOver();
                    return;
                } else {
                    // Score!
                    this.score += 10;
                    this.currentSpeed = this.baseSpeed + (this.score / 100) * 0.3;
                    this.updateScoreDisplay();

                    // Visual feedback
                    gsap.to(checkpoint.scale, {
                        x: 2, y: 2, z: 2,
                        duration: 0.2
                    });
                    gsap.to(checkpoint.material, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            this.scene.remove(checkpoint);
                            const idx = this.checkpoints.indexOf(checkpoint);
                            if (idx > -1) this.checkpoints.splice(idx, 1);
                            // Spawn new checkpoint
                            this.spawnCheckpoint();
                        }
                    });
                }
            }
        }
    }

    gameOver() {
        // Flash screen red
        gsap.to(this.canvas, {
            filter: 'sepia(1) hue-rotate(-50deg) saturate(4)',
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                this.canvas.style.filter = 'none';
            }
        });

        // Reset score and speed
        const finalScore = this.score;
        this.score = 0;
        this.currentSpeed = this.baseSpeed;
        this.updateScoreDisplay();

        // Reset ship position and rotation state (model has its own Math.PI)
        this.spaceship.position.set(0, 0, 0);
        this.shipRotation = { x: 0, y: 0, z: 0 };  // Reset to 0, model handles orientation
        this.velocity = { x: 0, y: 0, z: 0 };
        this.spaceship.rotation.set(0, Math.PI, 0);  // Reset model rotation

        // Clear all checkpoints and respawn
        this.checkpoints.forEach(cp => this.scene.remove(cp));
        this.checkpoints = [];
        for (let i = 0; i < 15; i++) {
            this.spawnCheckpoint();
        }

        // Show game over message in score display
        if (this.scoreDisplay) {
            const label = this.scoreDisplay.querySelector('.score-label');
            label.textContent = 'GAME OVER!';
            label.style.color = '#ff4444';
            setTimeout(() => {
                label.textContent = 'SCORE';
                label.style.color = '';
            }, 2000);
        }

        console.log('Game Over! Final Score:', finalScore);
    }

    startArenaMusic() {
        // Create audio element if not exists
        if (!this.arenaAudio) {
            this.arenaAudio = new Audio('src/space.mp3');
            this.arenaAudio.loop = true;
            this.arenaAudio.volume = 0.5;
        }

        // Play audio (handles browser autoplay policy)
        this.arenaAudio.play().catch(err => {
            console.log('Audio autoplay blocked, will play on next interaction');
        });
    }

    stopArenaMusic() {
        if (this.arenaAudio) {
            this.arenaAudio.pause();
            this.arenaAudio.currentTime = 0;
        }
    }

    setupTouchControls() {
        if (!this.mobileControls) return;

        const touchButtons = this.mobileControls.querySelectorAll('.touch-btn');

        touchButtons.forEach(btn => {
            const key = btn.getAttribute('data-key');

            // Touch start
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Prevent scrolling/zooming
                btn.classList.add('pressed');

                // Simulate keydown
                const event = { key: key, preventDefault: () => { } };
                this.handleKeyDown(event);
            }, { passive: false });

            // Touch end
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                btn.classList.remove('pressed');

                // Simulate keyup
                const event = { key: key, preventDefault: () => { } };
                this.handleKeyUp(event);
            }, { passive: false });

            // Mouse events for testing on desktop with mobile view
            btn.addEventListener('mousedown', (e) => {
                btn.classList.add('pressed');
                const event = { key: key, preventDefault: () => { } };
                this.handleKeyDown(event);
            });

            btn.addEventListener('mouseup', (e) => {
                btn.classList.remove('pressed');
                const event = { key: key, preventDefault: () => { } };
                this.handleKeyUp(event);
            });

            btn.addEventListener('mouseleave', (e) => {
                if (btn.classList.contains('pressed')) {
                    btn.classList.remove('pressed');
                    const event = { key: key, preventDefault: () => { } };
                    this.handleKeyUp(event);
                }
            });
        });
    }

    exitArena() {
        // Stop arena music
        this.stopArenaMusic();

        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Reset UI
        this.controls.classList.remove('active');
        if (this.mobileControls) {
            this.mobileControls.classList.remove('active');
        }
        this.exitBtn.classList.remove('active');

        // Remove score display
        if (this.scoreDisplay) {
            this.scoreDisplay.remove();
            this.scoreDisplay = null;
        }

        // Fade out overlay
        gsap.to(this.overlay, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                this.overlay.classList.remove('active');
                this.overlay.style.opacity = '';  // Reset for next entry

                // Cleanup Three.js
                if (this.scene) {
                    // Dispose all objects
                    this.scene.traverse((object) => {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) {
                            if (Array.isArray(object.material)) {
                                object.material.forEach(m => m.dispose());
                            } else {
                                object.material.dispose();
                            }
                        }
                    });
                    this.scene.clear();
                }
                if (this.renderer) {
                    this.renderer.dispose();
                    this.renderer.forceContextLoss();
                }

                // Reset all references
                this.spaceship = null;
                this.scene = null;
                this.renderer = null;
                this.camera = null;
                this.stars = null;
                this.checkpoints = [];
                this.polygons = [];

                // Reset loading UI
                this.loading.style.display = 'block';
                this.loading.style.opacity = '1';
                if (this.progressBar) {
                    this.progressBar.style.width = '0';
                }

                // Reset game state
                this.velocity = { x: 0, y: 0, z: 0 };
                this.shipRotation = { x: 0, y: 0, z: 0 };  // Reset to 0, model handles orientation
                this.keys = {
                    forward: false, brake: false,
                    left: false, right: false,
                    pitchUp: false, pitchDown: false
                };
                this.score = 0;
                this.currentSpeed = this.baseSpeed;
                this.isGameOver = false;
                this.targetBank = 0;
            }
        });

        // Fade in page content
        const mainContent = document.querySelectorAll('.nav, main, section:not(.arena-section), .footer');
        mainContent.forEach(el => el.style.visibility = 'visible');

        gsap.to(mainContent, {
            opacity: 1,
            duration: 0.5,
            delay: 0.3,
            stagger: 0.05,
            onComplete: () => {
                document.body.style.overflow = '';
            }
        });
    }

    onResize() {
        if (!this.renderer || !this.camera) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize Spaceship Game
new SpaceshipGame();

