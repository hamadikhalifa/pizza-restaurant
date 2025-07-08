# 🍕 Pizza Restaurant

A full-stack restaurant management application where users can view restaurants, pizzas, and associate pizzas with restaurants.

---

## 📁 Project Overview

This project is structured into two parts:

- **Backend:** A Flask API that handles data models and routes for restaurants and pizzas.
- **Frontend:** A React (Vite) client for interacting with the API.

---

## 🧰 Tech Stack

### Backend
- Python
- Flask
- SQLAlchemy
- Flask-Migrate
- SQLite (development)
- Flask-CORS

### Frontend
- React (Vite)
- React Router
- React Toastify
- CSS Modules or Tailwind CSS (your choice)

---

## 📂 Project Structure
pizza-restaurant/
├── server/ # Flask backend
│ ├── app.py
│ ├── models.py
│ ├── pizza_routes.py
│ ├── migrations/
│ └── .venv/
├── pizza-frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── vite.config.js
│ └── package.json
└── README.md # This file

### 
---

## 🚀 Getting Started

### 📦 Backend Setup (Flask API)

1. **Navigate to backend directory:**

   ```bash
   cd server

### Create and activate a virtual environment:
python3 -m venv .venv
source .venv/bin/activate

### Run database migrations:
export FLASK_APP=app.py
flask db upgrade

### Start the Flask development server:
Start the Flask development server:
It will run on: http://127.0.0.1:5555/

### Frontend Setup (React)
Navigate to frontend directory
cd ../pizza-frontend

###  Install dependencies:
npm run dev
App will be running on: http://localhost:5173/

###  API Routes Summary
Method	   Endpoint        	      Description
GET	       /restaurants 	      Get all restaurants
GET 	   /restaurants/:id	      Get restaurant and its pizzas
DELETE	   /restaurants/:id	      Delete a restaurant
GET 	  /pizzas	              Get all pizzas
POST	  /restaurant_pizzas	  Associate a pizza with a restaurant

### Features Implemented
- ist restaurants with their address
- View detailed restaurant pages
- Display available pizzas
- Associate a pizza with a restaurant
- Delete restaurants and pizzas
- Toast notifications for success/error actions

###  Sample Data (use Flask shell)
# Run this in flask shell
from app import db
from models import Restaurant, Pizza

r1 = Restaurant(name="Karen's Pizza Shack", address="Karen Lane")
r2 = Restaurant(name="Kiki's Pizza", address="Ngong Road")
p1 = Pizza(name="Geri", ingredients="Dough, Tomato Sauce, Cheese, Pepperoni")

db.session.add_all([r1, r2, p1])
db.session.commit()


### Author
Hamadikhalifa
