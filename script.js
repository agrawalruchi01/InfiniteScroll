// Unsplash API
const count = 30;
const apiKey = 'mHs09c-Kfz4yXUq9CMkgoHX_BdBJjOIPwErHwesWX00';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalImages = 0;

// Check if all images were loaded
function imageLoad() {
    imagesloaded++;
    if(imagesloaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

let photoArray = [];

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
    imagesloaded=0;
    totalImages = photoArray.length;
    photoArray.forEach((photos) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photos.links.html,
            target: '_blank'
        })

        const image = document.createElement('img');

        setAttributes(image, {
            src: photos.urls.regular,
            alt: photos.alt_description,
            title: photos.alt_description
        })
        // Event listener, check when each is finished loadinf
        image.addEventListener('load', imageLoad)
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}


//check to see if scrolling near bottom
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >=  document.body.offsetHeight - 1000 && ready) {
         ready = false;
         getPhotos(); 
    }
})

// On Load
getPhotos();