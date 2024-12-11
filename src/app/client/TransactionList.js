"use client";
import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h3>Список расходов</h3>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Сумма</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.sum}</td>
                <td>{transaction.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет расходов на этот день</p>
      )}
    </div>
  );
};

export default TransactionList;
