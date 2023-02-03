for (let i = 0; i < 5; i++) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const text = document.createElement('p');
    text.classList.add('text');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-lock-open');

    wrapper.append(text);
    wrapper.append(icon);

    document.body.append(wrapper);
}

function randomColor() {
    const hexaDecimal = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexaDecimal[Math.floor(Math.random() * hexaDecimal.length)];
    }

    return color;
}

function setColor(wrapper) {
    wrapper.forEach(item => {
        const generator = randomColor();
        const text = item.querySelector('p');
        text.textContent = generator;
        item.style.backgroundColor = generator;

    });
}

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.wrapper');
    setColor(wrapper);
});

