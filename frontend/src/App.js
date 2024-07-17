import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const booking = { name, email, date };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', booking);
      console.log(response.data);
      alert('Booking created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating booking');
  }
};

return (
  <div className="App">
    <h1>Book a tutoring session</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:  </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
      </div>
      <div>
        <label>Email:  </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div>
        <label>Date:  </label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required/>
      </div>
      <button type="submit">Book</button>
    </form>
  </div>
);
}

export default App;
