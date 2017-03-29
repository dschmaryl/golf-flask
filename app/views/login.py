from flask import flash, g, redirect, render_template, request, url_for
from flask_login import login_user, logout_user

from app import app
from app.models import User

from app.forms import LoginForm


@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if user.check_password(form.password.data):
                login_user(user, remember=True)
            else:
                flash('incorrect password')
                return redirect(url_for('login'))
        else:
            flash('username not found')
            return redirect(url_for('login'))
        return redirect(url_for('user', username=g.user.username))

    return render_template('login.html', title='log in',
                           form=form)


@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return redirect(url_for('index'))
