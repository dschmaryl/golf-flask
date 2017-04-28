from dateutil.parser import parse

from flask import flash, redirect, render_template, request, url_for
from flask_login import login_required

from app import app, db
from app.models import Course
from app.forms import CourseForm
from .flash_errors import flash_errors


@app.route('/course_list')
@login_required
def course_list():
    courses = Course.query.all()
    return render_template('course_list.html', title='courses',
                           courses=courses)


@app.route('/course_new', methods=['GET', 'POST'])
@login_required
def course_new():
    form = CourseForm(request.form)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled new course')
            return redirect(url_for('course_list'))

        if form.validate():
            nickname = form.nickname.data
            if Course.query.filter_by(nickname=nickname).first():
                flash('%s already exists' % nickname)
                return render_template('course.html', title='new course',
                                       form=form)
            new_course = Course(name=form.name.data, nickname=nickname)
            db.session.add(new_course)
            db.session.commit()
            return redirect(url_for('course_list'))
        else:
            flash_errors(form)

    return render_template('course.html', title='new course', form=form)


@app.route('/course_edit/<course_nickname>/tee_new', methods=['GET', 'POST'])
@login_required
def tee_new(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course not found')
        return redirect(url_for('course_list'))

    if request.method == 'POST':
        if 'cancel' in request.form:
            flash('canceled new tee')
            return redirect(url_for('course_edit', title='edit course',
                                    course_nickname=course.nickname))

        tee = course.get_new_tee()
        tee.color = request.form['tee_color']
        tee.rating = int(request.form['rating'])
        tee.slope = int(request.form['slope'])

        for i in range(1, 19):
            course_hole = tee.get_hole(i)
            course_hole.par = int(request.form['hole%i_par' % i])
            course_hole.yardage = int(request.form['hole%i_yardage' % i])
            course_hole.handicap = int(request.form['hole%i_handicap' % i])

        db.session.commit()

        flash('saved %s tees' % tee.color)
        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_new.html', title='new tee',
                           form=request.form)


@app.route('/course_edit/<course_nickname>/tee_edit/<tee_id>',
           methods=['GET', 'POST'])
@login_required
def tee_edit(course_nickname, tee_id):
    course = Course.query.filter_by(nickname=course_nickname).first()
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
            tee.rating = float(request.form['rating'])
            tee.slope = int(request.form['slope'])
            tee.color = request.form['tee_color']

            for i in range(1, 19):
                # TODO: fix this with forms
                par, yardage, handicap = 0, 0, 0
                if request.form['hole%i_par' % i]:
                    par = int(request.form['hole%i_par' % i])
                if request.form['hole%i_yardage' % i]:
                    yardage = int(request.form['hole%i_yardage' % i])
                if request.form['hole%i_handicap' % i]:
                    handicap = int(request.form['hole%i_handicap' % i])

                hole = tee.get_hole(i)

                hole.par = par
                hole.yardage = yardage
                hole.handicap = handicap

            db.session.commit()
            flash('saved %s tees' % tee.color)

        return redirect(url_for('course_edit', title='edit course',
                                course_nickname=course.nickname))

    return render_template('tee_edit.html', title='new tee', tee=tee,
                           form=request.form)


@app.route('/course_edit/<course_nickname>', methods=['GET', 'POST'])
@login_required
def course_edit(course_nickname):
    course = Course.query.filter_by(nickname=course_nickname).first()
    if not course:
        flash('course %s not found' % course_nickname)
        return redirect(url_for('course_list'))

    form = CourseForm(request.form, obj=course)

    if request.method == 'POST':
        if form.cancel.data:
            flash('canceled %s edit' % course.nickname)
            return redirect(url_for('course_list'))

        if form.delete.data:
            db.session.delete(course)
            db.session.commit()
            flash('course %s deleted' % course.nickname)
            return redirect(url_for('course_list'))

        if form.validate():
            course.name = form.name.data
            course.nickname = form.nickname.data
            db.session.commit()
            flash('saved %s' % course.nickname)
            return redirect(url_for('course_list'))
        else:
            flash_errors(form)

    return render_template('course.html', title='edit course', form=form,
                           course=course)
