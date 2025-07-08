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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-6">🍽️ All Restaurants</h2>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-red-600 mb-2">{restaurant.name}</h3>
              <p className="text-gray-700 mb-4">{restaurant.address}</p>
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantList;
