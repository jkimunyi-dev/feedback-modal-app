import { useState } from 'react';
import './FeedbackModal.css';

export default function FeedbackModal() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Function to save feedback to localStorage
  const saveFeedbackToStorage = (rating) => {
    try {
      // Get existing feedback array or initialize empty array
      const existingFeedback = JSON.parse(localStorage.getItem('feedbackRatings')) || [];
      
      // Create new feedback object with rating and timestamp
      const newFeedback = {
        rating: rating,
        timestamp: new Date().toISOString(),
      };
      
      // Add new feedback to array
      existingFeedback.push(newFeedback);
      
      // Save updated array back to localStorage
      localStorage.setItem('feedbackRatings', JSON.stringify(existingFeedback));
    } catch (error) {
      console.error('Error saving feedback to localStorage:', error);
    }
  };

  // Handler for when a rating button is clicked
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handler for form submission
  const handleSubmit = () => {
    if (selectedRating !== null) {
      // Save the rating to localStorage
      saveFeedbackToStorage(selectedRating);
      
      // Show notification
      setShowNotification(true);
      
      // Log for debugging purposes
      console.log(`Submitted rating: ${selectedRating}`);
      
      // Reset form and hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
        setSelectedRating(null);
      }, 3000);
    }
  };

  // Handler for canceling/resetting the form
  const handleCancel = () => {
    setSelectedRating(null);
  };

  // Array of possible rating values
  const ratingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="container">
      {/* Notification popup - shown only when showNotification is true */}
      {showNotification && (
        <div className="notification-popup">
          Thank you for your feedback! You rated: {selectedRating}
        </div>
      )}
      
      <div className="modal-content">
        {/* Close button */}
        <button className="close-button" onClick={handleCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Modal title */}
        <div className="modal-title">
          <h2>
            How likely are you to recommend FrontendPro to someone you know?
          </h2>
        </div>
        
        {/* Rating buttons container */}
        <div className="rating-container">
          {ratingNumbers.map((num) => (
            <button
              key={num}
              onClick={() => handleRatingClick(num)}
              className={`rating-button ${selectedRating === num ? 'selected' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Rating scale labels */}
        <div className="rating-labels">
          <span>Not likely at all</span>
          <span>Extremely Likely</span>
        </div>

        {/* Action buttons */}
        <div className="modal-actions">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className={`submit-button ${!selectedRating ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!selectedRating}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
