import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import { RoundData } from '../../../../types/rounds';

import { SelectedRoundData } from './SelectedRoundData';

const SelectedDiv = styled.div`
  background-color: #f1f5f1;
`;

const TextRight = styled.div`
  text-align: right;
`;

const roundDataKeys = [
  'date',
  'course',
  'total_strokes',
  'front_9_strokes',
  'back_9_strokes',
  'total_putts',
  'total_gir',
  'handicap_index'
];

interface PropTypes {
  roundData: RoundData;
  onClick: Function;
}

export const SelectedRound: React.FC<PropTypes> = ({ roundData, onClick }) => {
  const renderRowItem = (key: string) =>
    key === 'date' ? (
      <SelectedDiv className="col-xs-3" key={key}>
        <Moment format="YYYY-MM-DD">{roundData['date']}</Moment>
      </SelectedDiv>
    ) : key === 'course' ? (
      <SelectedDiv className="col-xs-3" key={key}>
        {roundData['course']}
      </SelectedDiv>
    ) : (
      <SelectedDiv className="col-xs-1" key={key}>
        <TextRight>{roundData[key]}</TextRight>
      </SelectedDiv>
    );

  return (
    <div onClick={() => onClick()} style={{ cursor: 'pointer' }}>
      <div className="row selected-round-row">
        {roundDataKeys.map(key => renderRowItem(key))}
      </div>
      <SelectedRoundData roundData={roundData} />
    </div>
  );
};
