from flask import send_from_directory

from backend import app, base_dir


@app.route('/react/index')
@app.route('/react/')
@app.route('/react')
def react():
    build_dir = str(base_dir / 'frontend' / 'build')
    return send_from_directory(build_dir, 'index.html')
