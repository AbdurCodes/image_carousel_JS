const slideshow_image = document.getElementById('slideshow_image');
const left_arrow = document.getElementById('left_arrow');
const right_arrow = document.getElementById('right_arrow');

const images = [
    'assets/nature (1).jpg',
    'assets/nature (2).jpg',
    'assets/nature (3).jpg',
    'assets/nature (4).jpg',
    'assets/nature (5).jpg',
]

let currentIndex = 0;
let lowestIndex = 0;
let highestIndex = images.length - 1;


left_arrow.addEventListener('click', () => {
    if (currentIndex == 0) {
        slideshow_image.src = images[currentIndex];
        console.log(`left-arrow currentIndex: ${currentIndex}`);
        alert("This is the end of the slideshow.");
    }
    else if (currentIndex > 0) {
        currentIndex--;
        slideshow_image.src = images[currentIndex];
        console.log(`left-arrow currentIndex: ${currentIndex}`);
    }
})

right_arrow.addEventListener('click', () => {
    if (currentIndex == lowestIndex) {
        currentIndex++;
        slideshow_image.src = images[currentIndex];
        console.log(`right-arrow currentIndex: ${currentIndex}`);
    }
    else if (currentIndex < highestIndex) {
        currentIndex++;
        slideshow_image.src = images[currentIndex];
        console.log(`right-arrow currentIndex: ${currentIndex}`);
    }
    else if (currentIndex == highestIndex) {
        slideshow_image.src = images[currentIndex];
        console.log(`right-arrow currentIndex: ${currentIndex}`);
        alert("This is the end of the slideshow.");
    }
})