document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.getElementById("darkMode-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Check for saved theme preference or use system preference
    const currentTheme =
        localStorage.getItem("theme") ||
        (prefersDarkScheme.matches ? "dark" : "light");

    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", function () {
        let theme;
        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.removeAttribute("data-theme");
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            theme = "light";
        } else {
            document.body.setAttribute("data-theme", "dark");
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            theme = "dark";
        }
        localStorage.setItem("theme", theme);
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.querySelector(".navbar");

    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
        menuToggle.innerHTML = navbar.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector(".header");
    window.addEventListener("scroll", function () {
        header.classList.toggle("sticky", window.scrollY > 50);
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");

            portfolioItems.forEach((item) => {
                if (
                    filterValue === "all" ||
                    item.getAttribute("data-category") === filterValue
                ) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Simple validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields");
            return;
        }

        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show an alert
        alert(
            `Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`
        );

        // Reset the form
        this.reset();
    });

    // Animate skills progress bars when section is in view
    const skillsSection = document.querySelector(".skills");
    const progressBars = document.querySelectorAll(".progress");

    function animateProgressBars() {
        progressBars.forEach((bar) => {
            const width =
                bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = width;
        });
    }

    const skillsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    skillsObserver.observe(skillsSection);

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth",
                });
            }
        });
    });

    // script.js
    document.querySelector("a[download]").addEventListener("click", function (e) {
        if (!confirm("Download CV sekarang?")) {
            e.preventDefault(); // Batalkan jika user klik "Tidak"
        }
    });
});
