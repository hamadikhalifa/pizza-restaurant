import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5555/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurants:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading restaurants...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-red-700 text-center mb-4">🍽️ All Restaurants</h2>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {restaurants.map((r) => (
          <li
            key={r.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold text-red-600">{r.name}</h3>
            <p className="text-gray-600 mb-4">{r.address}</p>
            <Link
              to={`/restaurants/${r.id}`}
              className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
