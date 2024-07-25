document.addEventListener('DOMContentLoaded', function () {
    // Select all gallery-item divs
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        // Initial counts and state
        let upvotes = 0;
        let downvotes = 0;
        let voted = null; // Track which button was voted on (null, 'up', 'down')

        // Select the like and dislike buttons for this gallery item
        const upvoteButton = item.querySelector('.like-btn');
        const downvoteButton = item.querySelector('.dislike-btn');
        
        // Select the span elements for displaying counts
        const upvoteCount = upvoteButton.querySelector('.like-count');
        const downvoteCount = downvoteButton.querySelector('.dislike-count');

        // Update the counts display
        function updateCounts() {
            upvoteCount.textContent = upvotes;
            downvoteCount.textContent = downvotes;
        }

        // Event listener for upvote button
        upvoteButton.addEventListener('click', function () {
            if (voted === 'up') {
                // Undo the upvote
                upvotes -= 1;
                voted = null;
            } else if (voted === 'down') {
                // Change from downvote to upvote
                downvotes -= 1;
                upvotes += 1;
                voted = 'up';
            } else {
                // New upvote
                upvotes += 1;
                voted = 'up';
            }
            updateCounts();
            disableButtons();
            console.log('Upvoted:', upvotes, 'Downvoted:', downvotes);
        });

        // Event listener for downvote button
        downvoteButton.addEventListener('click', function () {
            if (voted === 'down') {
                // Undo the downvote
                downvotes -= 1;
                voted = null;
            } else if (voted === 'up') {
                // Change from upvote to downvote
                upvotes -= 1;
                downvotes += 1;
                voted = 'down';
            } else {
                // New downvote
                downvotes += 1;
                voted = 'down';
            }
            updateCounts();
            disableButtons();
            console.log('Upvoted:', upvotes, 'Downvoted:', downvotes);
        });

        // Disable buttons when any vote is cast
        function disableButtons() {
            upvoteButton.disabled = voted !== null;
            downvoteButton.disabled = voted !== null;
        }

        // Initialize the counts
        updateCounts();
    });
});



  