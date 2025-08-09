from flask_frozen import Freezer
from app import app

app.config['FREEZER_DESTINATION_ROOT'] = 'build'

freezer = Freezer(app)

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