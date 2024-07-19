function calculateMatch() {
    const form = document.getElementById('preference-form');
    const formData = new FormData(form);

    // Dummy data for other users
    const users = [
        {
            name: "Alice",
            age: 25,
            bio: "Loves vegan food and Italian cuisine.",
            dietary: ["Vegan"],
            location: "Near me",
            cuisine: ["Italian"],
            personality: ["Social", "Outgoing"]
        },
        {
            name: "Bob",
            age: 30,
            bio: "Enjoys Mediterranean and comfort food.",
            dietary: ["No Preferences"],
            location: "Within 50 Miles",
            cuisine: ["Mediterranean", "Comfort Food"],
            personality: ["Shy", "Quiet"]
        },
        // Add more users as needed
    ];

    const userPreferences = {
        dietary: formData.getAll('dietary'),
        location: formData.getAll('location'),
        cuisine: formData.getAll('cuisine'),
        personality: formData.getAll('personality')
    };

    const matchResults = users.map(user => {
        const dietaryMatch = userPreferences.dietary.some(preference => user.dietary.includes(preference)) ? 1 : 0;
        const locationMatch = userPreferences.location.includes(user.location) ? 1 : 0;
        const cuisineMatchCount = userPreferences.cuisine.filter(preference => user.cuisine.includes(preference)).length;
        const personalityMatchCount = userPreferences.personality.filter(preference => user.personality.includes(preference)).length;

        const totalPreferences = userPreferences.cuisine.length + userPreferences.personality.length;
        const matchPercentage = ((cuisineMatchCount + personalityMatchCount) / totalPreferences) * 100;

        return {
            ...user,
            matchPercentage: matchPercentage.toFixed(2),
            dietaryMatch,
            locationMatch
        };
    });

    const matchContainer = document.getElementById('match-results');
    matchContainer.innerHTML = '';

    matchResults.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match';
        matchElement.innerHTML = `
            <div class="match-info">
                <h3>${match.dietaryMatch === 1 && match.locationMatch === 1 ? "100%" : match.matchPercentage + "%" } Match</h3>
                <p>Name: ${match.name}</p>
                <p>Age: ${match.age}</p>
                <p>Bio: ${match.bio}</p>
                <p>Dietary Preference: ${match.dietary.join(", ")}</p>
                <p>Cuisine: ${match.cuisine.join(", ")}</p>
            </div>
            <div class="match-actions">
                <button class="view-profile">👤</button>
                <button class="invite">🍴</button>
                <button class="dismiss">✖</button>
            </div>
        `;
        matchContainer.appendChild(matchElement);
    });
}

