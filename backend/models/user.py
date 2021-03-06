from datetime import date
from pandas import Series

from backend import bcrypt, db
from .round import Round


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column('username', db.String(32), unique=True, index=True)
    password = db.Column('password', db.Binary(128))

    default_tees = db.Column(db.String(8))

    rounds = db.relationship('Round', backref='user', lazy='dynamic',
                             cascade="save-update, delete")

    def get_handicap(self, round_id):
        return self.get_round(round_id).handicap_index

    def get_latest_handicap(self):
        return self.get_latest_round().handicap_index

    def get_round(self, round_id):
        return self.rounds.filter_by(id=round_id).first()

    def get_rounds(self):
        return self.rounds.order_by(Round.date).all()

    def get_latest_round(self):
        return self.get_rounds()[-1]

    def get_previous_round(self, golf_round):
        rounds = self.get_rounds()
        round_idx = rounds.index(golf_round)
        if round_idx == 0:
            return None
        return rounds[round_idx - 1]

    def get_rounds_thru(self, golf_round):
        rounds = self.get_rounds()
        return rounds[:rounds.index(golf_round) + 1]

    def get_season_rounds(self, season):
        rounds = self.rounds.filter(Round.date >= date(season, 1, 1))
        rounds = rounds.filter(Round.date <= date(season, 12, 31))
        return rounds.order_by(Round.date).all()

    def get_average(self, stat, season=None, mavg=False, period=20):
        if season:
            rounds = self.get_season_rounds(season)
        else:
            rounds = self.get_rounds()
        if stat == 'score':
            stats = [r.total_strokes for r in rounds]
        elif stat == 'putts':
            stats = [r.total_putts for r in rounds]
        elif stat == 'gir':
            stats = [r.total_gir for r in rounds]
        elif stat == 'score_to_par':
            stats = [r.total_strokes - r.tee.get_total_par() for r in rounds]
        elif stat == 'handicap':
            stats = [r.handicap_index for r in rounds]
        avgs = self._mavg(stats, period) if mavg else self._avg(stats)
        return avgs

    def get_all_averages_by_season(self, mavg=False, period=20):
        def average(data):
            if mavg:
                return self._mavg(data, period)
            return self._avg(data)

        seasons = [season for season in range(
            2015, self.get_latest_round().date.year + 1)]

        stats = {
            'strokes': 'total_strokes',
            'putts': 'total_putts',
            'gir': 'total_gir',
            'handicap': 'handicap_index',
            'par3': 'par_3_avg',
            'par4': 'par_4_avg',
            'par5': 'par_5_avg'
        }
        averages = {}
        all_stats = {}

        for season in seasons:
            rounds = self.get_season_rounds(season)
            if rounds:
                averages[season] = {}
                season_stats = {stat: [] for stat, _ in stats.items()}
                for _round in rounds:
                    season_stats['strokes'].append(_round.total_strokes)
                    season_stats['putts'].append(_round.total_putts)
                    season_stats['gir'].append(_round.total_gir)
                    season_stats['handicap'].append(_round.handicap_index)
                    season_stats['par3'].append(_round.par_3_avg)
                    season_stats['par4'].append(_round.par_4_avg)
                    season_stats['par5'].append(_round.par_5_avg)

                for stat, stats_array in season_stats.items():
                    if all_stats.get(stat):
                        all_stats[stat].extend(season_stats[stat])
                    else:
                        all_stats[stat] = season_stats[stat]

                    # if stat == 'handicap':
                    #     averages[season]['handicap'] = stats_array[-1]
                    # else:
                    #     averages[season][stat] = round(average(stats_array), 2)
                    averages[season][stat] = round(average(stats_array), 1)

        if all_stats:
            # season 2046 contains 'overall' stats, ie avg off all seasons
            # except handicap which is always the most recent handicap
            averages[2046] = {}
            averages[2046]['handicap'] = self.get_latest_handicap()
            for stat, stats_array in all_stats.items():
                if stat == 'handicap':
                    continue
                averages[2046][stat] = round(average(stats_array), 1)

        return averages

    def get_par_avgs(self, season=None, mavg=False, period=20):
        if season:
            rounds = self.get_season_rounds(season)
        else:
            rounds = self.get_rounds()

        stats = {'par3': [], 'par4': [], 'par5': []}
        for _round in rounds:
            stats['par3'].append(_round.par_3_avg)
            stats['par4'].append(_round.par_4_avg)
            stats['par5'].append(_round.par_5_avg)

        avgs = {'par3': 0, 'par4': 0, 'par5': 0}
        for key, _ in avgs.items():
            if mavg:
                avgs[key] = self._mavg(stats[key], period)
            else:
                avgs[key] = self._avg(stats[key])

        return avgs

    @staticmethod
    def _avg(stats):
        return sum(stats) / len(stats)

    @staticmethod
    def _mavg(stats, period):
        return Series(stats).ewm(period).mean().iloc[-1]

    def recalc_handicaps(self, golf_round):
        rounds = self.get_rounds()
        for _round in rounds[rounds.index(golf_round) + 1:]:
            _round.calc_handicap()

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def as_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'default_tees': self.default_tees
        }

    def __repr__(self):
        return '<User %r>' % (self.username)
