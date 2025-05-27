// --------------------------------------------------------------------------------
// Main script for portfolio page functionality
// --------------------------------------------------------------------------------
(function ($) {
    // --------------------------------------------------------------------------------
    // Global or module-level variables
    // --------------------------------------------------------------------------------
    let lastScrollPosition = 0;
    const emailConfig = {
        userId: 'eqWIHcTZUiGnh6cH5',
        templateId: 'template_ue7t2rb',
        serviceId: 'service_2f6kux5',
        recipientEmail: 'mickaelrakotonarivo@gmail.com'
    };

    // --------------------------------------------------------------------------------
    // Document Ready and Window Load Event Handlers
    // --------------------------------------------------------------------------------
    $(document).ready(function () {
        setupBackgroundImages();
        initMobileNavigation();
        initHeroSlider();
        initAboutSlider();
        initTestimonialSlider();
        initLatestSlider();
        initImageSwiper();
        initTypedJs();
        positionBalls();
        initMailSender();
        initParallaxScroll();
        initCursorTrail();
        updateSocialVisibility(); // Initial check
        initTheatreJs();
        initVantaBackground();

        // Initial call for active menu section
        updateActiveMenuSectionOnScroll();
        setupCvDownloadListener();

        // Scroll-based event listeners
        $(window).on('scroll', handleHeaderVisibilityOnScroll);
        window.addEventListener("scroll", toggleHeaderScrolledClass);
        window.addEventListener('scroll', updateActiveMenuSectionOnScroll);

        // Resize-based event listener
        $(window).on('resize', updateSocialVisibility);
    });

    $(window).on('load', function () {
        handlePreloader();
        initPortfolioFilter();
        initAOS();
    });

    // --------------------------------------------------------------------------------
    // Function: handlePreloader()
    // Desc: Handles the fade out of the preloader.
    // --------------------------------------------------------------------------------
    function handlePreloader() {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    }

    // --------------------------------------------------------------------------------
    // Function: handleHeaderVisibilityOnScroll()
    // Desc: Shows or hides the header based on scroll direction.
    // --------------------------------------------------------------------------------
    function handleHeaderVisibilityOnScroll() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScrollPosition) {
            $('.header').fadeOut(400);
        } else {
            $('.header').fadeIn(600);
        }
        lastScrollPosition = currentScroll;
    }

    // --------------------------------------------------------------------------------
    // Function: toggleHeaderScrolledClass()
    // Desc: Adds/removes 'scrolled' class to header based on scroll position.
    // --------------------------------------------------------------------------------
    function toggleHeaderScrolledClass() {
        const header = document.querySelector(".header");
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    }

    // --------------------------------------------------------------------------------
    // Function: setupBackgroundImages()
    // Desc: Sets background images for elements with 'data-setbg' attribute.
    // --------------------------------------------------------------------------------
    function setupBackgroundImages() {
        $('.set-bg').each(function () {
            var bg = $(this).data('setbg');
            if (bg) {
                $(this).css('background-image', 'url(' + bg + ')');
            }
        });
    }

    // --------------------------------------------------------------------------------
    // Function: initPortfolioFilter()
    // Desc: Initializes portfolio filtering using MixItUp.
    // --------------------------------------------------------------------------------
    function initPortfolioFilter() {
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0 && typeof mixitup !== 'undefined') {
            var containerEl = document.querySelector('.portfolio__gallery');
            mixitup(containerEl);
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initMobileNavigation()
    // Desc: Initializes mobile navigation using Slicknav.
    // --------------------------------------------------------------------------------
    function initMobileNavigation() {
        if ($(".mobile-menu").length > 0 && $.fn.slicknav) {
            $(".mobile-menu").slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: true
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initHeroSlider()
    // Desc: Initializes the hero slider using OwlCarousel.
    // --------------------------------------------------------------------------------
    function initHeroSlider() {
        if ($('.hero__slider').length > 0 && $.fn.owlCarousel) {
            $('.hero__slider').owlCarousel({
                loop: false,
                dots: false,
                mouseDrag: false,
                animateOut: '',
                animateIn: '',
                items: 1,
                margin: 0,
                smartSpeed: 0,
                autoHeight: false,
                autoplay: false,
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initAboutSlider()
    // Desc: Initializes the about slider using OwlCarousel and customizes dots.
    // --------------------------------------------------------------------------------
    function initAboutSlider() {
        if ($(".about-slider").length > 0 && $.fn.owlCarousel) {
            $(".about-slider").owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                nav: false,
                dots: true,
            });

            var dot = $('.about-slider .owl-dot');
            dot.each(function () {
                var index = $(this).index() + 1;
                if (index < 10) {
                    $(this).html('0').append(index);
                } else {
                    $(this).html(index);
                }
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initTestimonialSlider()
    // Desc: Initializes the testimonial slider using OwlCarousel.
    // --------------------------------------------------------------------------------
    function initTestimonialSlider() {
        if ($(".testimonial__slider").length > 0 && $.fn.owlCarousel) {
            $(".testimonial__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 3,
                dots: true,
                dotsEach: 2,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                responsive: {
                    992: { items: 3 },
                    768: { items: 2 },
                    320: { items: 1 }
                }
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initLatestSlider()
    // Desc: Initializes the latest slider using OwlCarousel.
    // --------------------------------------------------------------------------------
    function initLatestSlider() {
        if ($(".latest__slider").length > 0 && $.fn.owlCarousel) {
            $(".latest__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                dotsEach: 2,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initImageSwiper()
    // Desc: Initializes the image swiper.
    // --------------------------------------------------------------------------------
    function initImageSwiper() {
        if (typeof Swiper !== 'undefined' && document.querySelector(".mySwiper")) {
            new Swiper(".mySwiper", {
                effect: "cards",
                grabCursor: true,
                initialSlide: 1,
                cardsEffect: {
                    perSlideOffset: 10,
                    perSlideRotate: 2,
                },
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initAOS()
    // Desc: Initializes Animate On Scroll library.
    // --------------------------------------------------------------------------------
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                offsetTop: 0,
                duration: 500,
                easing: 'ease-in-out',
                once: false,
                mirror: false
            });
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initTypedJs()
    // Desc: Initializes Typed.js for animated text.
    // --------------------------------------------------------------------------------
    function initTypedJs() {
        const selectTyped = document.querySelector('.typed');
        if (typeof Typed !== 'undefined' && selectTyped) {
            let typed_strings = selectTyped.getAttribute('data-typed-items');
            if (typed_strings) {
                typed_strings = typed_strings.split(',');
                new Typed('.typed', {
                    strings: typed_strings,
                    loop: true,
                    typeSpeed: 80,
                    backSpeed: 50,
                    backDelay: 2000
                });
            }
        }
    }

    // --------------------------------------------------------------------------------
    // Function: positionBalls()
    // Desc: Positions decorative ball elements.
    // --------------------------------------------------------------------------------
    function positionBalls() {
        const balls = document.querySelectorAll(".ball");
        const positions = [
            { x: -16, y: -18, size: 300 }, { x: 98, y: 80, size: 300 },
            { x: 98, y: -10, size: 300 }, { x: 70, y: -15, size: 220 },
            { x: -10, y: -40, size: 250 }, { x: 92, y: -40, size: 300 },
            { x: -15, y: -40, size: 300 }, { x: 90, y: -20, size: 300 },
            { x: -12, y: -40, size: 300 },
        ];

        balls.forEach((ball, index) => {
            if (positions[index]) {
                const { x, y, size } = positions[index];
                ball.style.left = `${x}%`;
                ball.style.top = `${y}%`;
                ball.style.width = `${size}px`;
                ball.style.height = `${size}px`;
            }
        });
    }

    // --------------------------------------------------------------------------------
    // Function: handleMailFormSubmit()
    // Desc: Handles the submission of the contact form using EmailJS.
    // --------------------------------------------------------------------------------
    function handleMailFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        $("#sending-button-text").text("Sending...");

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            to_name: 'Dylan',
            to_email: emailConfig.recipientEmail,
            from_name: name,
            from_email: email,
            from_phone: phone,
            message: message,
        };

        emailjs.send(
            serviceId,
            templateId,
            templateParams,
            userId
        ).then(
            (response) => {
                Toastify({
                    text: "🎉 Your message has been sent successfully! I'll get back to you soon.",
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    className: "toast-success",
                    stopOnFocus: true,
                    style: {
                        background: "#020828",
                        zIndex: 9999,
                        marginBottom: '50px'
                    },
                    onClick: function () { }
                }).showToast();
                form.reset();
                $("#sending-button-text").text("Send Message");
            },
            (err) => {
                Toastify({
                    text: `⚠️ Oops! Message failed to send. Please try again or email me directly <a href="mailto:mickaelrakotonarivo@gmail.com" style="color: white; text-decoration: underline; font-weight: bold;">here</a>`,
                    duration: 5000,
                    gravity: "bottom",
                    position: "right",
                    className: "toast-error",
                    stopOnFocus: true,
                    escapeMarkup: false,
                    style: {
                        background: "#020828",
                        zIndex: 9999,
                        marginBottom: '50px'
                    },
                    onClick: function () { }
                }).showToast();
                $("#sending-button-text").text("Send Message");
            }
        );
    }

    // --------------------------------------------------------------------------------
    // Function: initMailSender()
    // Desc: Initializes the contact form submission listener.
    // --------------------------------------------------------------------------------
    function initMailSender() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleMailFormSubmit);
        }
    }

    // --------------------------------------------------------------------------------
    // Function: updateActiveMenuSectionOnScroll()
    // Desc: Updates the active state of menu items based on scroll position.
    // --------------------------------------------------------------------------------
    function updateActiveMenuSectionOnScroll() {
        const links = document.querySelectorAll('#navigation li a');
        if (links.length === 0) return;

        const scrollPosition = window.scrollY;
        const sections = ['hero', 'resume', 'services', 'skills', 'projects', 'contact'];

        sections.forEach((sectionId, index) => {
            const sectionTop = document.getElementById(sectionId).offsetTop;
            const sectionBottom = sectionTop + document.getElementById(sectionId).offsetHeight;

            if (scrollPosition >= (sectionTop - 500) && scrollPosition < sectionBottom) {
                links.forEach((link) => link.parentElement.classList.remove('active'));
                if (links[index]) links[index].parentElement.classList.add('active');
            }
        });
    }

    // --------------------------------------------------------------------------------
    // Function: setupCvDownloadListener()
    // Desc: Sets up the click listener for the CV download button.
    // --------------------------------------------------------------------------------
    function setupCvDownloadListener() {
        $("#btn-download-cv").on('click', function () {
            window.open('pdf/CV-Dylan-RAKOTONARIVO.pdf', '_blank');
        });
    }

    // --------------------------------------------------------------------------------
    // Function: initParallaxScroll()
    // Desc: Initializes Rellax for parallax scrolling effects.
    // --------------------------------------------------------------------------------
    function initParallaxScroll() {
        if (typeof Rellax !== 'undefined' && $('.rellax').length > 0) {
            new Rellax('.rellax');
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initCursorTrail()
    // Desc: Creates a trailing cursor effect on mouse move.
    // --------------------------------------------------------------------------------
    function initCursorTrail() {
        let trail = [];
        const trailLength = 20;

        document.addEventListener('mousemove', (e) => {
            const cursor = document.createElement('div');
            cursor.classList.add('cursor');
            document.body.appendChild(cursor);

            cursor.style.left = `${e.pageX + 20}px`;
            cursor.style.top = `${e.pageY + 20}px`;

            trail.push(cursor);

            if (trail.length > trailLength) {
                const oldCursor = trail.shift();
                if (oldCursor) oldCursor.remove();
            }
        });
    }

    // --------------------------------------------------------------------------------
    // Function: updateSocialMediaVisibility()
    // Desc: Toggles visibility of social media links based on mobile menu display.
    // --------------------------------------------------------------------------------
    function updateSocialVisibility() {
        if ($(".slicknav_menu").css("display") === "none") {
            $("#footer__nav__social").addClass("d-none");
        } else {
            $("#footer__nav__social").removeClass("d-none");
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initTheatreJs()
    // Desc: Initializes Theatre.js for animations.
    // --------------------------------------------------------------------------------
    function initTheatreJs() {
        if (window.Theatre && Theatre.core && Theatre.studio) {
            var { core, studio } = Theatre;

            // Restore to set new animations
            studio.initialize();
            studio.ui.hide();
            // studio.ui.restore();

            // Ensure 'state' is defined or loaded appropriately.
            // Using an empty object as a fallback if 'state' is not globally defined.
            const projectState = typeof state !== 'undefined' ? state : {};
            const project = core.getProject("Portolio", { state: projectState });
            const scene1 = project.sheet("Contact Card Twinkle");

            const theatreCard = scene1.object("Contact Card", {
                size: {
                    w: 0,
                    h: 0,
                }, 
                position: {
                    x: 0,
                    y: 0
                },
                opacity: 100
            });

            theatreCard.onValuesChange((newValues) => {
                // Uncomment to animate the card using size or position
                // $(".card").css( "width" ,`${newValues.size.w}`);
                // $(".card").css("height", `${newValues.size.h}`);
                // $(".card").css("transform", `translate(${newValues.position.x}px, ${newValues.position.y}px)`);
                $(".card").css("opacity", `${newValues.opacity}%`);
            });

            $(".contact-button").on("click", () => {
                scene1.sequence.play({range: [0, 3]});
            });
        } else {
            console.error("Theatre.js is not loaded.");
        }
    }

    // --------------------------------------------------------------------------------
    // Function: initVantaBackground()
    // Desc: Initializes Vanta.js for the hero section background.
    // --------------------------------------------------------------------------------
    function initVantaBackground() {
        if (typeof VANTA !== 'undefined' && typeof VANTA.GLOBE === 'function' && $('#hero').length > 0) {
            VANTA.GLOBE({
                el: "#hero",
                backgroundColor: "#000116",
                color: "#020860",
                color2: "#000116",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            })
        }
    }
})(jQuery);