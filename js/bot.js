let scene, camera, ambientLight, directionalLight, renderer;
let bot;

// THREE JS INITIALIZATION
function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    console.log("Three.js setup complete!");
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// BOT INITIALIZATION
function initBot() {
    bot = new THREE.Group();
    console.log("Hello from the bot!");
}

function initBotHead() {
    const headGeometry = new THREE.RoundedBoxGeometry(0.8, 0.8, 1, 16, 0.1);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
        metalness: 0.3
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.scale.set(1.4, 1.0, 0.8);
    head.position.y = 1.8;
    bot.add(head);
}

function initBotBody() {
    const bodyGeometry = new THREE.CylinderGeometry(0.60, 0.20, 1, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    bot.add(body);
}

function initBotHands() {
    const handGeometry = new THREE.CylinderGeometry(0.16, 0.15, 0.6, 16);
    const handMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.8, 0.5, 0);
    bot.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.8, 0.5, 0);
    bot.add(rightHand);
}

function assembleBot() {
    initBot();
    initBotHead();
    initBotBody();
    initBotHands();
    scene.add(bot);
    console.log("Bot assembled and added to scene!");
}

// ANIMATION AND RENDER LOOP
function renderLoop() {
    if (bot) {
        bot.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
}

initializeScene();
assembleBot();
renderLoop();