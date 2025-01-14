// script.js

// Ensure the EmailJS SDK is loaded before this script
// If using modules, you can import Three.js and other dependencies here

// Disable automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

/* =========================
   EmailJS Integration
   ========================= */
const EMAILJS_USER_ID = '4T62yccngeRRgEJm_'; // Replace with your EmailJS user ID
const EMAILJS_SERVICE_ID = 'service_01rinhg'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_ulwokcf'; // Replace with your EmailJS template ID

// Initialize EmailJS
(function(){
  emailjs.init(EMAILJS_USER_ID);
})();

/* =========================
   Dark Mode Toggle and Theme Handling
   ========================= */
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

/* =========================
   Section Visibility Control
   ========================= */
const allSections = document.querySelectorAll('section');

const showSection = (sectionId) => {
  allSections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
      section.classList.add('hidden');
    }
  });

  // Update active class on navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href').substring(1) === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

// Initially show all sections
allSections.forEach((section, index) => {
  if (index === 0) {
    section.classList.add('visible');
  } else {
    section.classList.add('hidden');
  }
});

// Handle navigation link clicks
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    showSection(targetId);
  });
});

/* =========================
   Initialize AOS
   ========================= */
AOS.init({
  duration: 1000,
  once: true, // Animation only happens once when scrolling down
});

/* =========================
   Accordion Functionality
   ========================= */
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

/* =========================
   Back to Top Button Functionality
   ========================= */
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

/* =========================
   Parallax Effect for Hero Section
   ========================= */
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  let offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.5 + "px";
});

/* =========================
   Contact Form Handling with EmailJS
   ========================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Basic Validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '' || email === '' || message === '') {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.style.color = 'red';
    return;
  }

  // Email Validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = 'red';
    return;
  }

  // Send Email via EmailJS
  formStatus.textContent = 'Sending message...';
  formStatus.style.color = 'blue';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    contactForm.reset();
    formStatus.textContent = 'Message sent successfully!';
    formStatus.style.color = 'green';
  }, function(error) {
    console.error('FAILED...', error);
    // Provide more detailed feedback to the user
    if (error.text) {
      formStatus.textContent = `Failed to send message: ${error.text}`;
    } else {
      formStatus.textContent = 'Failed to send message. Please try again later.';
    }
    formStatus.style.color = 'red';
  });
});

/* =========================
   Initialize the New Three.js Animation
   ========================= */
initThreeJSAnimation();

/* =========================
   Three.js Animation Function
   ========================= */
function initThreeJSAnimation() {
  const container = document.getElementById('threejs-global-container');

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );
  camera.position.set(0, 0, 50);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Responsive Resize Handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Add Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(50, 50, 50);
  scene.add(directionalLight);

  // Create Interactive Spheres
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x5555ff, roughness: 0.7, metalness: 0.5 });

  const spheres = [];
  const numSpheres = 20;

  for (let i = 0; i < numSpheres; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
    sphere.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    sphere.originalColor = sphere.material.color.getHex();
    scene.add(sphere);
    spheres.push(sphere);
  }

  // Raycaster for Interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Event Listener for Mouse Move
  window.addEventListener('mousemove', onMouseMove, false);

  function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components.
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire scene slowly
    scene.rotation.y += 0.001;

    // Update spheres rotation
    spheres.forEach(sphere => {
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
    });

    // Raycasting to detect intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);

    spheres.forEach(sphere => {
      if (intersects.find(intersect => intersect.object === sphere)) {
        sphere.material.color.setHex(0xff6347); // Change color on hover
      } else {
        sphere.material.color.setHex(sphere.originalColor); // Revert color
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}