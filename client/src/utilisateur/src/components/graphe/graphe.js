import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './graphe.css';

const Graphe = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api'); // Use relative URL
        const nbrcatData = response.data.data.nbrcat; // Adjust the path if necessary
        console.log('Extracted Data:', nbrcatData); // Log the extracted data
        setData(nbrcatData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#212529', padding: '10px' }}>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categorieClient" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nbr_utilisatuer" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graphe;