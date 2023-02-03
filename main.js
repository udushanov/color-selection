const wrapper = document.querySelectorAll('.wrapper');
// const

function randomColor() {
    const hexaDecimal = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += hexaDecimal[Math.floor(Math.random() * hexaDecimal.length)];
    }

    return color;
}

function setColor() {
    wrapper.forEach(item => {
        const generator = randomColor();
        const text = item.querySelector('p');
        text.textContent = generator;
        item.style.backgroundColor = generator;

    });
}

setColor();