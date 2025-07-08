import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/restaurants")
      .then((res) => res.json())
      .then(setRestaurants)
      .catch((err) => console.error("Failed to fetch restaurants:", err));
  }, []);

  return (
    <div>
      <h2>All Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link to={`/restaurants/${restaurant.id}`}>
                {restaurant.name} – {restaurant.address}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantList;
