from flask import Blueprint, request, jsonify
from models import db, Pizza  

pizza_bp = Blueprint('pizzas', __name__)

@pizza_bp.route('/pizzas', methods=['GET', 'POST'])
def handle_pizzas():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get("name")
        ingredients = data.get("ingredients")

        if not name or not isinstance(ingredients, list):
            return jsonify({
                "error": "Invalid data. 'name' must be a string and 'ingredients' must be a list."
            }), 400


        ingredients_str = ", ".join(ingredients)

        pizza = Pizza(name=name, ingredients=ingredients_str)
        db.session.add(pizza)
        db.session.commit()

        return jsonify(pizza.to_dict()), 201

    pizzas = Pizza.query.all()
    return jsonify([p.to_dict() for p in pizzas]), 200
