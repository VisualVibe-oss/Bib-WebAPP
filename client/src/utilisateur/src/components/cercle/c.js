import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './c.css'; // Import your CSS file

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api'); // Assuming you have an endpoint for user state data
        const userStateData = response.data.data.userparetat; // Access the data from the response
        setData(userStateData);
      } catch (error) {
        console.error('Error fetching user state data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <div className="pie-chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="nbr_user" 
              label={({ etatClient }) => etatClient}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['red','#00C49F'  ][index]} /> 
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartComponent;