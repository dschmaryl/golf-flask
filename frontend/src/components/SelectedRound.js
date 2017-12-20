import React from 'react';
import Moment from 'react-moment';

const alignLeft = {textAlign: 'left'};
const alignRight = {textAlign: 'right'};
const headerLeft = {textAlign: 'left', background: "#EEE"};
const headerRight = {textAlign: 'right', background: "#EEE"};
const cursorPointer = {cursor: 'pointer'};

export function SelectedRound(props) {
  const round = props.roundData;

  function nineHoleTotal(startHole, stat) {
    return Array(9).fill().map((v, i) => {
      return round['holes'][i + startHole][stat];
    }).reduce((total, hole) => total + hole, 0);
  }

  round['front_9_par'] = nineHoleTotal(1, 'par');
  round['back_9_par'] = nineHoleTotal(10, 'par');
  round['total_par'] = round['front_9_par'] + round['back_9_par'];

  function renderTableRow(label, stat) {
    return (
      <tr>
        <td style={alignLeft}>{label}:</td>
        {Array(9).fill().map((v, i) => {
          return (
            <td style={alignRight} key={stat + '_' + (i + 1)}>
              {round['holes'][i + 1][stat]}
            </td>
          );
        })}
        <td style={alignRight}>{round['front_9_' + stat]}</td>
        {Array(9).fill().map((v, i) => {
          return (
            <td style={alignRight} key={stat + '_' + (i + 10)}>
              {round['holes'][i + 10][stat]}
            </td>
          );
        })}
        <td style={alignRight}>{round['back_9_' + stat]}</td>
        <td style={alignRight}>{round['total_' + stat]}</td>
      </tr>
    );
  }

  function renderHeaderDiv(stat, className, style) {
    return (
      <div className={className} style={style}>
        {stat}
      </div>
    );
  }

  return (
    <div onClick={props.onClick} style={cursorPointer}>
      <div className="row">
        {renderHeaderDiv(
          <Moment format="YYYY-MM-DD">{round['date']}</Moment>,
          'col-xs-2',
          headerLeft
        )}
        {renderHeaderDiv(round['course'], 'col-xs-2', headerLeft)}
        {renderHeaderDiv(round['total_strokes'], 'col-xs-1', headerRight)}
        {renderHeaderDiv(round['front_9_strokes'], 'col-xs-1', headerRight)}
        {renderHeaderDiv(round['back_9_strokes'], 'col-xs-1', headerRight)}
        {renderHeaderDiv(round['total_putts'], 'col-xs-1', headerRight)}
        {renderHeaderDiv(round['total_gir'], 'col-xs-1', headerRight)}
        {renderHeaderDiv(round['handicap_index'], 'col-xs-1', headerRight)}
      </div>

      <div className="row">
        <div className="col-xs-10">
          <table className="table" style={{width: '100%'}}>
            <thead>
              <tr>
                <th style={alignLeft}>hole:</th>
                {Array(9).fill().map((v, i) => {
                  return (
                    <th style={alignRight} key={'hole_' + (i + 1)}>
                      {i + 1}
                    </th>
                  );
                })}
                <th style={alignRight}>front</th>
                {Array(9).fill().map((v, i) => {
                  return (
                    <th style={alignRight} key={'hole_' + (i + 10)}>
                      {i + 10}
                    </th>
                  );
                })}
                <th style={alignRight}>back</th>
                <th style={alignRight}>total</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRow('par', 'par')}
              {renderTableRow('score', 'strokes')}
              {renderTableRow('putts', 'putts')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
