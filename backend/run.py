from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)


if __name__ != "__main__":
    gunicorn_app = app  