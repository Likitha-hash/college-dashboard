import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Still needed for POSTing new reviews

// --- Direct Import Strategy ---
// Import both colleges (for the dropdown) and initial reviews data directly.
// This makes the page load instantly and reliably, avoiding all server config issues.
import allCollegesData from '../../../data/colleges.json';
import initialReviewsData from '../../../data/reviews.json';

import './ReviewsPage.css';

// Reusable StarRating component for input (no changes)
const StarRatingInput = ({ rating, setRating }) => {
    return (
        <div className="star-rating-input">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            style={{ display: 'none' }}
                        />
                        <span className="star" style={{ color: ratingValue <= rating ? '#ffc107' : '#e4e5e9' }}>
                            ★
                        </span>
                    </label>
                );
            })}
        </div>
    );
};


const ReviewsPage = () => {
    // Initialize state directly from the imported JSON files.
    const [reviews, setReviews] = useState(initialReviewsData);
    const [colleges] = useState(allCollegesData);
    const [isLoading, setIsLoading] = useState(false); // No initial loading needed

    // Form state
    const [selectedCollege, setSelectedCollege] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitStatus, setSubmitStatus] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCollege || rating === 0 || !comment) {
            alert("Please fill out all fields.");
            return;
        }

        const selectedCollegeData = colleges.find(c => c.id === parseInt(selectedCollege));
        if (!selectedCollegeData) {
            alert("Selected college not found!");
            return;
        }

        const newReview = {
            id: Date.now(), 
            collegeId: selectedCollegeData.id,
            collegeName: selectedCollegeData.name,
            rating,
            comment,
            author: "Guest User", 
            date: new Date().toISOString().split('T')[0] 
        };

        
        setReviews([newReview, ...reviews]);

        
        setSelectedCollege('');
        setRating(0);
        setComment('');
        setSubmitStatus('success');

        
        setTimeout(() => setSubmitStatus(null), 3000);
    };


    return (
        <div className="reviews-page-container">
            <div className="review-form-section">
                <h2>Submit a Review</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <select value={selectedCollege} onChange={(e) => setSelectedCollege(e.target.value)} required>
                        <option value="" disabled>Select a College</option>
                        {colleges.map(college => (
                            <option key={college.id} value={college.id}>{college.name}</option>
                        ))}
                    </select>
                    <div className="rating-group">
                        <label>Your Rating:</label>
                        <StarRatingInput rating={rating} setRating={setRating} />
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows="5"
                        required
                    />
                    <button type="submit">Submit Review</button>
                    {submitStatus === 'success' && <p className="status-message success">Review submitted successfully!</p>}
                    {submitStatus === 'error' && <p className="status-message error">Failed to submit review. Please try again.</p>}
                </form>
            </div>

            <div className="latest-reviews-section">
                <h2>Latest Reviews</h2>
                {isLoading ? <p>Loading reviews...</p> : (
                    <div className="reviews-list">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <h3>{review.collegeName}</h3>
                                <p className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                                <p className="review-comment">"{review.comment}"</p>
                                <p className="review-author">- {review.author} on {review.date}</p>
                            </div>
                        )) : <p>No reviews yet. Be the first to submit one!</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;