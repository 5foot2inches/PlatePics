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
});

function showUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'block';
}

function closeUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'none';
}

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle the upload form submission
});


// Add an event listener to the search input
document.querySelector('.search-upload input').addEventListener('input', function() {
    var searchText = this.value.toLowerCase(); // Get the search text and convert to lowercase
    var galleryItems = document.querySelectorAll('.gallery-item');

    // Loop through each gallery item
    galleryItems.forEach(function(item) {
        var tags = item.querySelectorAll('.diet, .location, .meal'); // Select all relevant spans

        // Check if any tag matches the search text
        var match = Array.from(tags).some(function(tag) {
            return tag.textContent.toLowerCase().includes(searchText);
        });

        // Show or hide the item based on whether it matches the search
        if (match) {
            item.style.display = 'block'; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
});


// Example code for handling like button click
document.querySelectorAll('.like-btn').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        // Send AJAX request to like the item
        // Example: Fetch API or XMLHttpRequest
    });
});



document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Toggle the 'expanded' class on the clicked gallery item
        item.classList.toggle('expanded');
    });
});
