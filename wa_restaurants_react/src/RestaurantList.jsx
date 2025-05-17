import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/restaurants/ratings');
        if (!response.ok) {
          throw new Error(response.statusText || 'Failed to fetch');
        }
        const data = await response.json();

        // Lisätään imageUrl ja muunnetaan kenttien nimet oikeiksi
        const enrichedData = data.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          address: restaurant.address,
          averageRating: restaurant.rating,
          reviewCount: restaurant.review_count,
          priceRange: restaurant.price_range,
          imageUrl: '/images/cheese_burger.jpg'
        }));

        setRestaurants(enrichedData);
      } catch (e) {
        console.error('Error fetching restaurants:', e);
        setError('Failed to load restaurant list.');
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
      </div>
      <div className="restaurant-list">
        {error && <p className="error-message">{error}</p>}
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;