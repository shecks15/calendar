"use client";
import React, { useState, useEffect } from 'react';
import CalendarComponent from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import ExpenseForm from './ExpenseForm'; 
import TransactionList from './TransactionList';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions'); 
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayStr = date.toISOString().split('T')[0]; 
      return transactions.some(transaction => transaction.dateTime.startsWith(dayStr)) ? 'highlight' : '';
    }
    return '';
  };

  const handleDayClick = (date) => {
    setDate(date);
    const dayStr = date.toISOString().split('T')[0]; 
    const dayTransactions = transactions.filter(transaction => transaction.dateTime.startsWith(dayStr)); 
    setFilteredTransactions(dayTransactions); 
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prevTransactions => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      const dayStr = date.toISOString().split('T')[0];
      const dayTransactions = updatedTransactions.filter(transaction => transaction.dateTime.startsWith(dayStr));
      setFilteredTransactions(dayTransactions); 
      return updatedTransactions;
    });
  };

  return (
    <div className="calendar-container">
      <CalendarComponent
        onChange={setDate}
        value={date}
        tileClassName={getTileClassName}
        onClickDay={handleDayClick}
      />
      <ExpenseForm selectedDate={date} onAddTransaction={handleAddTransaction}/>
      <TransactionList  transactions={filteredTransactions}/>
    </div>
  );
};

export default Calendar;

