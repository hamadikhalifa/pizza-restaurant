import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddRestaurantPizza() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzaId, setSelectedPizzaId] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/pizzas")
      .then((res) => res.json())
      .then(setPizzas)
      .catch((err) => console.error("Failed to fetch pizzas:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRestaurantPizza = {
      restaurant_id: parseInt(restaurantId),
      pizza_id: parseInt(selectedPizzaId),
      price: parseFloat(price),
    };

    fetch("http://localhost:5555/restaurant_pizzas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRestaurantPizza),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add pizza");
        return res.json();
      })
      .then(() => {
        setSuccessMessage("🍕 Pizza added! Redirecting...");
        setTimeout(() => navigate(`/restaurants/${restaurantId}`), 1500); 
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("Failed to add pizza. Please check your input.");
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      {successMessage ? (
        <p style={{ color: "green" }}>{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Restaurant ID: </label>
            <input
              type="number"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label>Pizza: </label>
            <select
              value={selectedPizzaId}
              onChange={(e) => setSelectedPizzaId(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="">-- Choose a pizza --</option>
              {pizzas.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Price ($): </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1"
              max="30"
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Pizza"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddRestaurantPizza;
