import os
import json
from flask import Blueprint, request, jsonify, send_from_directory, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS

bcrypt = Bcrypt()
auth_routes = Blueprint("auth_routes", __name__)

# ✅ File Paths for JSON storage
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # Get project root
USER_FILE = os.path.join(BASE_DIR, "users.json")
PRODUCTS_FILE = os.path.join(BASE_DIR, "products.json")
JOBS_FILE = os.path.join(BASE_DIR, "jobs.json")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")  # ✅ Folder for storing images

# ✅ Ensure Upload Folder Exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load data from JSON file
def load_data(file_path):
    if not os.path.exists(file_path):
        with open(file_path, "w") as file:
            json.dump([], file)  # Create empty list
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []  # Return empty list if JSON is corrupted

# ✅ Save Data
def save_data(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)
        
# ✅ Serve Uploaded Images
@auth_routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ✅ User Registration
@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    full_name = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin."}), 400

    users = load_data(USER_FILE)
    if any(u["email"] == email for u in users):
        return jsonify({"error": "Email đã tồn tại."}), 400

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = {
        "id": len(users) + 1,
        "full_name": full_name,
        "email": email,
        "password_hash": password_hash
    }
    users.append(user)
    save_data(USER_FILE, users)

    return jsonify({"message": "Đăng ký thành công!", "user_id": user["id"]}), 201

# ✅ User Login
@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Vui lòng nhập email và mật khẩu."}), 400

    users = load_data(USER_FILE)
    user = next((u for u in users if u["email"] == email), None)

    if not user:
        return jsonify({"error": "Email không tồn tại."}), 401

    if not bcrypt.check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Mật khẩu không đúng."}), 401

    response_data = {
        "message": "Đăng nhập thành công!",
        "user": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"]
        }
    }

    return jsonify(response_data), 200

# ✅ Upload Product
@auth_routes.route('/upload', methods=['POST'])
def upload_product():
    data = request.form
    image_file = request.files.get("image")

    if not data.get("name") or not data.get("category") or not data.get("price") or not image_file:
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin và tải lên hình ảnh."}), 400

    # ✅ Save image to `UPLOAD_FOLDER`
    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(image_path)
    image_url = f"/uploads/{image_file.filename}"

    # ✅ Save product details
    products = load_data(PRODUCTS_FILE)
    product = {
        "id": len(products) + 1,
        "name": data.get("name"),
        "category": data.get("category"),
        "description": data.get("description"),
        "price": data.get("price"),
        "image": image_url  # ✅ Store image URL
    }
    products.append(product)
    save_data(PRODUCTS_FILE, products)

    return jsonify({"message": "Sản phẩm đã được đăng thành công!", "product": product}), 201

# ✅ Get All Products
@auth_routes.route('/products', methods=['GET'])
def get_products():
    products = load_data(PRODUCTS_FILE)
    return jsonify({"products": products}), 200

# ✅ Post Job (Tuyển Dụng)
@auth_routes.route('/jobs/post', methods=['POST'])
def post_job():
    data = request.get_json()

    if not data.get("company") or not data.get("title") or not data.get("salary") or not data.get("location") or not data.get("description") or not data.get("requirements"):
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin công việc."}), 400

    jobs = load_data(JOBS_FILE)
    job = {
        "id": len(jobs) + 1,
        "company": data.get("company"),
        "title": data.get("title"),
        "salary": data.get("salary"),
        "location": data.get("location"),
        "type": data.get("type"),
        "description": data.get("description"),
        "requirements": data.get("requirements"),
    }
    jobs.append(job)
    save_data(JOBS_FILE, jobs)

    return jsonify({"message": "Công việc đã được đăng thành công!", "job": job}), 201

# ✅ Get All Jobs
@auth_routes.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = load_data(JOBS_FILE)
    return jsonify({"jobs": jobs}), 200

# ✅ Get All Registered Users
@auth_routes.route('/users', methods=['GET'])
def get_users():
    users = load_data(USER_FILE)
    return jsonify({"registered_users": [
        {"id": u["id"], "full_name": u["full_name"], "email": u["email"]}
        for u in users
    ]}), 200

@auth_routes.route('/register', methods=['OPTIONS'])
@auth_routes.route('/login', methods=['OPTIONS'])
def handle_preflight():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "https://dgoal-frontend.onrender.com")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

@auth_routes.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Backend is working!"}), 200

@auth_routes.route('/upload', methods=['OPTIONS'])
def handle_product_preflight():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "https://dgoal-frontend.onrender.com")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response