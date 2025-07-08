import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewRestaurantPizzaForm() {
  const [pizzas, setPizzas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    pizza_id: "",
    restaurant_id: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/pizzas")
      .then((res) => res.json())
      .then(setPizzas)
      .catch(() => toast.error("Failed to load pizzas"));

    fetch("http://localhost:5555/restaurants")
      .then((res) => res.json())
      .then(setRestaurants)
      .catch(() => toast.error("Failed to load restaurants"));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5555/restaurant_pizzas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pizza_id: parseInt(formData.pizza_id),
        restaurant_id: parseInt(formData.restaurant_id),
        price: parseInt(formData.price),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid input or server error");
        return res.json();
      })
      .then(() => {
        toast.success("✅ Pizza added successfully!");
        navigate(`/restaurants/${formData.restaurant_id}`);
      })
      .catch((err) => toast.error(`❌ ${err.message}`));
  }

  return (
    <div>
      <h2>Add Pizza to Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza:
          <select
            name="pizza_id"
            value={formData.pizza_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a pizza</option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                {pizza.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Restaurant:
          <select
            name="restaurant_id"
            value={formData.restaurant_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Price (1–30):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            max="30"
          />
        </label>
        <br />

        <button type="submit">Add Pizza</button>
      </form>
    </div>
  );
}

export default NewRestaurantPizzaForm;
