
document.addEventListener('DOMContentLoaded', function() {
    var galleryItems = document.querySelectorAll('.gallery-item, .location-gallery, .top-pictures, .plate-date');
    var originalDisplay = [];

    // Store the original display state of each gallery item
    galleryItems.forEach(function(item) {
        originalDisplay.push(item.style.display);
    });

    document.querySelector('.search-upload input').addEventListener('input', function() {
        var searchText = this.value.toLowerCase();
        
        // Loop through each gallery item
        galleryItems.forEach(function(item, index) {
            var tags = item.querySelectorAll('.diet, .location, .meal, .preference , .dietary');
            
            // Check if any tag matches the search text
            var match = Array.from(tags).some(function(tag) {
                return tag.textContent.toLowerCase().includes(searchText);
            });

            // Show or hide the item based on whether it matches the search
            if (match) {
                item.style.display = originalDisplay[index] || 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
