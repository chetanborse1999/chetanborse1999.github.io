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
        spotifyWidget.classList.toggle('collapsed');
        updateButtonText();
        if (!spotifyWidget.classList.contains('collapsed') && !mouseOverWidget) {
            setCollapseTimeout(2000);
        }
    });

    spotifyCollapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        spotifyWidget.classList.toggle('collapsed');
        updateButtonText();
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

    // Lazy-load research teaser video on explicit user click
    const researchVideoTrigger = document.getElementById('research-video-trigger');
    const researchVideoPlayer = document.getElementById('research-video-player');

    if (researchVideoTrigger && researchVideoPlayer) {
        researchVideoTrigger.addEventListener('click', function() {
            const videoSrc = researchVideoTrigger.getAttribute('data-video-src');
            if (!videoSrc) return;

            const video = document.createElement('video');
            video.width = 560;
            video.height = 315;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.controls = true;
            video.preload = 'metadata';

            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';
            video.appendChild(source);

            researchVideoPlayer.innerHTML = '';
            researchVideoPlayer.appendChild(video);
            researchVideoTrigger.style.display = 'none';
        }, { once: true });
    }
});