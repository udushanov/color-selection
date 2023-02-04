function randomColor() {
    const hexaDecimal = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexaDecimal[Math.floor(Math.random() * hexaDecimal.length)];
    }

    return color;
}

function getContrastYIQ(hexcolor) {
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);
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

function setColor(wrapper) {
    wrapper.forEach(item => {
        const generator = randomColor();
        const brightness = getContrastYIQ(generator);
        const text = item.querySelector('p');
        const icon = item.querySelector('i');

        if (item.dataset.status === 'locked') {
            return
        }

        text.style.color = brightness;
        icon.style.color = brightness;
        text.textContent = generator;
        item.style.backgroundColor = generator;
    });
}

render();

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelectorAll('.wrapper');
    setColor(wrapper);

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            setColor(wrapper);
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
        // console.log(event.target.textContent);
        navigator.clipboard.writeText(event.target.textContent);
    }
})






