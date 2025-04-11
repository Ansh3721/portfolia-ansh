// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const body = document.querySelector('body');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Toggle body scroll
    if (nav.classList.contains('nav-active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            body.style.overflow = 'auto';
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Text Rotation Animation
document.addEventListener('DOMContentLoaded', () => {
    // Manually handle text rotation in case CSS animation fails
    const rotateText = () => {
        const textElements = document.querySelectorAll('.text-rotate span');
        if (!textElements.length) return;
        
        let activeIndex = 0;
        
        // Initially hide all elements
        textElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        // Show the first element
        setTimeout(() => {
            textElements[0].style.opacity = '1';
            textElements[0].style.transform = 'translateY(0)';
        }, 300);
        
        // Rotate through elements
        setInterval(() => {
            // Hide current element
            textElements[activeIndex].style.opacity = '0';
            textElements[activeIndex].style.transform = 'translateY(-20px)';
            
            // Move to next element
            activeIndex = (activeIndex + 1) % textElements.length;
            
            // Show next element after a brief delay
            setTimeout(() => {
                textElements[activeIndex].style.opacity = '1';
                textElements[activeIndex].style.transform = 'translateY(0)';
            }, 300);
        }, 4000); // Change every 4 seconds
    };
    
    // Start the rotation when page loads
    rotateText();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate header height for offset
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        formStatus.innerHTML = '<p class="sending-message"><i class="fas fa-spinner fa-spin"></i> Sending message...</p>';
        
        // Get form values
        const name = this.querySelector('input[name="user_name"]').value;
        const email = this.querySelector('input[name="user_email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        console.log("Sending email with data:", { name, email, message: message.substring(0, 20) + "..." });
        
        // Send email using EmailJS
        emailjs.send("service_ctn9f0q", "template_5b8oepo", {
            user_name: name,
            user_email: email,
            message: message
        })
            .then(function(response) {
                console.log("Email sent successfully!", response);
                // Create confirmation message
                const formContainer = document.querySelector('.contact-form');
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'form-confirmation';
                confirmationMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you ${name} for your message. I'll get back to you as soon as possible at ${email}.</p>
                    <button class="reset-form">Send Another Message</button>
                `;
                
                // Hide form and show confirmation
                formContainer.style.opacity = '0';
                setTimeout(() => {
                    formContainer.innerHTML = '';
                    formContainer.appendChild(confirmationMessage);
                    formContainer.style.opacity = '1';
                    
                    // Add event listener for reset button
                    document.querySelector('.reset-form').addEventListener('click', () => {
                        location.reload();
                    });
                }, 300);
            }, function(error) {
                console.error("Error sending email:", error);
                formStatus.innerHTML = `<p class="error-message"><i class="fas fa-exclamation-circle"></i> Failed to send message: ${error.text || 'Unknown error'}. Please try again or contact directly via email.</p>`;
            });
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    
    // Ensure contact section is always visible
    if (section.id === 'contact') {
        section.classList.add('animate');
        section.querySelectorAll('.contact-info, .contact-form').forEach(el => {
            el.classList.add('animate');
        });
    }
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .achievement-card, .resume-item, .resume-download');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll();

// Track Resume Downloads
document.querySelector('.download-button').addEventListener('click', () => {
    console.log('Resume download initiated');
}); 