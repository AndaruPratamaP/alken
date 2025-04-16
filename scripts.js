    // Tab navigation functionality
    const navOptions = document.querySelectorAll('.nav-option');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options and contents
            navOptions.forEach(opt => opt.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Get background color of the active tab
            const computedStyle = window.getComputedStyle(option);
            const backgroundColor = computedStyle.backgroundColor;
            
            // Show corresponding content
            const tabId = option.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabId}-content`);
            activeContent.classList.add('active');
            
            // Set the slideshow container background color to match the tab
            const slideshowContainer = activeContent.querySelector('.slideshow-container');
            slideshowContainer.style.backgroundColor = backgroundColor;
        });
    });
    
    // Initialize tab colors on load
    document.addEventListener('DOMContentLoaded', () => {
        const activeTab = document.querySelector('.nav-option.active');
        const computedStyle = window.getComputedStyle(activeTab);
        const backgroundColor = computedStyle.backgroundColor;
        
        const activeContent = document.querySelector('.tab-content.active');
        const slideshowContainer = activeContent.querySelector('.slideshow-container');
        slideshowContainer.style.backgroundColor = backgroundColor;
    });
    
    // Slideshow functionality
    function updateSlidePosition(slidesWrapper) {
        const slides = Array.from(slidesWrapper.children);
        const activeIndex = slides.findIndex(slide => slide.classList.contains('active'));
        
        // Reset all slides to non-active state
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.order = '';
        });
        
        // Sort slides so active is in middle
        const totalSlides = slides.length;
        const middlePosition = Math.floor(totalSlides / 2);
        
        for (let i = 0; i < totalSlides; i++) {
            // Calculate position relative to active slide
            let position = (i - activeIndex + middlePosition) % totalSlides;
            if (position < 0) position += totalSlides;
            
            // Set order to position slides
            slides[i].style.order = position;
            
            // Set middle slide as active
            if (position === middlePosition) {
                slides[i].classList.add('active');
            }
        }
    }
    
    function moveSlide(slidesWrapper, direction) {
        const slides = slidesWrapper.querySelectorAll('.slide');
        const activeSlide = slidesWrapper.querySelector('.slide.active');
        let activeIndex = Array.from(slides).indexOf(activeSlide);
        
        // Calculate new active index
        activeIndex = (activeIndex + direction + slides.length) % slides.length;
        
        // Remove active class from current slide
        activeSlide.classList.remove('active');
        
        // Add active class to new slide
        slides[activeIndex].classList.add('active');
        
        // Update slide positions
        updateSlidePosition(slidesWrapper);
    }
    
    // Add event listeners to all slideshows
    document.querySelectorAll('.slideshow').forEach(slideshow => {
        const slidesWrapper = slideshow.querySelector('.slides-wrapper');
        const leftArrow = slideshow.querySelector('.arrow.left');
        const rightArrow = slideshow.querySelector('.arrow.right');
        
        // Initialize slide positions
        updateSlidePosition(slidesWrapper);
        
        leftArrow.addEventListener('click', () => moveSlide(slidesWrapper, -1));
        rightArrow.addEventListener('click', () => moveSlide(slidesWrapper, 1));
    });