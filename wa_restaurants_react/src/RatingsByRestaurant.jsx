import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingCard from './RatingCard';

function RatingsByRestaurant() {
    const { id } = useParams();
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRatings();
    }, [id]);

    const fetchRatings = async () => {
        try {
        const response = await fetch(`http://127.0.0.1:8000/api/restaurants/${id}/ratings`);
        if (!response.ok) throw new Error('Failed to fetch ratings');
        const data = await response.json();
        setRatings(data);
        } catch (err) {
        setError('Error loading ratings.');
        }
    };

    const handleDelete = async (ratingId) => {
        try {
            const response = await fetch(
            `http://127.0.0.1:8000/api/restaurants/${id}/ratings/${ratingId}`,
            { method: 'DELETE' }
            );
            if (!response.ok) throw new Error('Failed to delete');

            // По-простому обновляем список:
            setRatings((prev) => prev.filter(r => r.id !== ratingId));
        } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete rating');
        }
    };

    return (
    <div>
      <h2>Ratings for Restaurant {id}</h2>
      {error && <p>{error}</p>}
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        ratings.map((r) => (
          <RatingCard key={r.id} rating={r} restaurantId={id} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default RatingsByRestaurant;