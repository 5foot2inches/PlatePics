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

    // Like and dislike buttons (Future functionality)
    document.querySelectorAll('.like-btn, .dislike-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Placeholder for like/dislike functionality
        });
    });

    // Show upload form modal
    document.querySelector('.upload-btn').addEventListener('click', showUploadForm);

    // Close upload form modal
    document.querySelector('.close').addEventListener('click', closeUploadForm);

    // Upload form submission
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);

    // Search functionality
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.getElementById('locationInput').value.toLowerCase();
        const mealType = document.getElementById('mealTypeInput').value.toLowerCase();
        const user = document.getElementById('userInput').value.toLowerCase();

        document.querySelectorAll('.gallery-item').forEach(item => {
            const itemLocation = item.getAttribute('data-location').toLowerCase();
            const itemMealType = item.getAttribute('data-meal-type').toLowerCase();
            const itemUser = item.getAttribute('data-user').toLowerCase();

            const matchesLocation = !location || itemLocation.includes(location);
            const matchesMealType = !mealType || itemMealType.includes(mealType);
            const matchesUser = !user || itemUser.includes(user);

            item.style.display = matchesLocation && matchesMealType && matchesUser ? 'block' : 'none';
        });
    });

    // Toggle gallery item expansion
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });
    });
});

// Show upload form modal
function showUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'block';
}

// Close upload form modal
function closeUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'none';
}

// Preview selected image before upload
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

// Handle the upload form submission
function handleUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('No files selected.');
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }

    // Display the uploaded images in the gallery
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = event.target.result;
            img.alt = file.name;

            galleryItem.appendChild(img);
            document.getElementById('gallery').appendChild(galleryItem);
        };
        reader.readAsDataURL(file);
    });

    // Optional: Send files to the server
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Additional UI updates can be done here if needed
    })
    .catch(error => {
        console.error('Error:', error);
    });

    closeUploadForm();
}
// script.js

// Open the upload form modal
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('uploadFormModal').style.display = 'block';
});

// Close the upload form modal
function closeUploadForm() {
    document.getElementById('uploadFormModal').style.display = 'none';
}

// Preview the image
function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = 'block';
}

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const gallery = document.getElementById('gallery');
    const newItem = document.createElement('div');
    newItem.classList.add('gallery-item');
  
    // Get form data
    const imageInput = document.getElementById('uploadImage');
    const locationInput = document.getElementById('location');
    const mealInput = document.getElementById('meal');
    const descriptionInput = document.getElementById('description');
  
    // Create image element
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageInput.files[0]);
    img.alt = mealInput.value;
  
    // Create info div
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    infoDiv.innerHTML = `
      <p>Location: <span class="location">${locationInput.value}</span></p>
      <p>Meal: <span class="meal">${mealInput.value}</span></p>
      <p>Diet: <span class="diet">${descriptionInput.value}</span></p>
    `;
  
    // Create actions div with upvote and downvote
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    actionsDiv.innerHTML = `
      <button class="like-btn"><img src="./resources/images/upvotebutton.png" alt="Plate Pics upvote"><span class="like-count">0</span></button>
      <button class="dislike-btn"><img src="./resources/images/downvotebutton.png" alt="Plate Pics downvote"><span class="dislike-count">0</span></button>
    `;
  
    // Add event listeners to upvote and downvote buttons
    const likeBtn = actionsDiv.querySelector('.like-btn');
    const dislikeBtn = actionsDiv.querySelector('.dislike-btn');
  
    let liked = false;
    let disliked = false;
  
    likeBtn.addEventListener('click', () => {
      if (!liked && !disliked) {
        handleVote(likeBtn, 'like');
        liked = true;
      } else if (liked) {
        handleVote(likeBtn, 'unlike');
        liked = false;
      }
    });
  
    dislikeBtn.addEventListener('click', () => {
      if (!disliked && !liked) {
        handleVote(dislikeBtn, 'dislike');
        disliked = true;
      } else if (disliked) {
        handleVote(dislikeBtn, 'undislike');
        disliked = false;
      }
    });
  
    // Create comment section
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    commentSection.innerHTML = `
      <form class="comment-form">
        <input type="text" placeholder="Add a comment...">
        <button type="submit">Post</button>
      </form>
    `;
  
    // Prevent default action for comment submission
    commentSection.querySelector('.comment-form').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent form submission
      // Handle comment submission logic here (e.g., append comment to list)
    });
  
    // Append all elements to the new gallery item
    newItem.appendChild(img);
    newItem.appendChild(infoDiv);
    newItem.appendChild(actionsDiv);
    newItem.appendChild(commentSection);
    gallery.appendChild(newItem);
  
    // Close the modal
    closeUploadForm();
  
    // Reset form
    document.getElementById('uploadForm').reset();
  });
  
  function handleVote(button, type) {
    const countSpan = button.querySelector('span');
    let count = parseInt(countSpan.textContent);
    if (type === 'like') {
      count++;
    } else if (type === 'unlike') {
      count--;
    } else if (type === 'dislike') {
      count--;
    } else if (type === 'undislike') {
      count++;
    }
    countSpan.textContent = count;
  }
  
  // Prevent form submission on page refresh
  document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Handle comment submission here
    });
  });
  