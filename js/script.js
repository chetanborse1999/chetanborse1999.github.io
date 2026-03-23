// Theme and mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Define theme - only indigo + gold
    const currentTheme = 'indigo';

    // Get saved preferences from localStorage
    let currentMode = localStorage.getItem('mode') || 'light';

    // Apply saved preferences on page load
    applyTheme(currentTheme);
    applyMode(currentMode);
    updateButtonLabels();

    // Mode toggle button
    modeToggle.addEventListener('click', function() {
        currentMode = currentMode === 'light' ? 'dark' : 'light';
        applyMode(currentMode);
        updateButtonLabels();
    });

    // Apply theme to body
    function applyTheme(theme) {
        body.className = body.className.replace(/\b(blue|teal|indigo)\b/g, '').trim();
        body.classList.add(theme);
    }

    // Apply mode to body
    function applyMode(mode) {
        body.className = body.className.replace(/\b(light|dark)\b/g, '').trim();
        body.classList.add(mode);
        localStorage.setItem('mode', mode);
    }

    // Update button labels
    function updateButtonLabels() {
        modeToggle.textContent = currentMode === 'light' ? '☀️' : '🌙';
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll nudge effect on page load
    function scrollNudge() {
        const scrollDistance = 120; // pixels to scroll
        const scrollDuration = 500; // duration in milliseconds
        
        // Scroll down
        smoothScroll(scrollDistance, scrollDuration).then(() => {
            // Immediately scroll back to top
            smoothScroll(0, scrollDuration);
        });
    }

    // Helper function for smooth scrolling
    function smoothScroll(targetPosition, duration) {
        return new Promise((resolve) => {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let start = null;

            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function for smooth motion
                const easeInOutQuad = percentage < 0.5 
                    ? 2 * percentage * percentage 
                    : -1 + (4 - 2 * percentage) * percentage;
                
                window.scrollTo(0, startPosition + distance * easeInOutQuad);

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    resolve();
                }
            });
        });
    }

    // Trigger scroll nudge after page fully loads (delay for content to settle)
    setTimeout(scrollNudge, 500);

    // Spotify widget collapse/expand functionality
    const spotifyWidget = document.getElementById('spotify-widget');
    const spotifyHeader = document.getElementById('spotify-widget-header');
    const spotifyCollapseBtn = document.getElementById('spotify-collapse-btn');
    let collapseTimeout;
    let mouseOverWidget = false;

    // Helper function to set collapse timeout
    function setCollapseTimeout(delay) {
        clearTimeout(collapseTimeout);
        if (!mouseOverWidget && !spotifyWidget.classList.contains('collapsed')) {
            collapseTimeout = setTimeout(() => {
                if (!mouseOverWidget) {
                    spotifyWidget.classList.add('collapsed');
                    updateButtonText();
                }
            }, delay);
        }
    }

    // Helper function to update button text
    function updateButtonText() {
        spotifyCollapseBtn.textContent = spotifyWidget.classList.contains('collapsed') ? '+' : '−';
    }

    // Initialize button text
    updateButtonText();

    // Auto-collapse the widget after 4 seconds on page load
    collapseTimeout = setTimeout(() => {
        if (!mouseOverWidget) {
            spotifyWidget.classList.add('collapsed');
            updateButtonText();
        }
    }, 4000);

    // Mouse enter: pause collapse
    spotifyWidget.addEventListener('mouseenter', () => {
        mouseOverWidget = true;
        clearTimeout(collapseTimeout);
    });

    // Mouse leave: resume collapse countdown
    spotifyWidget.addEventListener('mouseleave', () => {
        mouseOverWidget = false;
        if (!spotifyWidget.classList.contains('collapsed')) {
            setCollapseTimeout(2000);
        }
    });

    // Toggle collapse on header click
    spotifyHeader.addEventListener('click', () => {
        clearTimeout(collapseTimeout);
        spotifyWidget.classList.toggle('collapsed');
        updateButtonText();
        
        // If widget is now expanded, auto-collapse after 2 seconds (if no mouse over)
        if (!spotifyWidget.classList.contains('collapsed') && !mouseOverWidget) {
            setCollapseTimeout(2000);
        }
    });

    spotifyCollapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(collapseTimeout);
        spotifyWidget.classList.toggle('collapsed');
        updateButtonText();
        
        // If widget is now expanded, auto-collapse after 2 seconds (if no mouse over)
        if (!spotifyWidget.classList.contains('collapsed') && !mouseOverWidget) {
            setCollapseTimeout(2000);
        }
    });

    // Show More Projects functionality
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let allProjectsVisible = false;

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            allProjectsVisible = !allProjectsVisible;
            
            hiddenProjects.forEach(project => {
                if (allProjectsVisible) {
                    project.classList.add('visible');
                } else {
                    project.classList.remove('visible');
                }
            });
            
            // Update button text
            showMoreBtn.textContent = allProjectsVisible ? 'Show Less Projects' : 'Show More Projects';
        });
    }
});