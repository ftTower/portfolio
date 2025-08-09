import os
from flask import Flask, render_template
from werkzeug.wrappers import Request, Response
from base64 import b64encode

# Le dossier 'static' est de retour, car la fonction doit pouvoir y accéder
app = Flask(__name__,
            template_folder=os.path.join(os.path.dirname(__file__), '../../templates'),
            static_folder=os.path.join(os.path.dirname(__file__), '../../static'))
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret')

# Homepage
@app.route("/")
def index():
    return render_template("index.html")

# About page
@app.route("/a-propos")
def about():
    return render_template("about.html")

# Projects page
@app.route("/projets")
def projects():
    projects_list = [
        {"title": "Projet 1", "desc": "Un projet en Python et Flask.", "link": "#"},
        {"title": "Projet 2", "desc": "Application web avec JavaScript.", "link": "#"},
        {"title": "Projet 3", "desc": "Analyse de données avec Pandas.", "link": "#"}
    ]
    return render_template("projets.html", projects=projects_list)

# Other pages
@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/cv")
def cv():
    return render_template("cv.html")

# Un dictionnaire pour les types de médias binaires
BINARY_TYPES = {
    'image/jpeg', 'image/png', 'image/gif', 'application/octet-stream', 'application/pdf',
}

def handler(event, context):
    with app.test_request_context(
        path=event["path"],
        method=event["httpMethod"],
        headers=event["headers"],
        data=event.get("body", "")
    ):
        request = Request(app.test_request_context().environ)
        response = app.full_dispatch_request()

        is_base64_encoded = False
        body = response.get_data()
        content_type = response.headers.get("Content-Type", "")
        
        # Vérifiez si le contenu doit être encodé en base64
        if any(binary_type in content_type for binary_type in BINARY_TYPES):
            body = b64encode(body).decode('utf-8')
            is_base64_encoded = True
        else:
            body = body.decode('utf-8')
        
        return {
            'statusCode': response.status_code,
            'headers': dict(response.headers),
            'body': body,
            'isBase64Encoded': is_base64_encoded
        }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)