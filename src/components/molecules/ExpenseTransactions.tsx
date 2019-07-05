import React from 'react';

import {
  ITransaction,
  TransactionType as TT,
} from '../../declarations/transaction';

import OutlinedButton from '../atoms/OutlinedButton';
import TransactionEntry from '../atoms/TransactionEntry';

import styled from 'styled-components';

interface IProps {
  tx: Array<ITransaction>;
  className?: string;
  fetchMore: () => void;
}

const txEntry = (t: ITransaction) => (
  <TransactionEntry hideIncomeExpenseBadge={true} key={t.id} {...t} />
);

const ExpenseTransactions: React.FC<IProps> = props => {

  const renderTransactions = () => (
    props.tx
      .filter(e => e.type === 'expense')
      .sort((t1, t2) => t1.date.getTime() - t2.date.getTime())
      .map(txEntry)
  );

  return (
    <div className={props.className}>
      <h2>Expenses</h2>
      {renderTransactions()}
      <OutlinedButton onClick={props.fetchMore}>Fetch more</OutlinedButton>
    </div>
  );
};

export default styled(ExpenseTransactions)`
  h2 {
    margin-bottom: 1em;
  }

  button {
    display: block;
    margin: 1em auto;
  }
`;
