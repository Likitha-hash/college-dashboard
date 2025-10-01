import React, { useState } from 'react';
import CollegeCard from '../../components/CollegeCard/CollegeCard';
import './FavoritesPage.css';

// --- Direct Import Strategy ---
// We need the full list of colleges to find the objects matching the favorite IDs.
import allCollegesData from '../../../data/colleges.json';
// We need the initial list of favorite IDs to populate the state.
import initialFavoriteIds from '../../../data/favorites.json';

const FavoritesPage = () => {
    // This state will hold the array of favorite college IDs.
    const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);

    // Derive the full college objects to display from the list of IDs.
    // This will automatically re-render when `favoriteIds` changes.
    const favoriteColleges = allCollegesData.filter(college => favoriteIds.includes(college.id));

    // This function now only modifies the local state for an instant UI update.
    const handleRemoveFromFavorites = (collegeToRemove) => {
        setFavoriteIds(currentIds => currentIds.filter(id => id !== collegeToRemove.id));
    };

    return (
        <div className="favorites-page-container">
            <h1>Your Favorite Colleges</h1>
            {favoriteColleges.length > 0 ? (
                <div className="favorites-list">
                    {favoriteColleges.map(college => (
                        <div key={college.id} className="favorite-item">
                            <CollegeCard
                                college={college}
                                // All cards on this page are favorites, so pass true.
                                isFavorite={true}
                                // The "Add" button shouldn't do anything here.
                                onAddToFavorites={() => { }}
                            />
                            {/* This button is styled by FavoritesPage.css to appear on hover */}
                            <button
                                className="remove-favorite-btn"
                                onClick={() => handleRemoveFromFavorites(college)}>
                                ❌ Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-favorites-container">
                    <p className="no-favorites-message">You haven't added any colleges to your favorites yet.</p>
                    <p className="no-favorites-submessage">Go to the Colleges page to start exploring!</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;