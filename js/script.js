document.addEventListener('DOMContentLoaded', function() {
    /* Spotify feature disabled
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
    */

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

    const comfreeModalTrigger = document.getElementById('comfree-modal-trigger');
    const comfreeModal = document.getElementById('comfree-modal');
    const comfreeModalClose = document.getElementById('comfree-modal-close');
    const comfreeModalVideo = document.getElementById('comfree-modal-video');

    function openComfreeModal() {
        if (!comfreeModal || !comfreeModalVideo) {
            return;
        }

        comfreeModal.classList.add('open');
        comfreeModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        comfreeModalVideo.currentTime = 0;
        comfreeModalVideo.play().catch(() => {});
    }

    function closeComfreeModal() {
        if (!comfreeModal || !comfreeModalVideo) {
            return;
        }

        comfreeModal.classList.remove('open');
        comfreeModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        comfreeModalVideo.pause();
        comfreeModalVideo.currentTime = 0;
    }

    if (comfreeModalTrigger && comfreeModal && comfreeModalClose && comfreeModalVideo) {
        comfreeModalTrigger.addEventListener('click', openComfreeModal);
        comfreeModalClose.addEventListener('click', closeComfreeModal);

        comfreeModal.addEventListener('click', function(event) {
            if (event.target === comfreeModal) {
                closeComfreeModal();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && comfreeModal.classList.contains('open')) {
                closeComfreeModal();
            }
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