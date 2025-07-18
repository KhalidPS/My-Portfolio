document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const aboutSection = document.querySelector('.about-section');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    const projectDetailOverlay = document.getElementById('project-detail-overlay');
    const closeDetailBtn = document.querySelector('.close-btn');
    const heroTitlePlaceholder = document.querySelector('.hero-title-placeholder'); // NEW: Get title placeholder
    const heroImagePlaceholder = document.querySelector('.hero-image-placeholder');
    const projectDetailContent = document.querySelector('.project-detail-content');

    // --- Project Data ---
    // IMPORTANT: Customize this object with your real project details!
    const projectData = {
        1: {
            title: "TaskatCo",
            description: "TaskatCo is a task managment app to help you schedule  your daily tasks with reminder for tasks\n This app built using the following technologies: Jetpack Compose, Coroutines, Koin, Flows, room database, Media 3, Palette API",
            thumbnail: "./images/task_app/mockups.png",
            images: [
                "./images/task_app/empty_home_light.png",
                "./images/task_app/home_light.png",
                "./images/task_app/add_edit_light.png",
                "./images/task_app/time_analysis_light.png",
                "./images/task_app/done_analysis_light.png",
                "./images/task_app/drawer_app_light.png",
            ],
            githubLink: "https://github.com/KhalidPS/TaskatCo"
        },
        2: {
            title: "MusiCo",
            description: "MusiCo is local audio player with smooth and dynamic Ui that take user attention",
            thumbnail: "./images/music_app/musico_mockups.png",
            images: [
                "./images/music_app/home1.png",
                "./images/music_app/home2.png",
                "./images/music_app/played_song.png",
                "./images/music_app/played_song2.png",
                "./images/music_app/pager.gif",
                "./images/music_app/drag.gif"
            ],
            githubLink: "https://github.com/KhalidPS/MusiCo"
        },
        3: {
            title: "ChatCo",
            description: "ChatCo is a chat app to share your daily moments and to talk to your friends",
            thumbnail: "./images/chat_app/chat_mock.png",
            images: [
                "./images/chat_app/chat1.png",
                "./images/chat_app/chat2.png",
                "./images/chat_app/chat3.png",
                "./images/chat_app/chat6.png",
                "./images/chat_app/chat4.jpg",
                "./images/chat_app/chat5.jpg",
                "./images/chat_app/Chat.gif",

            ],
            githubLink: "https://github.com/KhalidPS/ChatApp"
        },/*
        4: {
            title: "Data Visualization Dashboard",
            description: "Design and implementation of an interactive data visualization dashboard for tracking key performance indicators. Built with React.js and D3.js, the dashboard allows users to filter data, view trends, and gain insights at a glance, making complex data accessible and actionable.",
            thumbnail: "https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Project+Four",
            images: [
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
            ],
            githubLink: "https://github.com/yourusername/data-dashboard"
        },
        5: {
            title: "Illustrative Art Portfolio",
            description: "A custom-built online portfolio to showcase a collection of digital illustrations and concept art. Features include a dynamic grid layout, light/dark mode toggle, and smooth transitions between art pieces, providing an immersive viewing experience for visitors. Developed with vanilla JavaScript and responsive design principles.",
            thumbnail: "https://via.placeholder.com/600x400/FF6347/FFFFFF?text=Project+Five",
            images: [
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/id/237/200/300",
            ],
            githubLink: "https://github.com/yourusername/illustration-portfolio"
        },
        6: {
            title: "SaaS Landing Page Design",
            description: "Creation of a high-converting landing page for a new SaaS product. The design emphasizes clear value propositions, engaging visuals, and a compelling call-to-action, optimized for lead generation and user acquisition. A/B testing components were integrated to optimize performance.",
            thumbnail: "https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Project+Six",
            images: [
                "https://via.placeholder.com/800x500/FFA07A/FFFFFF?text=Task+App+Dashboard",
                "https://via.placeholder.com/800x500/FFA07A/FFFFFF?text=Task+App+Detail",
                "https://via.placeholder.com/800x500/FFA07A/FFFFFF?text=Task+App+Calendar",
                "https://via.placeholder.com/800x500/6C63FF/FFFFFF?text=E-commerce+Product+Page",
                "https://via.placeholder.com/800x500/6C63FF/FFFFFF?text=E-commerce+Checkout",
            ],
            githubLink: "https://github.com/yourusername/saas-landing-page"
        }
            */
    };


    // --- Intersection Observer for Sections ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.classList.contains('project-card')) {
                    const index = Array.from(projectCards).indexOf(element);
                    element.style.transitionDelay = `${index * 0.1}s`;
                    element.classList.add('is-visible');

                    setTimeout(() => {
                        element.classList.add('content-visible');
                    }, (index * 100) + 500);

                } else if (element.classList.contains('about-section')) {
                    element.classList.add('is-visible');
                }

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe the about section
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // --- Project Detail Shared Element Transition Logic ---

    // Keep track of the elements being animated for cleanup
    let animatingElements = [];

    // Function to show project details with shared element transition
    function showProjectDetails(clickedCard, projectId) {
        const project = projectData[projectId];
        if (!project) {
            console.error("Project data not found for ID:", projectId);
            return;
        }

        // --- 1. Handle Thumbnail Image Transition ---
        const thumbnailImg = clickedCard.querySelector('img');
        const thumbnailRect = thumbnailImg.getBoundingClientRect(); // Get original position

        const clonedImg = thumbnailImg.cloneNode(true);
        clonedImg.classList.add('flying-hero-image');
        document.body.appendChild(clonedImg);
        animatingElements.push(clonedImg); // Add to cleanup list

        // Set initial position of the cloned image
        clonedImg.style.top = `${thumbnailRect.top}px`;
        clonedImg.style.left = `${thumbnailRect.left}px`;
        clonedImg.style.width = `${thumbnailRect.width}px`;
        clonedImg.style.height = `${thumbnailRect.height}px`;

        thumbnailImg.style.opacity = '0'; // Hide original thumbnail immediately

        // --- 2. Handle Title Transition ---
        const cardTitle = clickedCard.querySelector('.card-content h3');
        const cardTitleRect = cardTitle.getBoundingClientRect();

        const clonedTitle = cardTitle.cloneNode(true);
        clonedTitle.classList.add('flying-hero-title');
        document.body.appendChild(clonedTitle);
        animatingElements.push(clonedTitle); // Add to cleanup list

        // Set initial position and font size of the cloned title
        clonedTitle.style.top = `${cardTitleRect.top}px`;
        clonedTitle.style.left = `${cardTitleRect.left}px`;
        clonedTitle.style.width = `${cardTitleRect.width}px`; // Maintain initial width
        clonedTitle.style.height = `${cardTitleRect.height}px`; // Maintain initial height
        clonedTitle.style.fontSize = `${parseFloat(getComputedStyle(cardTitle).fontSize)}px`;
        clonedTitle.style.color = getComputedStyle(cardTitle).color; // Keep original color
        clonedTitle.style.fontWeight = getComputedStyle(cardTitle).fontWeight;

        cardTitle.style.opacity = '0'; // Hide original card title

        // 3. Populate the project detail content
        projectDetailContent.innerHTML = ''; // Clear previous content

        // Add additional images (if any, excluding the main thumbnail if already used)
        // Add additional images (if any, in Pixel 7 Pro size or default)
        // Assuming 'images' in projectData corresponds to these detail images
        if (project.images && project.images.length > 0) {
            const screenshotsContainer = document.createElement('div');
            screenshotsContainer.classList.add('mobile-screenshots-container');

            project.images.forEach(imageUrl => { // Use project.images as per your current structure
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Screenshot for ${project.title}`;

                // Apply 'mobile-app-screenshot' if the project title indicates it's a mobile app
                // Adjust this condition (e.g., if (project.type === "mobile")) based on your projectData structure
                img.classList.add('mobile-app-screenshot');

                /*if (project.title.includes("Mobile App Concept")) {
                    img.classList.add('mobile-app-screenshot');
                } else {
                    img.classList.add('detail-additional-image'); // General class for other additional images
                }*/

                screenshotsContainer.appendChild(img);
            });
            projectDetailContent.appendChild(screenshotsContainer);
        }

        // Add description
        const descElement = document.createElement('p');
        descElement.textContent = project.description;
        projectDetailContent.appendChild(descElement);

        // Add GitHub link (if exists)
        if (project.githubLink) {
            const githubLink = document.createElement('a');
            githubLink.href = project.githubLink;
            githubLink.target = "_blank"; // Open in new tab
            githubLink.classList.add('github-link');
            githubLink.innerHTML = '<i class="fab fa-github"></i> View on GitHub';
            projectDetailContent.appendChild(githubLink);
        }

        // 4. Activate the overlay after a tiny delay for reflow
        setTimeout(() => {
            projectDetailOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent main page scroll
            document.body.classList.add('overlay-active'); // Add class to body for background dimming/disabling

            // 5. Get target positions for cloned elements
            const targetImageRect = heroImagePlaceholder.getBoundingClientRect();
            const targetTitleRect = heroTitlePlaceholder.getBoundingClientRect();

            // Set final position of the cloned image
            clonedImg.style.top = `${targetImageRect.top}px`;
            clonedImg.style.left = `${targetImageRect.left}px`;
            clonedImg.style.width = `${targetImageRect.width}px`;
            clonedImg.style.height = `${targetImageRect.height}px`;

            // Set final position and font size of the cloned title
            clonedTitle.style.top = `${targetTitleRect.top}px`;
            clonedTitle.style.left = `${targetTitleRect.left}px`;
            clonedTitle.style.width = `${targetTitleRect.width}px`; // Set final width based on placeholder
            clonedTitle.style.height = `${targetTitleRect.height}px`; // Set final height based on placeholder
            clonedTitle.style.fontSize = getComputedStyle(heroTitlePlaceholder).fontSize; // Match placeholder font size
            clonedTitle.style.color = getComputedStyle(heroTitlePlaceholder).color; // Match placeholder color
            clonedTitle.style.fontWeight = getComputedStyle(heroTitlePlaceholder).fontWeight;
            clonedTitle.style.textAlign = getComputedStyle(heroTitlePlaceholder).textAlign;

            // Remove cloned image after transition completes and replace placeholder with real image
            clonedImg.addEventListener('transitionend', function handler() {
                clonedImg.removeEventListener('transitionend', handler);

                const finalHeroImage = document.createElement('img');
                finalHeroImage.src = project.thumbnail;
                finalHeroImage.alt = project.title;
                heroImagePlaceholder.appendChild(finalHeroImage);
                heroImagePlaceholder.style.opacity = '1';
                clonedImg.remove();
                animatingElements = animatingElements.filter(el => el !== clonedImg); // Remove from cleanup list
            });

            // Remove cloned title after transition completes and set final title in placeholder
            clonedTitle.addEventListener('transitionend', function handler() {
                clonedTitle.removeEventListener('transitionend', handler);

                heroTitlePlaceholder.textContent = project.title;
                heroTitlePlaceholder.style.opacity = '1';
                clonedTitle.remove();
                animatingElements = animatingElements.filter(el => el !== clonedTitle); // Remove from cleanup list
            });

        }, 50); // Small delay to ensure initial positions are rendered before animating






    }

    // Function to close project details
    function closeProjectDetails() {
        projectDetailOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling on main page
        document.body.classList.remove('overlay-active'); // Remove background class

        // Clean up any remaining animating elements (e.g., if user clicks too fast)
        animatingElements.forEach(el => el.remove());
        animatingElements = [];

        // Restore original thumbnail opacity for the last clicked card
        // We need to find the specific image element that was hidden
        const previouslyHiddenThumbnail = document.querySelector(`.project-card[data-project-id="${projectDetailOverlay.dataset.currentProjectId}"] img`);
        if (previouslyHiddenThumbnail) {
            previouslyHiddenThumbnail.style.opacity = '1';
        }

        // Restore original title opacity for the last clicked card
        const previouslyHiddenTitle = document.querySelector(`.project-card[data-project-id="${projectDetailOverlay.dataset.currentProjectId}"] .card-content h3`);
        if (previouslyHiddenTitle) {
            previouslyHiddenTitle.style.opacity = '1';
        }

        // Clear content and placeholders after overlay fades out
        setTimeout(() => {
            projectDetailContent.innerHTML = '';
            heroImagePlaceholder.innerHTML = '';
            heroImagePlaceholder.style.opacity = '0'; // Hide placeholder again
            heroTitlePlaceholder.innerHTML = '';
            heroTitlePlaceholder.style.opacity = '0'; // Hide placeholder again
            projectDetailOverlay.dataset.currentProjectId = ''; // Clear tracking ID
        }, 500); // Match overlay transition duration
    }

    // Event listeners for "View Project" buttons
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.project-card');
            const projectId = card.dataset.projectId;
            projectDetailOverlay.dataset.currentProjectId = projectId; // Store current project ID for cleanup
            showProjectDetails(card, projectId);
        });
    });

    // Event listener for close button
    closeDetailBtn.addEventListener('click', closeProjectDetails);

    // Close on overlay click (but not on content wrapper click)
    projectDetailOverlay.addEventListener('click', (event) => {
        if (event.target === projectDetailOverlay) {
            closeProjectDetails();
        }
    });

    // Close on ESC key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectDetailOverlay.classList.contains('active')) {
            closeProjectDetails();
        }
    });
});
