from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import cross_origin  # ✅ Enable CORS for frontend communication

bcrypt = Bcrypt()

auth_routes = Blueprint("auth_routes", __name__)

# ✅ Temporary in-memory storage for registered users
users = []

# ✅ User Login Route
@auth_routes.route('/api/login', methods=['POST'])
@cross_origin()  # ✅ Allows frontend access
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # ✅ Find user by email
    user = next((u for u in users if u["email"] == email), None)

    if not user or not bcrypt.check_password_hash(user["password_hash"], password):  
        return jsonify({"error": "Email hoặc mật khẩu không đúng."}), 401

    return jsonify({
        "message": "Đăng nhập thành công!",
        "user": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"]
        }
    }), 200

# ✅ User Registration Route
@auth_routes.route('/api/register', methods=['POST'])
@cross_origin()  # ✅ Allows frontend access
def register():
    data = request.get_json()
    full_name = data.get("fullName")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({"error": "Vui lòng nhập đầy đủ thông tin."}), 400

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

    return jsonify({"message": "Đăng ký thành công!", "user_id": user["id"]}), 201

# ✅ Get All Registered Users (Demo)
@auth_routes.route('/api/users', methods=['GET'])
@cross_origin()  # ✅ Allows frontend access
def get_users():
    return jsonify({"registered_users": users}), 200
