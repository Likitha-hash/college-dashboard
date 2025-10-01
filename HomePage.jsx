import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to CollegeConnect!</h1>
            <p className="home-description">
                Your personalized dashboard to explore colleges, manage favorites, and share reviews.
            </p>
            <button className="home-button" onClick={() => navigate('/colleges')}>
                Get Started
            </button>
        </div>
    );
};

export default HomePage;