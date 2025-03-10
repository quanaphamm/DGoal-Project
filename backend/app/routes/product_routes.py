import os
import json
from flask import Blueprint, request, jsonify, send_from_directory
from flask_cors import cross_origin

product_routes = Blueprint("product_routes", __name__)

# ✅ File Paths
BASE_DIR = os.path.dirname(__file__)  
PRODUCTS_FILE = os.path.join(BASE_DIR, "..", "products.json")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "..", "static", "uploads")

# ✅ Ensure Upload Folder Exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load data
def load_data(file_path):
    if not os.path.exists(file_path):
        with open(file_path, "w") as file:
            json.dump([], file)
    try:
        with open(file_path, "r") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []

# ✅ Save data
def save_data(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

# ✅ Serve Uploaded Images
@product_routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# ✅ Handle CORS Preflight Requests
@product_routes.route('/api/products/upload', methods=['OPTIONS'])
@cross_origin(origins="https://dgoal-frontend.onrender.com", supports_credentials=True)
def handle_options():
    return jsonify({"message": "CORS Preflight OK"}), 200

# ✅ Upload Product (Đăng Bán Sản Phẩm)
@product_routes.route('/api/products/upload', methods=['POST'])
@cross_origin(origins="https://dgoal-frontend.onrender.com", supports_credentials=True)
def upload_product():
    data = request.form
    image_file = request.files.get("image")

    if not data.get("name") or not data.get("category") or not data.get("price") or not image_file:
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin và tải lên hình ảnh."}), 400

    # ✅ Save image
    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(image_path)
    image_url = f"/uploads/{image_file.filename}"

    products = load_data(PRODUCTS_FILE)
    product = {
        "id": len(products) + 1,
        "name": data.get("name"),
        "category": data.get("category"),
        "description": data.get("description"),
        "price": data.get("price"),
        "image": image_url
    }
    products.append(product)
    save_data(PRODUCTS_FILE, products)

    return jsonify({"message": "Sản phẩm đã được đăng bán!", "product": product}), 201

# ✅ Get All Products
@product_routes.route('/api/products', methods=['GET'])
@cross_origin(origins="https://dgoal-frontend.onrender.com", supports_credentials=True)
def get_products():
    products = load_data(PRODUCTS_FILE)
    return jsonify({"products": products}), 200
