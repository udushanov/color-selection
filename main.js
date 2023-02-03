const wrapper = document.querySelectorAll('.wrapper');

function randomColor() {
    const hexaDecimal = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexaDecimal[Math.floor(Math.random() * hexaDecimal.length)];
    }

    return color;
}

function setColor() {
    wrapper.forEach(item => item.style.backgroundColor = randomColor());
}

setColor();