import os
from flask import Flask, render_template
from werkzeug.wrappers import Request, Response

app = Flask(__name__,
            template_folder=os.path.join(os.path.dirname(__file__), '../templates'))
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret')

# Homepage
@app.route("/")
def index():
    return render_template("index.html")

# About page
@app.route("/a-propos")
def about():
    # You would create an 'about.html' file
    return render_template("about.html")

# Projects page
@app.route("/projets")
def projects():
    # Example projects list
    projects_list = [
        {"title": "Projet 1", "desc": "Un projet en Python et Flask.", "link": "#"},
        {"title": "Projet 2", "desc": "Application web avec JavaScript.", "link": "#"},
        {"title": "Projet 3", "desc": "Analyse de données avec Pandas.", "link": "#"}
    ]
    # You would create a 'projects.html' file that can display this list
    return render_template("projets.html", projects=projects_list)

# Other pages (Blog, Contact, CV)
@app.route("/blog")
def blog():
    return render_template("blog.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/cv")
def cv():
    return render_template("cv.html")

def handler(event, context):
    with app.test_request_context(
        path=event["path"],
        method=event["httpMethod"],
        headers=event["headers"],
        data=event.get("body", "")
    ) as request_context:
        request_context.request = Request(request_context.environ)
        response = app.full_dispatch_request()
        return {
            'statusCode': response.status_code,
            'headers': dict(response.headers),
            'body': response.get_data().decode('utf-8')
        }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)