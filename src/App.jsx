import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem('transactions')) || []
  );
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if(text.trim() === '' || amount.trim() === '') {
      alert("Please add a text and amount");
    } else {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
      };
      setTransactions([...transactions, newTransaction]);
      setText('');
      setAmount('');
      }
    };

    const removeTransaction = (id) => {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    };

    const calculateIncomeExpense = () => {
      const amounts = transactions.map((transaction) => transaction.amount);
      const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
      const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
      const expense = (
        amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
      ).toFixed(2);

      return { total, income, expense };
    };
    const { total, income, expense } = calculateIncomeExpense();

    return (
      <div className='containter'>
        <h2>Expense Tracker</h2>
        <div className="balance">
          <h4>Your Balance</h4>
          <h1>${total}</h1>
        </div>
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">+${income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">-${expense}</p>
          </div>
        </div>
        <h3>History</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
              {transaction.text}{' '}
              <span>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
              </span>
              <button onClick={() => removeTransaction(transaction.id)} className='delete-btn'>
                x
              </button>
            </li>
          ))}
        </ul>
        <h3>Add New Transaction</h3>
        <form onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input 
              type="text" 
              id='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Enter text...'
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input 
              type="number" 
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter amount...'
            />
          </div>
          <button className="btn">Add Transaction</button>
        </form>
      </div>
    )
  };


export default App;