import os
import json
from flask import Blueprint, request, jsonify

job_routes = Blueprint("job_routes", __name__)

# ✅ Job storage file
JOB_FILE = os.path.join(os.path.dirname(__file__), "..", "jobs.json")

# ✅ Load jobs from file (Create if missing)
def load_jobs():
    if not os.path.exists(JOB_FILE):
        with open(JOB_FILE, "w") as file:
            json.dump([], file)
    try:
        with open(JOB_FILE, "r") as file:
            return json.load(file)
    except json.JSONDecodeError:
        return []

# ✅ Save jobs to file
def save_jobs(jobs):
    with open(JOB_FILE, "w") as file:
        json.dump(jobs, file, indent=4)

# ✅ Post Job Route
@job_routes.route('/', methods=['GET'])
def get_jobs():
    jobs = load_jobs()
    return jsonify({"jobs": jobs}), 200

@job_routes.route('/post', methods=['POST'])
def post_job():
    data = request.get_json()

    company = data.get("company")
    title = data.get("title")
    salary = data.get("salary")
    location = data.get("location")
    type = data.get("type")
    description = data.get("description")
    requirements = data.get("requirements")

    if not company or not title or not salary or not location or not description or not requirements:
        return jsonify({"error": "Please fill all fields."}), 400

    jobs = load_jobs()

    job = {
        "id": len(jobs) + 1,
        "company": company,
        "title": title,
        "salary": salary,
        "location": location,
        "type": type,
        "description": description,
        "requirements": requirements
    }

    jobs.append(job)
    save_jobs(jobs)

    return jsonify({"message": "Job posted successfully!", "job": job}), 201

@job_routes.route('/debug', methods=['GET'])
def debug_jobs():
    jobs = load_jobs()
    return jsonify({
        "jobs_count": len(jobs),
        "jobs": jobs,
        "file_path": JOB_FILE
    }), 200
