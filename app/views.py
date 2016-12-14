import flask
import flask_login

from app import app, bcrypt, db, login_manager
from .models import User


@app.errorhandler(404)
def not_found_error(error):
    return flask.render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return flask.render_template('500.html'), 500


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    flask.g.user = flask_login.current_user


@app.route('/')
@app.route('/index')
def index():
    return flask.render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if flask.g.user is not None and flask.g.user.is_authenticated:
        return flask.redirect(flask.url_for('index'))

    if flask.request.method == 'POST':
        users = User.query.filter_by(username=flask.request.form['username'])
        user = users.first()
        if user:
            password = flask.request.form['password']
            #if bcrypt.check_password_hash(password, user.password):
            if password == user.password:
                flask_login.login_user(user, remember=True)
        else:
            flask.flash('username not found')
        return flask.redirect(flask.url_for('index'))

    return flask.render_template('login.html', title='log in',
                                 form=flask.request.form)


@app.route('/logout', methods=['GET'])
def logout():
    flask_login.logout_user()
    return flask.redirect(flask.url_for('index'))


@app.route('/user/<username>')
@flask_login.login_required
def user(username):
    # page for player stats
    title = 'stats for ' + username
    return flask.render_template('user.html', username=username, title=title)


@app.route('/user/<username>/new_score')
@flask_login.login_required
def new_score(username):
    # form page for adding a new round
    return flask.render_template('new_score.html', username=username,
                                 title='new score')
