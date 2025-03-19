const diya = document.querySelector('.diya');
const flame = document.querySelector('.flame');
const bannerOverflow = document.querySelector('.banner-overflow');
const bannerHeadings = document.querySelectorAll('.banner-content h1, .banner-content h6'); 

let isLit = false;

diya.addEventListener('click', toggleDiya);

function toggleDiya() {
    if (isLit) {
        diya.classList.remove('glow');
        flame.style.display = 'none';

        bannerOverflow.classList.remove('active');

       
        bannerHeadings.forEach((heading) => {
            heading.classList.remove('active');
        });

        isLit = false;
    } else {
        diya.classList.add('glow');
        flame.style.display = 'block';

        bannerOverflow.classList.add('active');

        
        bannerHeadings.forEach((heading) => {
            heading.classList.add('active');
        });

        isLit = true;
    }
}








document.getElementById('diwaliImage').addEventListener('click', toggleFireworks);

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworksPlaying = false;
let animationId;

function toggleFireworks() {
    fireworksPlaying ? stopFireworks() : launchFireworks();
}

function launchFireworks() {
    fireworksPlaying = true;
    for (let i = 0; i < 5; i++) {
        setTimeout(createFirework, i * 500);
    }
}

function stopFireworks() {
    fireworksPlaying = false;
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createFirework() {
    if (!fireworksPlaying) return;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 3 + 1;
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 30}, 100%, 50%)`,
            velocity: {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed,
            },
            lifetime: 0,
        });
    }

    animateFirework(particles);
}

function animateFirework(particles) {
    const animation = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.lifetime > 50) {
                particles.splice(index, 1);
                return;
            }
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.lifetime++;
            
            const size = particle.radius * (1 - particle.lifetime / 50);
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
        });

        if (particles.length > 0) {
            animationId = requestAnimationFrame(animation);
        }
    };

    animation();
}

document.querySelectorAll('.nav-link, .footer-link').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


const ratingContainers = document.querySelectorAll('.rating-container');

ratingContainers.forEach((container, index) => {
    const stars = container.querySelectorAll('.star');

    function highlightStars(rating) {
        stars.forEach((star, idx) => {
            if (idx < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    let savedRating = localStorage.getItem(`rating-${index}`) || 0;
    highlightStars(savedRating);

    stars.forEach((star, starIndex) => {
        star.addEventListener('click', () => {
            let rating = starIndex + 1;
            highlightStars(rating);
            localStorage.setItem(`rating-${index}`, rating);
        });
    });
});




document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navMenu = document.getElementById('navbarNavDropdownRight'); 
    const menuIcon = document.querySelector('.menu-icon');
  
    const isOpen = navMenu.classList.toggle('open');
    
    this.setAttribute('aria-expanded', isOpen);
  
    menuIcon.classList.toggle('open');
  });
  
  document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navbarNavDropdownRight');
    const menuIcon = document.querySelector('.menu-icon');
    const toggler = document.querySelector('.navbar-toggler');
    const closeButton = document.querySelector('.close-menu');
  
    if (
      !navMenu.contains(event.target) && 
      !menuIcon.contains(event.target) && 
      !toggler.contains(event.target) && 
      !closeButton.contains(event.target)
    ) {
      navMenu.classList.remove('open');
      menuIcon.classList.remove('open');
      toggler.setAttribute('aria-expanded', 'false');
    }
  });
  
  document.querySelector('.close-menu').addEventListener('click', function() {
    const navMenu = document.getElementById('navbarNavDropdownRight');
    const menuIcon = document.querySelector('.menu-icon');
    navMenu.classList.remove('open');
    menuIcon.classList.remove('open');
    document.querySelector('.navbar-toggler').setAttribute('aria-expanded', 'false');
  });
  
  const navLinks = document.querySelectorAll('#navbarNavDropdownRight .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const navMenu = document.getElementById('navbarNavDropdownRight');
      const menuIcon = document.querySelector('.menu-icon');
  
      navMenu.classList.remove('open');
      menuIcon.classList.remove('open');
      document.querySelector('.navbar-toggler').setAttribute('aria-expanded', 'false');
    });
  });
  
  function hideMenu() {
    const navMenu = document.getElementById('navbarNavDropdownRight');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      menuIcon.classList.remove('open');
      document.querySelector('.navbar-toggler').setAttribute('aria-expanded', 'false');
    }
  }
  
  window.addEventListener('scroll', hideMenu);
  