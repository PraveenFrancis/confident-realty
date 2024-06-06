document.addEventListener('DOMContentLoaded', (event) => {
    const db = firebase.database().ref('reviews');

    // Function to fetch and display reviews
    function fetchReviews() {
        db.on('value', (snapshot) => {
            const reviews = snapshot.val();
            const reviewList = document.getElementById('reviewList');
            reviewList.innerHTML = ''; // Clear existing reviews

            for (let id in reviews) {
                const review = reviews[id];
                const reviewItem = document.createElement('li');
                reviewItem.innerHTML = `<strong>${review.name}</strong> <br>${review.review}`;
                reviewList.appendChild(reviewItem);
            }
        });
    }

    // Handle form submission
    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;
        // const rating = document.getElementById('rating').value;

        // Create a review object
        const newReview = { name, review };

        // Save the review to Firebase
        db.push(newReview);

        // Clear the form
        document.getElementById('reviewForm').reset();
    });

    // Load existing reviews when the page loads
    fetchReviews();
});
