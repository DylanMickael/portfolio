const scrollToTopButton = document.createElement('button');
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.innerHTML = `
  <svg viewBox="0 0 384 512" class="svgIcon">
    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
  </svg>
`;

document.body.appendChild(scrollToTopButton);

if (window.location.pathname.includes('/fr/')) {
    document.documentElement.style.setProperty('--scroll-to-top-text', '"Retour en haut"');
}

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > viewportHeight) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.visibility = 'visible';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.visibility = 'hidden';
    }
});