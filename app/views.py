import flask
import flask_login

from datetime import date
from dateutil.parser import parse

from flask import (flash, g, redirect, render_template, request,
    send_from_directory, url_for)

from app import app, bcrypt, db, login_manager
from app.models import GolfRound, HoleScore, GolfCourse, Tee, Hole, User


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500

@app.route('/robots.txt')
@app.route('/humans.txt')
def static_file():
    return send_from_directory(app.static_folder, request.path[1:])

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.before_request
def before_request():
    g.user = flask_login.current_user


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        user = User.query.filter_by(username=request.form['username']).first()
        if user:
            password = request.form['password']
            if bcrypt.check_password_hash(user.password, password):
                flask_login.login_user(user, remember=True)
            else:
                flash('incorrect password')
                return redirect(url_for('login'))
        else:
            flash('username not found')
            return redirect(url_for('login'))
        return redirect(url_for('user', username=g.user.username))

    return render_template('login.html', title='log in',
                           form=request.form)


@app.route('/logout', methods=['GET'])
def logout():
    flask_login.logout_user()
    return redirect(url_for('index'))


@app.route('/user/<username>')
@flask_login.login_required
def user(username):
    user = User.query.filter_by(username=username).first()
    title = 'stats for ' + username
    return render_template('user.html', user=user, title=title)


@app.route('/user/<username>/round_list')
@flask_login.login_required
def round_list(username):
    user = User.query.filter_by(username=username).first()
    return render_template('round_list.html', title='rounds',
                           rounds=user.rounds)


@app.route('/user/<username>/round_new', methods=['GET', 'POST'])
@flask_login.login_required
def round_new(username):
    user = User.query.filter_by(username=username).first()
    courses = GolfCourse.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new round')
            return redirect(url_for('round_list', username=username))

        new_round = GolfRound(date=parse(request.form['date']),
                          notes=request.form['notes'])

        courses = GolfCourse.query.filter_by(nickname=request.form['course'])
        course = courses.first()
        tee = course.get_tee_by_color(request.form['tee_color'])
        new_round.tee = tee

        user = User.query.filter_by(username=username).first()
        user.rounds.append(new_round)

        for i in range(1, 19):
            score = HoleScore(
                hole=i, score=int(request.form['hole%i_score' % i]),
                putts=int(request.form['hole%i_putts' % i])
                )
            new_round.scores.append(score)
            try:
                score.gir = int(request.form['hole%i_gir' % i])
            except:
                score.calc_gir()

        new_round.calc_totals()
        new_round.calc_handicap()

        db.session.commit()
        flash('added round %i' % new_round.id)
        return redirect(url_for('round_list', username=username))

    return render_template('round_new.html', title='new round',
                           user=user, courses=courses, date=date.today(),
                           form=request.form)


@app.route('/user/<username>/round_edit/<round_id>', methods=['GET', 'POST'])
@flask_login.login_required
def round_edit(username, round_id):
    golf_round = GolfRound.query.get(round_id)
    if not golf_round:
        flash('round %s not found' % round_id)
        return redirect(url_for('round_list', username=username))

    courses = GolfCourse.query.all()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled round %s edit' % round_id)
        elif 'delete' in request.form:
            db.session.delete(golf_round)
            db.session.commit()
            flash('deleted round %s' % round_id)
        else:
            golf_round.date = parse(request.form['date'])
            course = GolfCourse.query.get(request.form['course'])
            tee = course.get_tee_by_color(request.form['tee_color'])
            golf_round.tee = tee

            for i in range(1, 19):
                score = golf_round.get_score_for_hole(i)
                if score:
                    score.score = int(request.form['hole%i_score' % i])
                    score.putts = int(request.form['hole%i_putts' % i])
                else:
                    hole_score_str = 'hole%i_score' % i
                    if hole_score_str in request.form:
                        score = HoleScore(hole=i,
                                      score=int(request.form[hole_score_str]))
                    hole_putts_str = 'hole%i_putts' % i
                    if hole_putts_str in request.form:
                        score.putts = int(request.form[hole_putts_str])
                    golf_round.scores.append(score)
                try:
                    gir_str = 'hole%i_gir' % score.hole
                    score.gir = int(request.form[gir_str])
                except:
                    score.calc_gir()

            golf_round.calc_totals()
            golf_round.calc_handicap()

            db.session.commit()
            flash('saved round %s' % round_id)

        return redirect(url_for('round_list', username=username))

    return render_template('round_edit.html', title='edit round',
                           round=golf_round, courses=courses,
                           form=request.form)


@app.route('/course_list')
@flask_login.login_required
def course_list():
    courses = GolfCourse.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@flask_login.login_required
def course_new():
    if request.method == 'POST':
        new_course = GolfCourse(name=request.form['name'],
                            nickname=request.form['nickname'])
        db.session.add(new_course)
        db.session.commit()
        return redirect(url_for('tee_new', course_id=new_course.id))

    return render_template('course_new.html', title='new course',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@flask_login.login_required
def tee_new(course_nickname):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        tee = Tee(date=parse(request.form['date']),
                  color=request.form['tee_color'],
                  rating=int(request.form['rating']),
                  slope=int(request.form['slope']))
        course.tees.append(tee)

        for i in range(1, 19):
            tee.holes.append(Hole(
                hole=i,
                par=int(request.form['hole%i_par' % i]),
                yardage=int(request.form['hole%i_yardage' % i]),
                handicap=int(request.form['hole%i_handicap' % i])
            ))
        db.session.commit()

        flash('saved %s tees' % tee.color)
        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_new.html', title='new tee',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_edit/<tee_id>',
           methods=['GET', 'POST'])
@flask_login.login_required
def tee_edit(course_nickname, tee_id):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')

    tee = course.tees.filter_by(id=tee_id).first()

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s tees edit' % tee.color)
        elif 'delete' in request.form:
            db.session.delete(tee)
            db.session.commit()
            flash('%s tee deleted' % tee.color)
        else:
            tee.date = parse(request.form['date'])
            tee.rating = int(request.form['rating'])
            tee.slope = int(request.form['slope'])
            tee.color = int(request.form['tee_color'])

            for i in range(1, 19):
                par = int(request.form['hole%i_par' % i])
                yardage = int(request.form['hole%i_yardage' % i])
                handicap = int(request.form['hole%i_handicap' % i])

                hole = tee.holes.filter_by(hole=i).first()
                if hole:
                    hole.par = par
                    hole.yardage = yardage
                    hole.handicap = handicap
                else:
                    tee.holes.append(Hole(hole=i, par=par, yardage=yardage,
                                          handicap=handicap))
            db.session.commit()
            flash('saved %s tees' % tee.color)

        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_edit.html', title='new tee', tee=tee,
                           form=request.form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@flask_login.login_required
def course_edit(course_nickname):
    course = GolfCourse.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled %s edit' % course.nickname)
        elif 'delete' in request.form:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
        else:
            course.nickname = request.form['nickname']
            course.name = request.form['name']
            db.session.commit()
            flash('saved %s' % course.nickname)

        return redirect(url_for('course_list'))

    return render_template('course_edit.html', title='edit course',
                           course=course, form=request.form)
