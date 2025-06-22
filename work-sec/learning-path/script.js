document.addEventListener('DOMContentLoaded', function() {
  // Particles.js Configuration
 particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#00ff73"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": { 
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00ff73",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.getElementById('sideMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      sideMenu.classList.remove('open');
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animation on Scroll for Certification Cards
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.certification-card, .progress-card, .skills-column, .timeline-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  const animatedElements = document.querySelectorAll('.certification-card, .progress-card, .skills-column, .timeline-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

// Certificate Modal Functionality
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certImage');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.btn-view').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // First try to use the href attribute directly
        let imagePath = button.getAttribute('href');
        
        // If href doesn't work, try to construct from data-cert
        if (!imagePath || imagePath === '#') {
          const certKey = button.getAttribute('data-cert');
          if (certKey) {
            // Try both .jpg and .png extensions
            imagePath = `/images/certifications/${certKey}.jpg`;
          }
        }

        console.log('Attempting to load image from:', imagePath); // Debugging
        
        // Create a test image to check if it exists
        const testImage = new Image();
        testImage.onload = function() {
          modalImage.src = imagePath;
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        };
        testImage.onerror = function() {
          console.error('Failed to load image:', imagePath);
          // Try with .png extension if .jpg failed
          if (imagePath.endsWith('.jpg')) {
            const pngPath = imagePath.replace('.jpg', '.png');
            console.log('Trying alternative path:', pngPath);
            modalImage.src = pngPath;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          } else {
            alert('Certificate image not found!');
          }
        };
        testImage.src = imagePath;
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
});