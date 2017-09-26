from flask import g, jsonify, request

from golf_stats import app
from golf_stats.models import User
from golf_stats.utils import create_user
from .authorize import check_authorization


@app.route('/api/users')
@check_authorization
def get_users():
    return jsonify({u.id: u.username for u in User.query.all()})


@app.route('/api/user/<user_id>')
@check_authorization
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        if g.user.username == user.username:
            return jsonify(user.as_dict())
        else:
            return jsonify(error='not permitted')
    else:
        return jsonify(error='not found')


@app.route('/api/add_user', methods=['POST'])
@check_authorization
def add_user():
    if g.user.username != 'daryl':
        return jsonify(error='must be daryl')
    if request.method == 'POST':
        return jsonify(create_user(request.get_json()))
    return jsonify(error='failed')
