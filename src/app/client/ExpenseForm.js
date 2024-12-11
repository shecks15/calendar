"use client";
import React, { useState } from 'react';

const ExpenseForm = ({ selectedDate, onAddTransaction  }) => {
  const [sum, setSum] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTime = selectedDate.toISOString().split('T')[0]; 

    const transaction = {
      dateTime,
      sum: parseFloat(sum),
      comment
    };

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      });
  
      if (response.ok) {
        const data = await response.json();
        onAddTransaction(data);
        setSum(''); 
        setComment('');
      } else {
        console.error('Ошибка при добавлении транзакции:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добавить расход</h3>
      <input
        type="number"
        value={sum}
        onChange={(e) => setSum(e.target.value)}
        placeholder="Сумма"
        required
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий"
      />
      
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ExpenseForm;

