document.addEventListener('DOMContentLoaded', function () {

    // --- constants ---
    const PHONE_NUMBER = "595981132228";

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 2. WhatsApp Integration
    // Function to open WhatsApp
    const openWhatsApp = (message) => {
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Handler for "wa-trigger" elements (Cards, Buttons, etc)
    const waTriggers = document.querySelectorAll('.wa-trigger');
    waTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            // Prevent if clicking on a link inside the card (if any)
            if (e.target.tagName.toLowerCase() === 'a') return;

            const message = this.getAttribute('data-wa');
            if (message) {
                openWhatsApp(message);
            }
        });

        // Add cursor pointer style
        trigger.style.cursor = 'pointer';
    });

    // 3. Contact Form to WhatsApp
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            // Get values
            const name = document.getElementById('name').value;
            const business = document.getElementById('business').value;
            const goals = document.getElementById('goals').value;
            const budget = document.getElementById('budget').value;

            // Construct message
            const message = `Hola RBK DIGITAL, quiero pedir un presupuesto personalizado.\n\n*Nombre:* ${name}\n*Negocio:* ${business}\n*Objetivos:* ${goals}\n*Presupuesto Aprox:* ${budget} GS`;

            // Open WhatsApp
            openWhatsApp(message);

            // Optional: reset form
            contactForm.reset();
        });
    }

    // Validation Helpers
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#FF00CC';
                isValid = false;
            } else {
                field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });

        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#FF00CC';
            isValid = false;
        }

        // Email validation is less critical if we send via WhatsApp, but good to keep for the record if we had backend
        // Since we are sending via WA now, maybe email is just for the form consistency
        return isValid;
    }

    function validateEmail(email) {
        if (!email) return true; // allow empty if not required (but it has required attr)
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    // 4. Scroll Animations (IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));


    // 5. Scroll Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Volver al inicio');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
