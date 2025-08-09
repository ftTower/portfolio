from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

# This is a list of all your routes that need to be generated as static pages
@freezer.register_generator
def generate_pages():
    yield '/'
    yield '/a-propos'
    yield '/projets'
    yield '/blog'
    yield '/contact'
    yield '/cv'

if __name__ == '__main__':
    freezer.freeze()