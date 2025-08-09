from flask_frozen import Freezer
from app import app

# This is important for generating relative URLs
# It creates a structure like /blog/index.html instead of /blog.html
app.config['FREEZER_DESTINATION_ROOT'] = 'build'

freezer = Freezer(app)

@freezer.register_generator
def generate_pages():
    yield 'index'
    yield 'about'
    yield 'projects'
    yield 'blog'
    yield 'contact'
    yield 'cv'

if __name__ == '__main__':
    freezer.freeze()