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
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-button');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!validateEmail(email)) {
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }
            
            // Show loading state
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sende...';
            submitButton.disabled = true;
            
            try {
                // Send POST request to Azure Logic App
                const response = await fetch('https://prod-19.switzerlandnorth.logic.azure.com/workflows/4aa99ca22abd457081126a66a0e65aa2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eIb5MvQLjvPpfXyN0iuudQS_7VdVTRJMnSr9jrgLOzA', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        timestamp: new Date().toISOString(),
                        source: 'megaeinfa.ch'
                    })
                });
                
                if (response.ok) {
                    showNotification('🎉 Vielen Dank für Ihre Anmeldung! Sie erhalten bald weitere Informationen.', 'success');
                    this.reset();
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
            } catch (error) {
                console.error('Newsletter signup error:', error);
                showNotification('⚠️ Entschuldigung, es gab ein Problem bei der Anmeldung. Bitte versuchen Sie es später erneut.', 'error');
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
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

    // Initialize filters
    initializeFilters();

    // Watch for dynamically added read more buttons
    const mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const newButtons = node.querySelectorAll ? node.querySelectorAll('.read-more-btn') : [];
                    newButtons.forEach(button => {
                        if (!button.hasAttribute('data-initialized')) {
                            button.setAttribute('data-initialized', 'true');
                            button.setAttribute('aria-expanded', 'false');
                            button.addEventListener('click', function(e) {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleDescription(this);
                            });
                        }
                    });
                }
            });
        });
    });
    
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Add search functionality
    addSearchFunctionality();
});

// Initialize read more buttons
function initializeReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    console.log('Found read more buttons:', readMoreButtons.length);
    
    readMoreButtons.forEach(button => {
        if (!button.hasAttribute('data-initialized')) {
            button.setAttribute('data-initialized', 'true');
            button.setAttribute('aria-expanded', 'false');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDescription(this);
            });
        }
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
}

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

// Filter System for Recordings
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryFilter = document.getElementById('category-filter');
    const tagFilter = document.getElementById('tag-filter');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const recordingCards = document.querySelectorAll('.recording-card');

    // Filter type buttons (All, Category, Tag)
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.dataset.filter;
            
            // Hide all filter options
            categoryFilter.classList.add('hidden');
            tagFilter.classList.add('hidden');
            
            // Reset all cards to visible
            recordingCards.forEach(card => card.classList.remove('hidden'));
            
            // Remove active states from filter buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            tagButtons.forEach(btn => btn.classList.remove('active'));

            // Show appropriate filter
            if (filterType === 'category') {
                categoryFilter.classList.remove('hidden');
            } else if (filterType === 'tag') {
                tagFilter.classList.remove('hidden');
            }
        });
    });

    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.dataset.category;
            
            recordingCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (cardCategory === selectedCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Tag filter buttons
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            tagButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedTag = this.dataset.tag;
            
            recordingCards.forEach(card => {
                const cardTags = card.dataset.tags.split(',');
                if (cardTags.includes(selectedTag)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Search functionality
function addSearchFunctionality() {
    // Create search input if it doesn't exist
    const filterControls = document.querySelector('.filter-controls');
    if (filterControls && !document.querySelector('.search-input')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" class="search-input" placeholder="🔍 Suche in Aufzeichnungen...">
        `;
        filterControls.appendChild(searchContainer);

        const searchInput = searchContainer.querySelector('.search-input');
        const recordingCards = document.querySelectorAll('.recording-card');

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            recordingCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p:last-of-type').textContent.toLowerCase();
                const presenter = card.querySelector('.event-details').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    presenter.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
}

// Read More / Read Less functionality
function toggleDescription(button) {
    const cardContent = button.closest('.card-content');
    const preview = cardContent.querySelector('.description-preview');
    const full = cardContent.querySelector('.description-full');
    
    if (full.classList.contains('expanded')) {
        // Collapse
        full.classList.remove('expanded');
        preview.classList.remove('collapsed');
        button.textContent = 'Mehr lesen →';
        button.setAttribute('aria-expanded', 'false');
    } else {
        // Expand
        full.classList.add('expanded');
        preview.classList.add('collapsed');
        button.textContent = '← Weniger anzeigen';
        button.setAttribute('aria-expanded', 'true');
    }
}
