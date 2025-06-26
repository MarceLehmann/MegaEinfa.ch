// Main JavaScript for MegaEinfa.ch

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // Basic email validation
            if (validateEmail(email)) {
                // Here you would typically send the email to your backend
                alert('Vielen Dank für Ihre Anmeldung! Sie erhalten bald weitere Informationen.');
                this.reset();
            } else {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            }
        });
    }

    // Add loading animation for videos
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.3s ease';
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to load upcoming events (placeholder for future API integration)
function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        // This would typically fetch from an API
        // For now, we'll show a placeholder message
        eventsContainer.innerHTML = `
            <div class="event-card">
                <h3>Kommende Veranstaltungen</h3>
                <p>Neue Termine werden in Kürze bekannt gegeben. Melden Sie sich für unseren Newsletter an, um benachrichtigt zu werden!</p>
            </div>
        `;
    }
}

// Load events when page loads
document.addEventListener('DOMContentLoaded', loadUpcomingEvents);
