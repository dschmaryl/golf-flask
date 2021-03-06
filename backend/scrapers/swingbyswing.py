from datetime import datetime
from bs4 import BeautifulSoup
import requests

from backend.dates import date_to_str


def fetch_course(url):
    try:
        source = requests.get(url)
    except requests.exceptions.MissingSchema:
        return {'error': 'bad url'}

    if source.text.find('Front Nine') == -1:
        return {'error': 'course not found'}

    html = BeautifulSoup(source.text, 'html.parser')
    secs = [s for s in html.select('section')
            if s['class'][0] == 'hole-set-scorecard-container']

    return {'data': [
        d.strip()
        for d in secs[0].text.split('\n') + secs[1].text.split('\n')
        if d.strip() != ''
    ]}


def extract_course_data(raw_data):
    data = {'blue': {}, 'white': {}, 'red': {}}
    tee_indices = {'blue': 15, 'white': 49, 'red': 83}

    for tee, i in tee_indices.items():
        data[tee]['name'] = tee
        data[tee]['color'] = tee
        data[tee]['gender'] = 'f' if tee == 'red' else 'm'
        data[tee]['date'] = date_to_str(datetime.now())
        data[tee]['rating'] = float(raw_data[i+11])
        data[tee]['slope'] = int(raw_data[i+10])
        data[tee]['holes'] = {}
        for j in range(9):
            data[tee]['holes'][j+1] = {}
            data[tee]['holes'][j+1]['yardage'] = raw_data[i+j]
            data[tee]['holes'][j+1]['par'] = raw_data[i+j+13]
            data[tee]['holes'][j+1]['handicap'] = raw_data[i+j+24]
            data[tee]['holes'][j+10] = {}
            data[tee]['holes'][j+10]['yardage'] = raw_data[i+j+116]
            data[tee]['holes'][j+10]['par'] = raw_data[i+j+129]
            data[tee]['holes'][j+10]['handicap'] = raw_data[i+j+140]

    return data
