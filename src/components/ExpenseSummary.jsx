

import { useEffect, useState } from 'react';
import axios from 'axios';


const ExpenseSummary = ({ expenses }) => {
  const [summary, setSummary] = useState({ total: 0 });
  
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
    
    fetchSummary();
  }, [expenses]);
  
  return (
    <div>
      <h2>Expense Summary</h2>
      <p>Total Expenses: ${summary.total}</p>
    </div>
  );
};

export default ExpenseSummary;

