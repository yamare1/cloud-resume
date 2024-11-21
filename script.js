// Disable automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Dark Mode Toggle, Accordion Functionality, AOS Initialization, and Back to Top Button
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Visitor Counter (Ensure visitorCounter is defined in visitor-counter.js)
  if (typeof visitorCounter === 'function') {
    visitorCounter();
  }

  // Dark Mode Toggle and Theme Handling
  const darkModeToggle = document.getElementById('dark-mode-toggle');

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
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');
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

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true, // Animation only happens once when scrolling down
  });

  // Accordion Functionality
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all open accordion items
      accordionButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.style.maxHeight = null;
      });

      // Toggle the clicked accordion item
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        const content = button.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Back to Top Button Functionality
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) { // Show button after scrolling down 300px
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});