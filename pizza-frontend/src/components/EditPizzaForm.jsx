import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditPizzaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5555/pizzas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pizza not found");
        return res.json();
      })
      .then((pizza) => {
        setFormData({
          name: pizza.name,
          ingredients: pizza.ingredients,
        });
      })
      .catch((err) => {
        toast.error(`❌ ${err.message}`);
        navigate("/"); 
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5555/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        toast.success("✅ Pizza updated!");
        navigate("/pizzas");
      })
      .catch((err) => toast.error(`❌ ${err.message}`));
  };

  return (
    <div>
      <h2>Edit Pizza</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Ingredients:
          <input
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Pizza</button>
      </form>
    </div>
  );
}

export default EditPizzaForm;
