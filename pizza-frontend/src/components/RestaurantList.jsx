import { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <p>Loading restaurants...</p>;

  return (
    <div>
      <h2>All Restaurants</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong> — {r.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;
