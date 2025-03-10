import os
import json
from flask import Blueprint, request, jsonify, send_from_directory, make_response
from flask_cors import cross_origin
import uuid
from PIL import Image
import numpy as np

product_routes = Blueprint("product_routes", __name__)

# ✅ File Paths
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PRODUCTS_FILE = os.path.join(BASE_DIR, "..", "products.json")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "..", "static", "uploads")

# Print the actual path for debugging
print(f"Upload folder path: {UPLOAD_FOLDER}")

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
    print(f"Serving file: {filename} from {UPLOAD_FOLDER}")
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        print(f"Error serving file: {e}")
        return jsonify({"error": str(e)}), 404

# ✅ Handle CORS Preflight Requests
@product_routes.route('/api/products/upload', methods=['OPTIONS'])
@cross_origin(origins="https://dgoal-frontend.onrender.com", supports_credentials=True)
def handle_options():
    return jsonify({"message": "CORS Preflight OK"}), 200

# ✅ Upload Product (Đăng Bán Sản Phẩm)
@product_routes.route('/upload', methods=['POST', 'OPTIONS'])
def upload_product():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "https://dgoal-frontend.onrender.com")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response
        
    data = request.form
    image_file = request.files.get("image")

    if not data.get("name") or not data.get("category") or not data.get("price") or not image_file:
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin và tải lên hình ảnh."}), 400

    # Generate a unique filename to avoid conflicts
    unique_filename = f"{uuid.uuid4()}_{image_file.filename}"
    
    # Save to the static/uploads folder
    image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    image_file.save(image_path)
    
    # Use an absolute URL for the image
    image_url = f"https://dgoal-project.onrender.com/static/uploads/{unique_filename}"

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
@product_routes.route('/', methods=['GET'])
def get_products():
    products = load_data(PRODUCTS_FILE)
    return jsonify({"products": products}), 200

# ✅ Debug Products
@product_routes.route('/debug', methods=['GET'])
def debug_products():
    products = load_data(PRODUCTS_FILE)
    return jsonify({
        "products_count": len(products),
        "products": products,
        "file_path": PRODUCTS_FILE
    }), 200

@product_routes.route('/image-debug')
def image_debug():
    files = os.listdir(UPLOAD_FOLDER)
    return jsonify({
        "upload_folder": UPLOAD_FOLDER,
        "files": files,
        "exists": os.path.exists(UPLOAD_FOLDER),
        "is_dir": os.path.isdir(UPLOAD_FOLDER)
    })

@product_routes.route('/static-file/<path:filename>')
def serve_static_file(filename):
    static_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "static"))
    return send_from_directory(static_folder, filename)

@product_routes.route('/test-image')
def test_image():
    # Create a simple test image
    test_image_path = os.path.join(UPLOAD_FOLDER, "test.jpg")
    
    # Create a simple red square image
    img = Image.fromarray(np.ones((100, 100, 3), dtype=np.uint8) * 255)
    img.save(test_image_path)
    
    return jsonify({
        "message": "Test image created",
        "path": test_image_path,
        "url": f"https://dgoal-project.onrender.com/static/uploads/test.jpg"
    })
