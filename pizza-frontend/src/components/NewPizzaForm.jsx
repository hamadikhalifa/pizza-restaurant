import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewPizzaForm() {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      ingredients: formData.ingredients.split(",").map((i) => i.trim()),
    };

    fetch("http://localhost:5555/pizzas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create pizza.");
        return res.json();
      })
      .then(() => {
        toast.success("✅ New pizza created!");
        navigate("/add");
      })
      .catch((err) => toast.error(`❌ ${err.message}`));
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-red-700 text-center mb-6">Create New Pizza</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Pizza Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-red-300"
            placeholder="e.g., Margherita"
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients (comma separated):
          </label>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-red-300"
            placeholder="e.g., Tomato, Cheese, Basil"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Create Pizza
        </button>
      </form>
    </div>
  );
}

export default NewPizzaForm;
