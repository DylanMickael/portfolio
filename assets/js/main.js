// --------------------------------------------------------------------------------
// Main script for index page functionality
// --------------------------------------------------------------------------------
(function ($) {
    // --------------------------------------------------------------------------------
    // Global variables for scene, camera, renderer, controls, and simulation objects.
    // --------------------------------------------------------------------------------
    let scene, camera, renderer, controls, composer;
    let particleSystem, particlePositions, particleVelocities;
    let particleCount = 5000; // Number of particles for the Big Bang explosion
    let params; // Object to store parameters controlled by the UI
    let clock = new THREE.Clock(); // Clock to keep track of elapsed time
    let stopAnimation = false; 
    let shouldDecreaseExpansion = false; 

    // --------------------------------------------------------------------------------
    // Document Ready and Window Load Event Handlers
    // --------------------------------------------------------------------------------
    $(document).ready(function () {
        handlePreloader();

        animateText(() => {
            try {
                init();
                animate();
            } catch (error) {
                console.error(error);
            }

            $("#singularity").hide();

            setTimeout(() => {
                $("#typed-text").fadeOut(600);
                $(".typed-cursor").fadeOut(600);
            }, 3000);

            setTimeout(() => {
                launchFinalAnimation();
            }, 2500);

            setTimeout(() => {
                launchShootingStar();
                shouldDecreaseExpansion = true;
            }, 5500);
        });

        $('#cta-button').on('click', animateRocket);
    });

    $(window).on('load', function () {
        initAOS();
    });

    // --------------------------------------------------------------------------------
    // Function: handlePreloader()
    // --------------------------------------------------------------------------------
    function handlePreloader() {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    }

    // --------------------------------------------------------------------------------
    // Function: init()
    // --------------------------------------------------------------------------------
    function init() {
        // Create a new scene.
        scene = new THREE.Scene();

        // Create a perspective camera.
        camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        camera.position.set(0, 0, 200);

        // Create the WebGL renderer with antialiasing and set its size.
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true; // Enable shadow maps for added realism.
        renderer.setClearColor(0x000110); // Set background color of the animation
        document.body.appendChild(renderer.domElement);

        // Add OrbitControls so the user can explore the scene.
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth out camera movement.
        controls.dampingFactor = 0.05;

        // Add ambient light to gently light the scene.
        const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
        scene.add(ambientLight);

        // Add a point light at the origin to simulate the intense energy of the Big Bang.
        const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
        pointLight.position.set(0, 0, 0);
        pointLight.castShadow = true;
        scene.add(pointLight);

        // Set up post-processing using EffectComposer and add a bloom pass to simulate volumetric light.
        composer = new THREE.EffectComposer(renderer);
        let renderPass = new THREE.RenderPass(scene, camera);
        composer.addPass(renderPass);
        let bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, // strength
            0.4, // radius
            0.85 // threshold
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 0;
        bloomPass.radius = 0;
        composer.addPass(bloomPass);

        // Create the primary particle system representing the initial Big Bang explosion.
        createParticleSystem();

        // Set up UI controls with dat.GUI.
        setupGUI();

        // Listen for window resize events.
        window.addEventListener("resize", onWindowResize, false);
    }

    // --------------------------------------------------------------------------------
    // Function: initAOS()
    // --------------------------------------------------------------------------------
    function initAOS() {
        AOS.init({
            offsetTop: 1,
            duration: 1200,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }

    // --------------------------------------------------------------------------------
    // Function: createParticleSystem()
    // --------------------------------------------------------------------------------
    function createParticleSystem() {
        // Create a BufferGeometry to store particle positions.
        const geometry = new THREE.BufferGeometry();

        // Allocate arrays for particle positions and velocities.
        particlePositions = new Float32Array(particleCount * 3);
        particleVelocities = new Float32Array(particleCount * 3);

        // Initialize each particle at (0,0,0) with a random outward velocity.
        for (let i = 0; i < particleCount; i++) {
            // All particles start at the singularity (with a tiny offset if desired).
            particlePositions[i * 3] = 0;
            particlePositions[i * 3 + 1] = 0;
            particlePositions[i * 3 + 2] = 0;

            // Randomly determine the particle's direction (spherical coordinates).
            let theta = Math.random() * 2 * Math.PI;
            let phi = Math.acos(Math.random() * 2 - 1);
            let speed = Math.random() * 0.5 + 0.5; // Speed between 0.5 and 1.0.
            particleVelocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
            particleVelocities[i * 3 + 1] =
                speed * Math.sin(phi) * Math.sin(theta);
            particleVelocities[i * 3 + 2] = speed * Math.cos(phi);
        }

        // Attach the positions to the geometry.
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(particlePositions, 3)
        );

        // Create a PointsMaterial using a custom sprite texture for a soft glow.
        const sprite = generateSprite();
        const material = new THREE.PointsMaterial({
            size: 2,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            opacity: 0.8,
            color: 0xffffff,
        });

        // Create the particle system and add it to the scene.
        particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
    }

    // --------------------------------------------------------------------------------
    // Function: generateSprite()
    // --------------------------------------------------------------------------------
    function generateSprite() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext("2d");

        // Create a radial gradient for the glow.
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.4, "rgba(40, 73, 206, 0.8)");
        gradient.addColorStop(1, "#000116");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);

        // Create and return a texture from the canvas.
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    // --------------------------------------------------------------------------------
    // Function: setupGUI()
    // --------------------------------------------------------------------------------
    function setupGUI() {
        // Define default parameters.
        params = {
            expansionSpeed: 100, // Scales how fast the particles expand.
            particleSize: 2, // Particle point size.
            bloomStrength: 2, // Bloom effect strength.
            bloomRadius: 0.5, // Bloom effect radius.
            bloomThreshold: 0, // Bloom effect threshold.
        };

    }

    // --------------------------------------------------------------------------------
    // Function: onWindowResize()
    // --------------------------------------------------------------------------------
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    }

    // --------------------------------------------------------------------------------
    // Function: animate()
    // --------------------------------------------------------------------------------
    function animate() {
        if(!stopAnimation) requestAnimationFrame(animate);

        // Compute the time elapsed since the last frame.
        const delta = clock.getDelta();

        // Réduction progressive de l'expansionSpeed si activée
        if (shouldDecreaseExpansion && params.expansionSpeed > 5) {
            if (params.expansionSpeed > 10) {
                params.expansionSpeed -= 0.4;
            }
        }

        // Update the positions of the explosion particles.
        updateParticles(delta);

        // Update camera controls.
        controls.update();

        // Render the scene using the post-processing composer (which includes bloom).
        composer.render(delta);
    }

    // --------------------------------------------------------------------------------
    // Function: updateParticles()
    // --------------------------------------------------------------------------------
    function updateParticles(delta) {
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            let index = i * 3;
            positions[index] +=
                particleVelocities[index] * params.expansionSpeed * delta;
            positions[index + 1] +=
                particleVelocities[index + 1] * params.expansionSpeed * delta;
            positions[index + 2] +=
                particleVelocities[index + 2] * params.expansionSpeed * delta;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // --------------------------------------------------------------------------------
    // Function: animateText()
    // --------------------------------------------------------------------------------
    function animateText(startAnimation) {
        const frenchStrings = [
            "",
            "Tout semblera petit au début.",
            "Mais ton talent grandira...",
            "COMME UNE SINGULARITÉ."
        ]
        const englishStrings = [
            "",
            "What you do may seem small now.",
            "But your talent will expand...",
            "LIKE A SINGULARITY."
        ]
        const options = {
            strings: window.location.pathname.includes("en") ? englishStrings : frenchStrings,
            typeSpeed: 25,
            backSpeed: 20,
            loop: false,
            showCursor: true,
            backDelay: 2000,
            cursorChar: "|",
            autoInsertCss: true,
            onComplete: function (self) {
                startAnimation();
            }
        };

        const typed = new Typed("#typed-text", options);
    }

    // --------------------------------------------------------------------------------
    // Function: launchFinalAnimation()
    // --------------------------------------------------------------------------------
    function launchFinalAnimation() {
        $("#final-text-container *")
            .not("hr")
            .not("#description-text")
            .css({ display: 'none', opacity: 0 })
            .delay(1000).fadeIn(1000, function () {
                $(this).animate({ opacity: 1 }, 1000);
                $("#final-button").addClass('fade-up');
                $("#final-text").addClass('fade-down');
            });

        $("#final-text-container hr")
            .css({ width: '0%' })
            .delay(1400)
            .fadeIn(500, function () {
                $(this).animate({
                    width: '80%',
                }, 500);
            });
        
        $("#final-text-container #description-text")
            .css({ display: 'none', opacity: 0 })
            .delay(1800)
            .fadeIn(1000, function () {
                $(this).animate({ opacity: 1 }, 500);
            });
    }

    // --------------------------------------------------------------------------------
    // Function: launchShootingStar()
    // --------------------------------------------------------------------------------
    function launchShootingStar() {
        const section = document.querySelector('#shooting-star');

        function getRandomTop(min, max) {
            return Math.floor(Math.random() * max) + min;
        }

        function getRandomDelay() {
            return (Math.random() * 2).toFixed(1);
        }

        function getRandomDuration() {
            return Math.floor(Math.random() * (10 - 6 + 1)) + 6;
        }

        for (let i = 1; i <= 10; i++) {
            const span = document.createElement('span');

            // Randomize values
            // span.style.top = `${getRandomTop(50, 90)}px`;
            // span.style.right = '-10px';
            // span.style.left = 'initial';
            // span.style.animationDelay = `${getRandomDelay()}s`;
            // span.style.animationDuration = `${getRandomDuration()}s`;

            section.appendChild(span);
        }
        $("#shooting-star").fadeIn(1000);
    }

    // --------------------------------------------------------------------------------
    // Function: animateRocket()
    // --------------------------------------------------------------------------------
    function animateRocket() {
        setTimeout(() => {
            const pathname = window.location.pathname.includes("en") ? "/en/portfolio.html" : "/fr/portfolio.html"
            window.location.pathname = pathname;
        }, 4000);

        $(this).addClass('launch');

        let trail = [];
        const trailLength = 20;
        const $image = $(".launch img");

        const $followImage = $('<img>');
        $followImage.css({
            position: 'absolute',
            transform: 'rotate(45deg)',
            height: '30px'
        });
        $followImage.attr('src', '/assets/img/cursors/rocket-launch.png');

        $('body').append($followImage);

        function updateTrail() {
            const trace = document.createElement('div');
            trace.classList.add('trace');
            document.body.appendChild(trace);

            const offset = $image.offset();
            trace.style.left = `${offset.left + 20}px`;
            trace.style.top = `${offset.top + 32}px`;

            trail.push(trace);

            if (trail.length > trailLength) {
                const oldTrace = trail.shift();
                oldTrace.remove();
            }

            $followImage.css({
                left: `${offset.left + 7}px`,
                top: `${offset.top}px`
            });
        }

        function animate() {
            updateTrail();
            requestAnimationFrame(animate);
        }

        stopRobotAnimation();
        animate();
    }

    // --------------------------------------------------------------------------------
    // Function: stopRobotAnimation()
    // --------------------------------------------------------------------------------
    function stopRobotAnimation() {
        const $modelViewer = $('model-viewer');
        const modelViewer = $modelViewer[0];

        if (modelViewer) {
            modelViewer.timeScale = 1;
        }
    }

})(jQuery);