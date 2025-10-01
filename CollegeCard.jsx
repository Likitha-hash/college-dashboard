import React from 'react';
import './CollegeCard.css';

const CollegeCard = ({ college, onAddToFavorites, isFavorite }) => {
    const formatFee = (fee) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(fee);
    };

    return (
        <div className="college-card">
            <div className="card-header">
                <h3 className="college-name">{college.name}</h3>
                <p className="college-location">{college.location}</p>
            </div>
            <div className="card-body">
                <p className="card-info"><strong>Course:</strong> {college.course}</p>
                <p className="card-info"><strong>Annual Fee:</strong> <span className="fee">{formatFee(college.fee)}</span></p>
                <p className="card-info"><strong>Rating:</strong> <span className="rating">{'★'.repeat(Math.round(college.rating))}{'☆'.repeat(5 - Math.round(college.rating))}</span></p>
            </div>
            <div className="card-footer">
                <button
                    className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                    onClick={() => onAddToFavorites(college)}
                    // Disable the button if the college is already a favorite
                    disabled={isFavorite}
                >
                    {isFavorite ? '✅ Added to Favorites' : '⭐ Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default CollegeCard;