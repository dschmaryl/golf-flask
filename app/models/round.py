from app import db
from .hole import Hole


class Round(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    tee_id = db.Column(db.Integer, db.ForeignKey('course_tee.id'))

    date = db.Column(db.DateTime)
    notes = db.Column(db.String(128))

    front_9_strokes = db.Column(db.Integer)
    front_9_putts = db.Column(db.Integer)
    front_9_gir = db.Column(db.Integer)

    back_9_strokes = db.Column(db.Integer)
    back_9_putts = db.Column(db.Integer)
    back_9_gir = db.Column(db.Integer)

    total_strokes = db.Column(db.Integer)
    total_putts = db.Column(db.Integer)
    total_gir = db.Column(db.Integer)

    par_3_avg = db.Column(db.Float)
    par_4_avg = db.Column(db.Float)
    par_5_avg = db.Column(db.Float)

    handicap_index = db.Column(db.Float)

    holes = db.relationship('Hole', backref='round', lazy='dynamic',
                            cascade="save-update, delete")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        for i in range(1, 19):
            self.holes.append(Hole(hole_number=i, strokes=0, putts=0,
                                   gir=False))

    def get_hole(self, hole_number):
        return self.holes.filter_by(hole_number=hole_number).first()

    def calc_totals(self):
        self.front_9_strokes, self.front_9_putts, self.front_9_gir = 0, 0, 0
        self.back_9_strokes, self.back_9_putts, self.back_9_gir = 0, 0, 0
        self.total_strokes, self.total_putts, self.total_gir = 0, 0, 0
        sum3, den3, sum4, den4, sum5, den5 = 0, 0, 0, 0, 0, 0

        for hole in self.holes:
            if hole.hole_number <= 9:
                self.front_9_strokes += hole.strokes
                self.front_9_putts += hole.putts
                if hole.gir:
                    self.front_9_gir += 1
            else:
                self.back_9_strokes += hole.strokes
                self.back_9_putts += hole.putts
                if hole.gir:
                    self.back_9_gir += 1

            if hole.par == 3:
                sum3 += hole.strokes
                den3 += 1
            elif hole.par == 4:
                sum4 += hole.strokes
                den4 += 1
            else:
                sum5 += hole.strokes
                den5 += 1

        self.par_3_avg = sum3 / den3
        self.par_4_avg = sum4 / den4
        self.par_5_avg = sum5 / den5

        self.total_strokes = self.front_9_strokes + self.back_9_strokes
        self.total_putts = self.front_9_putts + self.back_9_putts
        self.total_gir = self.front_9_gir + self.back_9_gir

    def calc_handicap(self):
        rounds = self.user.get_rounds()
        round_idx = rounds.index(self)
        rounds = rounds[max(0, round_idx - 19):round_idx + 1]

        # if len(rounds) < 5:
        #     # not enough rounds yet
        #     self.handicap_index = 50.0
        #     return
        # num_of_diffs_used = {
        #     5: 1, 6: 1, 7: 2, 8: 2, 9: 3, 10: 3, 11: 4, 12: 4,
        #     13: 5, 14: 5, 15: 6, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10
        #     }[len(rounds)]

        # my own version of num_of_diffs_used
        num_of_diffs_used = {
            1: 1, 2: 1, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5, 11: 6,
            12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 10, 20: 10
            }[len(rounds)]

        diffs = sorted([r.calc_diff() for r in rounds])[:num_of_diffs_used]
        handicap_str = str(sum(diffs) / len(diffs) * .96)
        self.handicap_index = min(
            50,
            float(handicap_str[:handicap_str.find('.') + 2])
            )

    def calc_diff(self):
        if self == self.user.get_rounds()[0]:
            return self.total_strokes
        if len(self.holes.all()) == 0:
            # large value so as not to be included. this is stupid
            return 1000
        old_handicap = self.user.get_previous_round(self).handicap_index
        course_handicap = round(old_handicap * self.tee.slope / 113, 0)
        if course_handicap < 10:
            # TODO: max is double bogey. this needs to be fixed
            max_score = 7
        else:
            max_score = int(course_handicap / 10 + 6)

        adj_score = sum([min(max_score, hole.strokes) for hole in self.holes])
        rating = self.tee.rating * len(self.holes.all()) / 18
        slope = self.tee.slope * len(self.holes.all()) / 18
        return (adj_score - rating) * 113 / slope

    def __repr__(self):
        return '<Round %r>' % (self.date)