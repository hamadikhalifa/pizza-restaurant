import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import AddRestaurantPizza from "./components/AddRestaurantPizza";
import NewPizzaForm from "./components/NewPizzaForm";
import EditPizzaForm from "./components/EditPizzaForm";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6 text-red-700">🍕 Pizza Restaurant</h1>

        <nav className="flex justify-center gap-6 mb-6 text-lg font-medium text-white bg-red-600 py-4 px-6 rounded-lg shadow-md">
          <Link to="/" className="hover:text-yellow-300 transition duration-200">Home</Link>
          <Link to="/restaurants" className="hover:text-yellow-300 transition duration-200">Restaurants</Link>
          <Link to="/add" className="hover:text-yellow-300 transition duration-200">Add Pizza</Link>
          <Link to="/pizzas/new" className="hover:text-yellow-300 transition duration-200">New Pizza</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <p className="text-center text-gray-700 text-lg">
                Welcome! This is your frontend setup. Start building your UI here.
              </p>
            }
          />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/add" element={<AddRestaurantPizza />} />
          <Route path="/pizzas/new" element={<NewPizzaForm />} />
          <Route path="/pizzas/:id/edit" element={<EditPizzaForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
