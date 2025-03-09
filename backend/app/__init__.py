from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # ✅ Allow CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)  

    # Import and register routes
    from app.routes.auth_routes import auth_routes
    app.register_blueprint(auth_routes)

    return app
