const slideshow_image = document.getElementById('slideshow_image');
const left_arrow = document.getElementById('left_arrow');
const right_arrow = document.getElementById('right_arrow');
const navigation_circles = document.querySelector('.navigation_circles');

const images = [
    'assets/nature (1).jpg',
    'assets/nature (2).jpg',
    'assets/nature (3).jpg',
    'assets/nature (4).jpg',
    'assets/nature (5).jpg',
]

let intervalId;
let currentIndex = 0;
let lowestIndex = 0;
let highestIndex = images.length - 1;
let leftArrowClicked = false;
let rightArrowClicked = false;
let circle_clicked = false;


function decideCircle() {
    navigation_circles.innerHTML = "";

    for (let i = 0; i < images.length; i++) {
        const circle_empty = document.createElement('img');
        circle_empty.src = 'assets/circle_empty.png';
        const circle_filled = document.createElement('img');
        circle_filled.src = 'assets/circle_filled.png';

        if (i != currentIndex) {

            navigation_circles.appendChild(circle_empty);
            circle_empty.addEventListener('click', () => {
                circle_clicked = true;
                slideshow_image.src = images[i];
                currentIndex = i;
                decideCircle();
            })
        }

        else {
            navigation_circles.appendChild(circle_filled);
        }
    }
}


left_arrow.addEventListener('click', () => {
    leftArrowClicked = true;
    // console.log(`left-arrow clicked`);

    if (rightArrowClicked) {
        if (currentIndex === lowestIndex) {
            currentIndex = highestIndex - 1;
        }
        else if (currentIndex === 1) {
            currentIndex = highestIndex;
        }
        else if (currentIndex >= 2) {
            currentIndex -= 2;
        }
        rightArrowClicked = false;
    }

    if (intervalId) {
        if (currentIndex === 1) {
            currentIndex = highestIndex;
        }
        else if (currentIndex >= 2) {
            currentIndex -= 2;
        }
        clearInterval(intervalId);
        intervalId = false;
    }
    else {
        if (circle_clicked) {
            if (currentIndex > lowestIndex) {
                currentIndex--;
            }
            else if (currentIndex === lowestIndex){
                currentIndex = highestIndex;
            }
            circle_clicked = false;
        }
    }

    decideCircle();
    
    if (currentIndex == lowestIndex) {
        slideshow_image.src = images[currentIndex];
        currentIndex = highestIndex;
    }
    else if (currentIndex > lowestIndex) {
        slideshow_image.src = images[currentIndex];
        currentIndex--;
    }
})

right_arrow.addEventListener('click', () => {
    rightArrowClicked = true;

    if (leftArrowClicked) {
        if (currentIndex <= highestIndex - 2) {
            currentIndex += 2;
        }
        else if (currentIndex === 3) {
            currentIndex = lowestIndex;
        }
        else if (currentIndex === highestIndex) {
            currentIndex = lowestIndex + 1;
        }
        leftArrowClicked = false;
    }

    if (intervalId) {
        if (currentIndex > highestIndex) {
            currentIndex = 0;
        }
        clearInterval(intervalId);
        intervalId = false;
    }
    else {
        if (circle_clicked) {
            if (currentIndex < highestIndex) {
                currentIndex++;
            }
            else if (currentIndex === highestIndex){
                currentIndex = lowestIndex;
            }
            circle_clicked = false;
        }
    }
    
    decideCircle();
    if (currentIndex == lowestIndex) {
        slideshow_image.src = images[currentIndex];
        currentIndex++;
    }
    else if (currentIndex < highestIndex) {
        slideshow_image.src = images[currentIndex];
        currentIndex++;
    }
    else if (currentIndex == highestIndex) {
        slideshow_image.src = images[currentIndex];
        currentIndex = lowestIndex;
    }
})


// pic changes in slideshow every 2 secs
intervalId = setInterval(() => {
    if (currentIndex > highestIndex) {
        // Reset to the first image when the end of the array is reached
        currentIndex = 0;
    }
    slideshow_image.src = images[currentIndex];
    decideCircle();
    currentIndex++;
}, 1000);