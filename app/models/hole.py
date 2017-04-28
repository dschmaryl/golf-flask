from app import db


class Hole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey('round.id'))

    hole_number = db.Column(db.Integer)

    strokes = db.Column(db.Integer)
    putts = db.Column(db.Integer)

    gir = db.Column(db.Boolean, nullable=False, default=False)

    fairway_hit = db.Column(db.Boolean, nullable=False, default=False)
    sand_save = db.Column(db.Integer)  # 0: fail, 1: success, None: none

    par = db.Column(db.Integer)
    yardage = db.Column(db.Integer)
    handicap = db.Column(db.Integer)

    adjusted_strokes = db.Column(db.Integer)

    def set_course_hole_data(self):
        course_hole_data = self.round.tee.get_hole(self.hole_number)
        self.par = course_hole_data.par
        self.yardage = course_hole_data.yardage
        self.handicap = course_hole_data.handicap

    def set_gir(self, gir):
        self.gir = True if gir else self._calc_gir()

    def _calc_gir(self):
        return self.strokes - self.putts <= self.par - 2

    def __repr__(self):
        return '<Hole %r>' % (self.id)
