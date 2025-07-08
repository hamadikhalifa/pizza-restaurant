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
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-red-700">🍕 Pizza Restaurant</h1>

        <nav className="flex justify-center gap-6 mb-8 text-lg font-medium text-white bg-red-600 py-4 px-6 rounded-lg shadow-md">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/restaurants" className="hover:text-yellow-300 transition">Restaurants</Link>
          <Link to="/add" className="hover:text-yellow-300 transition">Add Pizza</Link>
          <Link to="/pizzas/new" className="hover:text-yellow-300 transition">New Pizza</Link>
        </nav>

        <div className="bg-white rounded-xl shadow p-6">
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
      </div>
    </>
  );
}

export default App;
