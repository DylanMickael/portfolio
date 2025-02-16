/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Portfolio filter
        --------------------*/
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Scroll
    --------------------*/
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
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

    /*------------------
        Testimonial Slider
    --------------------*/
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

    // Background Image Handling
    $(".set-bg").each(function () {
        var bg = $(this).attr("data-setbg");
        $(this).css("background-image", "url(" + bg + ")");
    });

    /*------------------
        Testimonial Slider
    --------------------*/
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
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
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

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /*------------------
        Image Swiper
    --------------------*/
    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        initialSlide: 1,
        cardsEffect: {
            perSlideOffset: 10,
            perSlideRotate: 2,
        },
    });

    /*------------------
        AOS
    --------------------*/
    function aosInit() {
        AOS.init({
            offsetTop: 1,
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }
    window.addEventListener('load', aosInit);

    /*------------------
        Typed
    --------------------*/
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
        let typed_strings = selectTyped.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /*------------------
        Balls
    --------------------*/
    const balls = document.querySelectorAll(".ball");

    const positions = [
        { x: -20, y: -30, size: 400 },
        { x: 92, y: 80, size: 500 },
        { x: 70, y: -15, size: 220 },
        { x: -10, y: -40, size: 250 },
        { x: 92, y: -40, size: 300 },
        { x: -15, y: -40, size: 300 },
        { x: 90, y: -20, size: 300 },
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

    /*------------------
        Mail Sender
    --------------------*/
    const userId = 'eqWIHcTZUiGnh6cH5';
    const templateId = 'template_ue7t2rb';
    const serviceId = 'service_2f6kux5';

    const recipientEmail = 'mickaelrakotonarivo@gmail.com';

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            to_name: 'Dylan',
            to_email: recipientEmail,
            from_name: name,
            from_email: email,
            from_phone: phone,
            message: `${message}`,
        };

        emailjs.send(
            serviceId,
            templateId,
            templateParams,
            userId
        ).then(
            (response) => {
                alert('Your message has been sent!');
                form.reset();
            },
            (err) => {
                alert('Oops... ' + JSON.stringify(error));
            }
        );
    });

    /*------------------
        Menu Scroll
    --------------------*/
    function determinerSectionActive() {
        const links = document.querySelectorAll('#navigation li a');

        const scrollPosition = window.scrollY;

        const sections = ['hero', 'resume', 'services', 'skills', 'projects', 'contact'];

        sections.forEach((sectionId, index) => {
            const sectionTop = document.getElementById(sectionId).offsetTop;
            const sectionBottom = sectionTop + document.getElementById(sectionId).offsetHeight;

            if (scrollPosition >= (sectionTop - 500) && scrollPosition < sectionBottom) {
                links.forEach((link) => link.parentElement.classList.remove('active'));
                links[index].parentElement.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', determinerSectionActive);

    document.addEventListener('DOMContentLoaded', function () {
        determinerSectionActive();
    });

    /*------------------
        CV Download
    --------------------*/
    $("#btn-download-cv").click(function () {
        window.open('pdf/CV-Dylan-RAKOTONARIVO.pdf', '_blank');
    });

    /*------------------
        Parallax Scroll
    --------------------*/
    var rellax = new Rellax('.rellax');

    /*------------------
        Theatre
    --------------------*/
    var { core, studio } = Theatre;

    // Restore to set new animations
    studio.initialize();
    studio.ui.hide();
    // studio.ui.restore();

    // Export states of new animations and replace the down below
    const project = core.getProject("Portolio", {state:state});
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
})(jQuery);