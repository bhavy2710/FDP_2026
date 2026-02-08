// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit();
        });
    }

    // Add scroll animation to elements
    observeElements();
});

// Handle contact form submission
function handleFormSubmit() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Get form values
    const inputs = form.querySelectorAll('input, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;

    // Validate form
    if (name && email && message) {
        // Show success message
        showNotification('Message sent successfully! Thank you for contacting me.');
        
        // Reset form
        form.reset();
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Observe elements for scroll animation
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideDown 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe skill cards and project cards
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Log message
console.log('Portfolio loaded successfully!');
