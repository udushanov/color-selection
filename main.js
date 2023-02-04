function randomColor() {
    const hexaDecimal = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexaDecimal[Math.floor(Math.random() * hexaDecimal.length)];
    }

    return color;
}

function getContrastYIQ(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function render() {
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
}

function setColor(wrapper, isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];

    wrapper.forEach((item, i) => {
        const generator = isInitial ?
            colors[i]
                ? colors[i]
                : randomColor()
            : randomColor();
        const brightness = getContrastYIQ(generator);
        const text = item.querySelector('p');
        const icon = item.querySelector('i');

        if (item.dataset.status === 'locked') {
            colors.push(text.textContent);
            return
        }

        if (!isInitial) {
            colors.push(generator);
        }

        text.style.color = brightness;
        icon.style.color = brightness;
        text.textContent = generator;
        item.style.backgroundColor = generator;
    });

    createColorHash(colors);
}

function createColorHash(colors = []) {
    document.location.hash = colors.map(color => color.substring(1)).join('-');
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color);
    }
    return [];
}

render();

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.wrapper');
    setColor(wrapper, true);

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            setColor(wrapper, false);
        }
    });
});

document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.value === 'fa-solid fa-lock-open') {
        target.classList.remove('fa-solid', 'fa-lock-open');
        target.classList.add('fa-solid', 'fa-lock');
        target.parentElement.dataset.status = 'locked';
    } else if (target.classList.value === 'fa-solid fa-lock'){
        target.classList.remove('fa-solid', 'fa-lock');
        target.classList.add('fa-solid', 'fa-lock-open');
        target.parentElement.dataset.status = '';
    } else if (target.classList.value === 'text') {
        navigator.clipboard.writeText(event.target.textContent);
    }
});






