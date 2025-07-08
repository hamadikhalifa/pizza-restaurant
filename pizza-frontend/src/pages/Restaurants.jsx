import { useEffect, useState } from 'react';

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error('Error fetching restaurants:', err));
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(r => (
          <li key={r.id}>
            <strong>{r.name}</strong> — {r.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurants;
