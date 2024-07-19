const picturesData = [
    { src: "./resources/images/St.PatrickPizza.jpeg", likes: 15 },
    { src: "./resources/images/BaguetteOven.jpeg", likes: 10 },
    { src: "./resources/images/RollingPinDonuts.jpeg", likes: 20 },
    // Add more picture data as needed
];

function displayTopPictures() {
    const sortedPictures = picturesData.sort((a, b) => b.likes - a.likes).slice(0, 3);
    const topPicturesContainer = document.querySelector('.top-pictures .pictures-grid');
    topPicturesContainer.innerHTML = '';
    sortedPictures.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Top Picture';
        imgElement.onclick = () => toggleExpand(imgElement);
        topPicturesContainer.appendChild(imgElement);
    });
}

function displayLikedPictures() {
    const likedPicturesContainer = document.querySelector('.liked-pictures .pictures-grid');
    likedPicturesContainer.innerHTML = '';
    picturesData.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Liked Picture';
        imgElement.onclick = () => toggleExpand(imgElement);
        likedPicturesContainer.appendChild(imgElement);
    });
}

function displayUploadedAlbum() {
    const uploadedAlbumContainer = document.querySelector('.uploaded-album .pictures-grid');
    uploadedAlbumContainer.innerHTML = '';
    picturesData.forEach(picture => {
        const imgElement = document.createElement('img');
        imgElement.src = picture.src;
        imgElement.alt = 'Uploaded Picture';
        imgElement.onclick = () => toggleExpand(imgElement);
        uploadedAlbumContainer.appendChild(imgElement);
    });
}

function toggleExpand(img) {
    img.classList.toggle('expanded');
}

function uploadPicture() {
    const uploadInput = document.getElementById('uploadInput');
    const uploadedAlbumContainer = document.querySelector('.uploaded-album .pictures-grid');
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

displayTopPictures();
displayLikedPictures();
displayUploadedAlbum();


