from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Restaurant, Pizza, RestaurantPizza

migrate = Migrate()  

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    @app.route('/')
    def index():
        return jsonify({"message": "Pizza API running"})

    @app.route('/restaurants', methods=['GET'])
    def get_restaurants():
        restaurants = Restaurant.query.all()
        return jsonify([
            {
                "id": r.id,
                "name": r.name,
                "address": r.address
            } for r in restaurants
        ]), 200

    @app.route('/restaurants/<int:id>', methods=['GET'])
    def get_restaurant_by_id(id):
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({"error": "Restaurant not found"}), 404

        return jsonify(restaurant.to_dict()), 200

    @app.route('/restaurants/<int:id>', methods=['DELETE'])
    def delete_restaurant(id):
        restaurant = Restaurant.query.get(id)
        if not restaurant:
            return jsonify({"error": "Restaurant not found"}), 404

        db.session.delete(restaurant)
        db.session.commit()
        return '', 204

    @app.route('/pizzas', methods=['GET'])
    def get_pizzas():
        pizzas = Pizza.query.all()
        return jsonify([p.to_dict() for p in pizzas]), 200

    @app.route('/restaurant_pizzas', methods=['POST'])
    def create_restaurant_pizza():
        data = request.get_json()
        try:
            price = data.get("price")
            pizza_id = data.get("pizza_id")
            restaurant_id = data.get("restaurant_id")

            if not all([price, pizza_id, restaurant_id]):
                return jsonify({"error": "Missing required fields"}), 400

            new_link = RestaurantPizza(
                price=price,
                pizza_id=pizza_id,
                restaurant_id=restaurant_id
            )
            db.session.add(new_link)
            db.session.commit()

            return jsonify(new_link.pizza.to_dict()), 201

        except Exception as e:
            return jsonify({"error": str(e)}), 400

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)
