document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing animation for main heading
    const mainHeading = "Welcome to Oboch Main SDA Church";
    typeText(document.getElementById('typing-heading'), mainHeading, () => {
        
    });

    // Typing animation for all subheadings
    const subheadings = document.querySelectorAll('.typing-subheading');
    subheadings.forEach(heading => {
        const originalText = heading.textContent;
        heading.textContent = ''; 
        typeText(heading, originalText);
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your submission. We will contact you soon.');
            this.reset();
        });
    });
});

// Typing animation function
function typeText(element, text, callback) {
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deleteSpeed = 50;
    let pauseBetween = 2000;
    
    function type() {
        const currentText = element.textContent;
        
        if (!isDeleting && i < text.length) {
            
            element.textContent = currentText + text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && i > 0) {
            
            element.textContent = currentText.substring(0, currentText.length - 1);
            i--;
            setTimeout(type, deleteSpeed);
        } else if (!isDeleting && i === text.length) {
            
            isDeleting = true;
            setTimeout(type, pauseBetween);
        } else if (isDeleting && i === 0) {
        
            isDeleting = false;
            setTimeout(type, typingSpeed / 2);
        }
    }
    

    type();
    
    if (callback) {
        let checkCompletion = setInterval(() => {
            if (i === text.length && isDeleting === false) {
                clearInterval(checkCompletion);
                callback();
            }
        }, 100);
    }
}