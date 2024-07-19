function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
    });

    map.addListener('idle', () => {
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        fetchPicturesInArea(ne.lat(), ne.lng(), sw.lat(), sw.lng());
    });
}

function fetchPicturesInArea(neLat, neLng, swLat, swLng) {
    // Fetch pictures from your server/database based on the map bounds
    // For now, let's simulate it with dummy data

    const pictures = [
        {
            src: "https://via.placeholder.com/300",
            info: "Picture 1",
        },
        {
            src: "https://via.placeholder.com/300",
            info: "Picture 2",
        },
        {
            src: "https://via.placeholder.com/300",
            info: "Picture 3",
        },
    ];

    const gallery = document.getElementById("location-gallery");
    gallery.innerHTML = ""; // Clear previous pictures

    pictures.forEach(picture => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = picture.src;
        item.appendChild(img);

        const info = document.createElement("div");
        info.className = "info";
        info.innerText = picture.info;
        item.appendChild(info);

        gallery.appendChild(item);
    });
}
