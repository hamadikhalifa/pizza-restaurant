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

    fetch("http://localhost:5555/pizzas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
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
    <div>
      <h2>Create New Pizza</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Ingredients (comma separated):
          <input
            type="text"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Create Pizza</button>
      </form>
    </div>
  );
}

export default NewPizzaForm;
