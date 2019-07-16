import {storiesOf} from '@storybook/react';
import moment from 'moment';
import React from 'react';
import GlobalWrapper from '../helpers/GlobalWrapper';

import BalancesCalendarEntry from '../components/atoms/BalancesCalendarEntry';
import BalancesCalendar from '../components/molecules/BalancesCalendar';
import { IBalanceEntry } from '../declarations/balanceEntries';

const entry: IBalanceEntry = {
  date: '2019-06-05',
  expense: 200000,
  income: 200000,
  liquidity: 18000000,
};

const entries: Array<IBalanceEntry> = (new Array(13).fill(0)).map((e, i) => ({
  date: `2019-06-${String(i + 1).padStart(2, '0')}`,
  expense: 200000,
  income: 200000,
  liquidity: 18000000,
}));

const month = moment('2019-06-01');

const divStyle = {
  width: '150px',
};

storiesOf('CalendarEntry', module)
  .add('CalendarEntry', () => (
    <GlobalWrapper>
      <div style={divStyle}>
        <BalancesCalendarEntry className={'test'} entry={entry} date={'2019-06-05'} />
      </div>
    </GlobalWrapper>
  ));

storiesOf('Calendar', module)
  .add('BalancesCalendar', () => (
    <GlobalWrapper>
      <BalancesCalendar month={month} entries={entries}/>
    </GlobalWrapper>
  ));