import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

interface IMonthPickerProps {
  className?: string;
  month: moment.Moment;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const MonthPicker: React.FC<IMonthPickerProps> = props => {
  const decreaseMonth = () => {
    props.setState(props.month.clone().subtract(1, 'month'));
  };

  const increaseMonth = () => {
    props.setState(props.month.clone().add(1, 'month'));
  };

  return (
    <div className={props.className}>
      <h2>Month</h2>
      <h5>
        <span className={'decrease'} onClick={decreaseMonth}>
          {'<  '}
        </span>
        <span>{props.month.format('MMM YY')}</span>
        <span className={'increase'} onClick={increaseMonth}>
          {'  >'}
        </span>
      </h5>
    </div>
  );
};

export default styled(MonthPicker)`
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 95%;
  text-align: center;
  width: 10% h5 {
    font-size: 1em;
    font-weight: 400;
    padding: 7px 2px;
    background-color: ${props => props.theme.palette.background.paper};
    box-shadow: ${props => props.theme.shadow};
    border-radius: ${props => props.theme.shape.borderRadius};
  }
  .increase,
  .decrease {
    cursor: pointer;
    font-weight: bold;
  }
`;
