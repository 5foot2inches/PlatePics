document.addEventListener('DOMContentLoaded', () => {
    // Comment section submission
    document.querySelectorAll('.comment-section form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const commentInput = event.target.querySelector('input[type="text"]');
            const commentText = commentInput.value;
            if (commentText) {
                const commentDiv = document.createElement('div');
                commentDiv.textContent = commentText;
                event.target.parentNode.appendChild(commentDiv);
                commentInput.value = '';
            }
        });
    });

    // Like and dislike buttons
    document.querySelectorAll('.like-btn, .dislike-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Future functionality for like/dislike count
        });
    });

    // Show upload form modal
    document.getElementById('uploadButton').addEventListener('click', showUploadForm);

    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Handle the upload form submission
    });

    // Search functionality
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.getElementById('locationInput').value.toLowerCase();
        const mealType = document.getElementById('mealTypeInput').value.toLowerCase();
        const user = document.getElementById('userInput').value.toLowerCase();

        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(function(item) {
            const itemLocation = item.getAttribute('data-location').toLowerCase();
            const itemMealType = item.getAttribute('data-meal-type').toLowerCase();
            const itemUser = item.getAttribute('data-user').toLowerCase();

            const matchesLocation = !location || itemLocation.includes(location);
            const matchesMealType = !mealType || itemMealType.includes(mealType);
            const matchesUser = !user || itemUser.includes(user);

            if (matchesLocation && matchesMealType && matchesUser) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.gallery-item').forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            item.classList.toggle('expanded');
        });
    });
});

function showUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'block';
}

function closeUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'none';
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Event listener for opening the upload form
document.querySelector('.upload-btn').addEventListener('click', showUploadForm);

// Event listener for closing the upload form
document.querySelector('.close').addEventListener('click', closeUploadForm);

// Function to show the upload form
function showUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'block';
}

// Function to close the upload form
function closeUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'none';
}

// Event listener for the upload form submission
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle the upload form submission
});

