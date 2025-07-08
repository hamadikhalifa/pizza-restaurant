import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/pizzas")
      .then((res) => res.json())
      .then(setPizzas)
      .catch((err) => console.error("Failed to fetch pizzas:", err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this pizza?")) return;

    fetch(`http://localhost:5555/pizzas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete pizza");
        setPizzas((prev) => prev.filter((pizza) => pizza.id !== id));
        toast.success("🍕 Pizza deleted!");
      })
      .catch((err) => {
        toast.error(`❌ ${err.message}`);
      });
  };

  return (
    <div>
      <h2>All Pizzas</h2>
      {pizzas.length === 0 ? (
        <p>No pizzas available.</p>
      ) : (
        <ul>
          {pizzas.map((pizza) => (
            <li key={pizza.id}>
              🍕 <strong>{pizza.name}</strong> — {pizza.ingredients}
              {" "}
              <button onClick={() => handleDelete(pizza.id)}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PizzaList;
