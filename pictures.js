// Sample data for demonstration
const picturesData = [
    { src: "./resources/images/St.PatrickPizza.jpeg", likes: 15 },
    { src: "./resources/images/BaguetteOven.jpeg", likes: 10 },
    { src: "./resources/images/RollingPinDonuts.jpeg", likes: 20 },
    // Add more picture data as needed
];

// Function to display top 3 pictures of the week
function displayTopPictures() {
    const sortedPictures = picturesData.sort((a, b) => b.likes - a.likes).slice(0, 3);
    const topPicturesContainer = document.querySelector('.top-pictures');
    topPicturesContainer.innerHTML = '';
    sortedPictures.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Top Picture';
        topPicturesContainer.appendChild(imgElement);
    });
}

// Function to display liked pictures in order
function displayLikedPictures() {
    const likedPicturesContainer = document.querySelector('.liked-pictures');
    likedPicturesContainer.innerHTML = '';
    picturesData.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Liked Picture';
        likedPicturesContainer.appendChild(imgElement);
    });
}

// Function to display all uploaded pictures in an album
function displayUploadedAlbum() {
    const uploadedAlbumContainer = document.querySelector('.uploaded-album');
    uploadedAlbumContainer.innerHTML = '';
    picturesData.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Uploaded Picture';
        uploadedAlbumContainer.appendChild(imgElement);
    });
}

// Call functions to initially display content
displayTopPictures();
displayLikedPictures();
displayUploadedAlbum();

function toggleExpand(img) {
    img.classList.toggle('expanded');
}

// Function to handle the upload and display the new picture
function uploadPicture() {
    const uploadInput = document.getElementById('uploadInput');
    const uploadedAlbumContainer = document.querySelector('.uploaded-album');
    if (uploadInput.files && uploadInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = 'Uploaded Picture';
            imgElement.onclick = () => toggleExpand(imgElement);
            uploadedAlbumContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(uploadInput.files[0]);
    }
}

