import os
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "..", "uploads")  # Ensure a proper folder for images

def create_app():
    app = Flask(__name__)

    # ✅ Fix CORS to allow credentials
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


    # ✅ Initialize Flask-Bcrypt
    bcrypt.init_app(app)

    # ✅ Set upload folder in config
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    # ✅ Ensure the folder exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # ✅ Import and register routes
    from app.routes.auth_routes import auth_routes
    from app.routes.product_routes import product_routes
    from app.routes.job_routes import job_routes

    app.register_blueprint(auth_routes)
    app.register_blueprint(product_routes)  # ✅ Register product routes
    app.register_blueprint(job_routes)  # ✅ Register job routes

    return app
