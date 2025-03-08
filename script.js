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
// let leftArrowClickedAtHighestIndex = false;
// let rightArrowClickedAtLowestIndex = false;

left_arrow.addEventListener('click', () => {
    leftArrowClicked = true;
    // console.log(Boolean(intervalId));
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
        if (currentIndex >= 2) {
            currentIndex -= 2;
        }
        // leftArrowClicked = false;
        clearInterval(intervalId);
        intervalId = false;
    }
    decideCircle();
    console.log(`left-arrow clicked`);
    console.log(currentIndex);
    if (currentIndex == lowestIndex) {
        console.log(currentIndex);
        slideshow_image.src = images[currentIndex];
        currentIndex = highestIndex;
        console.log(currentIndex);

        // console.log(`left-arrow currentIndex: ${currentIndex}`);
        // alert("This is the end of the slideshow.");
    }
    else if (currentIndex > lowestIndex) {
        console.log(currentIndex);
        slideshow_image.src = images[currentIndex];
        currentIndex--;
        // console.log(`left-arrow currentIndex: ${currentIndex}`);
    }
})

right_arrow.addEventListener('click', () => {
    rightArrowClicked = true;

    if (leftArrowClicked) {
        if (currentIndex <= highestIndex - 2) {
            currentIndex += 2;
        }
        else if (currentIndex === highestIndex) {
            currentIndex = lowestIndex + 1;
        }
        leftArrowClicked = false;
    }
    // console.log(Boolean(intervalId));
    if (intervalId) {
        // if (currentIndex >= 2) {
        //     currentIndex += 2;
        // }
        clearInterval(intervalId);
        intervalId = false;
    }
    decideCircle();
    console.log(`right-arrow clicked`);
    console.log(currentIndex);
    if (currentIndex == lowestIndex) {
        console.log(currentIndex);
        slideshow_image.src = images[currentIndex];
        currentIndex++;
        console.log(currentIndex);
        // console.log(`right-arrow currentIndex: ${currentIndex}`);
    }
    else if (currentIndex < highestIndex) {
        console.log(currentIndex);
        slideshow_image.src = images[currentIndex];
        currentIndex++;
        console.log(currentIndex);
        // console.log(`right-arrow currentIndex: ${currentIndex}`);
    }
    else if (currentIndex == highestIndex) {

        slideshow_image.src = images[currentIndex];
        console.log(currentIndex);
        // console.log(`right-arrow currentIndex: ${currentIndex}`);
        // alert("This is the end of the slideshow.");
        currentIndex = lowestIndex;
        console.log(currentIndex);
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
}, 2000);



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
                slideshow_image.src = images[i];
                navigation_circles.innerHTML = "";
                for (let j = 0; j < images.length; j++) {
                    const circle_empty = document.createElement('img');
                    circle_empty.src = 'assets/circle_empty.png';
                    const circle_filled = document.createElement('img');
                    circle_filled.src = 'assets/circle_filled.png';
                    if (j == i) {
                        navigation_circles.appendChild(circle_filled);
                        currentIndex = j;
                    }
                    else {
                        navigation_circles.appendChild(circle_empty);
                    }
                }
                // clearInterval(intervalId);

            })
        }

        else {
            navigation_circles.appendChild(circle_filled);
            circle_filled.addEventListener('click', () => {
                slideshow_image.src = images[i];
                navigation_circles.innerHTML = "";
                for (let j = 0; j < images.length; j++) {
                    const circle_empty = document.createElement('img');
                    circle_empty.src = 'assets/circle_empty.png';
                    const circle_filled = document.createElement('img');
                    circle_filled.src = 'assets/circle_filled.png';
                    if (j == i) {
                        navigation_circles.appendChild(circle_filled);
                        currentIndex = j;
                    }
                    else {
                        navigation_circles.appendChild(circle_empty);
                    }
                }
                // clearInterval(intervalId);
            })
        }
    }
}

decideCircle();