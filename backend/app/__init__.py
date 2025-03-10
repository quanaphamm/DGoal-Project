import os
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# ✅ Define Upload Folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "..", "uploads")

def create_app():
    app = Flask(__name__)

    # ✅ Fix CORS with Proper Settings
    CORS(app, 
         resources={r"/*": {"origins": ["https://dgoal-frontend.onrender.com", "http://localhost:3000"], 
                            "supports_credentials": True}})

    # ✅ Initialize Flask-Bcrypt
    bcrypt.init_app(app)

    # ✅ Set Upload Folder
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

    # ✅ Ensure Upload Folder Exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # ✅ Import and Register Routes
    from app.routes.auth_routes import auth_routes
    from app.routes.product_routes import product_routes
    from app.routes.job_routes import job_routes

    app.register_blueprint(auth_routes, url_prefix="/auth")
    app.register_blueprint(product_routes, url_prefix="/products")
    app.register_blueprint(job_routes, url_prefix="/jobs")

    return app
