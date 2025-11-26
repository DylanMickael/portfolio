// Configuration GSAP avec ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fonction utilitaire pour obtenir les attributs data-aos
function getAosConfig(element) {
  const animation = element.getAttribute('data-aos') || 'fade-in';
  const delay = parseFloat(element.getAttribute('data-aos-delay') || 0) / 1000;
  const duration = parseFloat(element.getAttribute('data-aos-duration') || 800) / 1000;
  return { animation, delay, duration };
}

// Fonction pour créer l'animation initiale selon le type AOS
function getInitialState(animation) {
  const states = {
    'fade-in': { opacity: 0 },
    'fade-up': { opacity: 0, y: 30 },
    'fade-down': { opacity: 0, y: -30 },
    'fade-left': { opacity: 0, x: 30 },
    'fade-right': { opacity: 0, x: -30 },
    'flip-right': { opacity: 0, rotationY: 90, perspective: 1000 },
    'zoom-out': { opacity: 0, scale: 1.3 },
    'zoom-in': { opacity: 0, scale: 0.7 }
  };
  return states[animation] || states['fade-in'];
}

// Fonction pour créer l'animation finale
function getFinalState(animation) {
  return {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotationY: 0,
    duration: 0.8,
    ease: 'power2.out'
  };
}

// Fonction principale pour convertir AOS en GSAP
function convertAosToGsap() {
  // Sélectionner tous les éléments avec data-aos
  const aosElements = document.querySelectorAll('[data-aos]');

  aosElements.forEach(element => {
    const { animation, delay, duration } = getAosConfig(element);
    const initialState = getInitialState(animation);
    const finalState = getFinalState(animation);

    // Définir l'état initial
    gsap.set(element, initialState);

    // Créer l'animation avec ScrollTrigger
    gsap.to(element, {
      ...finalState,
      duration: duration || 0.8,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
        markers: false // Mettre à true pour debug
      }
    });
  });
}

// Fonction pour animer les éléments parallax (rellax)
function setupParallax() {
  const parallaxElements = document.querySelectorAll('[data-rellax-speed]');

  parallaxElements.forEach(element => {
    const speed = parseFloat(element.getAttribute('data-rellax-speed')) || 1;

    gsap.to(element, {
      y: () => {
        const rect = element.getBoundingClientRect();
        return (window.innerHeight - rect.top) * (speed - 1) * 0.5;
      },
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // Lisse le parallax
        markers: false
      }
    });
  });
}

// Animation des balles flottantes
function animateFloatingBalls() {
  gsap.utils.toArray('.ball').forEach((ball, index) => {
    gsap.to(ball, {
      y: 30,
      x: Math.random() * 20 - 10,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5
    });
  });
}

// Animation du texte tapé (typed)
function setupTypedAnimation() {
  const typedElement = document.querySelector('.typed');
  if (!typedElement) return;

  const items = typedElement.getAttribute('data-typed-items')?.split(',') || ['Web developer'];

  let currentIndex = 0;
  let currentText = '';
  let isDeleting = false;

  function type() {
    const currentItem = items[currentIndex].trim();

    if (isDeleting) {
      currentText = currentItem.substring(0, currentText.length - 1);
    } else {
      currentText = currentItem.substring(0, currentText.length + 1);
    }

    typedElement.textContent = currentText;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === currentItem) {
      typeSpeed = 2000; // Pause à la fin
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % items.length;
      typeSpeed = 500; // Pause avant le prochain mot
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Animation du bouton de contact
function setupContactButtonAnimation() {
  const contactButtons = document.querySelectorAll('.contact-button');

  contactButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out'
      });
    });
  });
}

// Animation de la section Hero au chargement
function setupHeroAnimation() {
  const heroText = document.querySelector('.hero__text');
  const heroImage = document.querySelector('.hero__image__container');

  if (heroText) {
    gsap.from(heroText, {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out'
    });
  }

  if (heroImage) {
    gsap.from(heroImage, {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    });
  }
}

// Fonction pour animer les cartes au survol
function setupCardHoverAnimation() {
  const cards = document.querySelectorAll('.portfolio__item, .services__item');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Initialiser toutes les animations quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  // Désactiver AOS s'il est chargé
  if (window.AOS) {
    AOS.init({ disable: true });
  }

  // Initialiser les animations GSAP
  setupHeroAnimation();
  convertAosToGsap();
  setupParallax();
  animateFloatingBalls();
  setupTypedAnimation();
  setupContactButtonAnimation();
  setupCardHoverAnimation();

  // Refresh ScrollTrigger après quelques éléments chargés
  ScrollTrigger.refresh();
});

// Refresh ScrollTrigger lors du redimensionnement
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});