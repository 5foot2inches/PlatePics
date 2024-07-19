document.addEventListener('DOMContentLoaded', () => {
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

    document.querySelector('.search-upload input').addEventListener('input', function() {
        var searchText = this.value.toLowerCase();
        var galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(function(item) {
            var tags = item.querySelectorAll('.diet, .location, .meal');
            var match = Array.from(tags).some(function(tag) {
                return tag.textContent.toLowerCase().includes(searchText);
            });
            if (match) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.like-btn').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            // Send AJAX request to like the item
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

