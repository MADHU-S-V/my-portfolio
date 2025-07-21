document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        // Check if burger and nav exist before adding listeners
        if (burger && nav) {
            burger.addEventListener('click', () => {
                // Toggle Nav
                nav.classList.toggle('nav-active');

                // Animate Links
                navLinks.forEach((link, index) => {
                    // Reset animation if it's already active, otherwise apply new animation
                    link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                });

                // Burger Animation
                burger.classList.toggle('toggle');
            });

            // Close nav when a link is clicked (for single-page smooth scroll)
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    // Reset animation for all links immediately when closing
                    navLinks.forEach(item => {
                        item.style.animation = '';
                    });
                });
            });
        }
    };

    // Call the navSlide function
    navSlide();


    // 2. Contact Form Submission (using Formspree)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) { // Ensure both form and status element exist
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const form = event.target;
            const data = new FormData(form);

            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#555'; // A neutral color for sending status

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
                    formStatus.style.color = 'green';
                    form.reset(); // Clear the form fields on success
                } else {
                    const responseData = await response.json();
                    if (responseData.errors) {
                        formStatus.textContent = responseData.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = 'Oops! There was a problem sending your message.';
                    }
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formStatus.textContent = 'Oops! A network error occurred. Please try again later.';
                formStatus.style.color = 'red';
            }
        });
    }

    // 3. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body; // Reference to the body element

    if (themeToggleBtn) { // Ensure the toggle button exists before adding listeners
        // Function to set the theme (light or dark)
        const setTheme = (isLight) => {
            if (isLight) {
                body.classList.add('light-theme'); // Apply light theme class
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon (suggests switching to dark)
            } else {
                body.classList.remove('light-theme'); // Remove light theme class (defaults to dark)
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun (suggests switching to light)
            }
        };

        // Load saved theme from localStorage or default to system preference
        const savedTheme = localStorage.getItem('theme'); // Check if a theme preference is saved

        if (savedTheme) {
            // If a preference exists, apply it
            setTheme(savedTheme === 'light');
        } else {
            // If no preference, check the user's system preference (e.g., OS dark mode setting)
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            setTheme(prefersLight); // Apply theme based on system preference
        }

        // Add event listener for the theme toggle button click
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyLight = body.classList.contains('light-theme'); // Check current theme
            setTheme(!isCurrentlyLight); // Toggle the theme (if light, make dark; if dark, make light)
            localStorage.setItem('theme', isCurrentlyLight ? 'dark' : 'light'); // Save the new preference to localStorage
        });
    }

}); // This closes the main DOMContentLoaded listener

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector("i");

  // Check localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  }

  toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    const darkMode = document.body.classList.contains("dark-theme");

    // Toggle icon
    if (darkMode) {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    }
  });
});
