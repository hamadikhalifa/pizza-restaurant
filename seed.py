from app import create_app, db
from models import Restaurant, Pizza, RestaurantPizza

app = create_app()

with app.app_context():
    print("🌱 Seeding database...")


    Restaurant.query.delete()
    Pizza.query.delete()
    RestaurantPizza.query.delete()

    
    r1 = Restaurant(name="Karen's Pizza Shack", address="Karen Lane")
    r2 = Restaurant(name="Sanjay's Pizza", address="Westlands Ave")
    r3 = Restaurant(name="Kiki's Pizza", address="Ngong Road")

    
    p1 = Pizza(name="Emma", ingredients="Dough, Tomato Sauce, Cheese")
    p2 = Pizza(name="Geri", ingredients="Dough, Tomato Sauce, Cheese, Pepperoni")
    p3 = Pizza(name="Melanie", ingredients="Dough, Sauce, Ricotta, Red peppers, Mustard")

    db.session.add_all([r1, r2, r3, p1, p2, p3])
    db.session.commit()

    
    rp1 = RestaurantPizza(price=5, pizza_id=p1.id, restaurant_id=r1.id)
    rp2 = RestaurantPizza(price=10, pizza_id=p2.id, restaurant_id=r2.id)
    rp3 = RestaurantPizza(price=7, pizza_id=p3.id, restaurant_id=r3.id)

    db.session.add_all([rp1, rp2, rp3])
    db.session.commit()

    print("✅ Done seeding!")
