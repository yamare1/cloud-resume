// Disable automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Visitor Counter Initialization
document.addEventListener('DOMContentLoaded', () => {
  visitorCounter();
});

// Dark Mode Toggle and Theme Handling
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  // Function to apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      darkModeToggle.checked = true;
    } else {
      document.body.classList.remove('dark');
      darkModeToggle.checked = false;
    }
  };

  // Toggle dark mode and save preference
  darkModeToggle.addEventListener('change', () => {
    const newTheme = darkModeToggle.checked ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Intersection Observer for Active Link Highlighting
  const navHeight = document.querySelector('nav').offsetHeight;

  const options = {
    root: null,
    rootMargin: `-${navHeight}px 0px 0px 0px`,
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true, // Animation only happens once when scrolling down
});

// JavaScript for Parallax Effect
document.addEventListener('DOMContentLoaded', () => {
  const heroBackground = document.querySelector('.hero-background');
  const hero = document.querySelector('.hero');

  // Function to handle parallax
  const handleParallax = () => {
    const scrollTop = window.pageYOffset;
    const heroOffsetTop = hero.offsetTop;
    const heroHeight = hero.offsetHeight;
    
    if (scrollTop + window.innerHeight > heroOffsetTop && scrollTop < heroOffsetTop + heroHeight) {
      // Calculate the scroll ratio within the hero section
      const relativeScroll = (scrollTop - heroOffsetTop) / heroHeight;
      // Adjust the background position (the factor determines the speed)
      heroBackground.style.transform = `translateY(${relativeScroll * 50 - 15}%)`;
    }
  };

  // Throttle the scroll event using requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call to set the position
  handleParallax();
});