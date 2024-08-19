

import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import ExpenseSummary from '../components/ExpenseSummary.jsx';
import Visualization from '../components/Visualization.jsx';
import Auth from '../components/Auth.jsx';

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://expensetrackerserver-w3dy.onrender.com/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <Auth />
      <ExpenseForm onExpenseAdded={handleExpenseAdded} /> 
      <ExpenseList expenses={expenses} />
      <ExpenseSummary expenses={expenses} />
      <Visualization />
    </div>
  );
};

export default Home;
