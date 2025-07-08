import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/pizzas")
      .then((res) => res.json())
      .then(setPizzas)
      .catch((err) => {
        console.error("Failed to fetch pizzas:", err);
        toast.error("❌ Failed to load pizzas.");
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this pizza?")) return;

    fetch(`http://localhost:5555/pizzas/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete pizza");
        setPizzas((prev) => prev.filter((pizza) => pizza.id !== id));
        toast.success("🗑️ Pizza deleted!");
      })
      .catch((err) => {
        toast.error(`❌ ${err.message}`);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-red-700 text-center mb-6">🍕 All Pizzas</h2>
      {pizzas.length === 0 ? (
        <p className="text-center text-gray-600">No pizzas available.</p>
      ) : (
        <ul className="space-y-4">
          {pizzas.map((pizza) => (
            <li
              key={pizza.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-red-600">{pizza.name}</h3>
                <p className="text-gray-700 text-sm">{pizza.ingredients}</p>
              </div>
              <button
                onClick={() => handleDelete(pizza.id)}
                className="mt-2 sm:mt-0 sm:ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PizzaList;
