document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const northernLights = document.createElement('div');
    northernLights.className = 'northern-lights';

    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        northernLights.appendChild(span);
    }

    wrapper.appendChild(northernLights);

    document.body.appendChild(wrapper);
});