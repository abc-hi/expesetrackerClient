

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const categories = ['Food', 'Transport', 'Entertainment', 'Other'];

const ExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://expensetrackerserver-w3dy.onrender.com/api/expenses', { amount, category, date, description });
      if (onExpenseAdded) {
        onExpenseAdded(response.data); 
      }
     
      setAmount('');
      setCategory(categories[0]);
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setSuccess(true);
      setError('');
    } catch (error) {
      console.error('Failed to add expense:', error);
      setError('Failed to add expense. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

ExpenseForm.propTypes = {
  onExpenseAdded: PropTypes.func.isRequired,
};

export default ExpenseForm;

