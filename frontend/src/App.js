import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [alternatives, setAlternatives] = useState([]);

  const handleCheckAvailability = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/check_availability/', { date });
      console.log("Availability response: ", response.data);
      if (response.data.available) {
        handleSubmit();
      } else {
        setAlternatives(response.data.alternatives);
      }
    } catch (error) {
      console.error('Availability check error: ', error);
      alert('Error checking availability');
    }
  };

  const handleSubmit = async () => {
    /*e.preventDefault();*/
    const booking = { name, email, date };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', booking);
      console.log(response.data);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Booking error: ', error);
      alert('Error creating booking');
  }
};


/* return (
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
); */


return (
  <Container className="App">
    <Typography variant="h4" component="h1" gutterBottom>
      Book a Tutoring Session
    </Typography>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleCheckAvailability();
    }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        fullWidth
      />
      <TextField
        label="Date"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        required
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Check Availability
      </Button>
    </form>
    {alternatives.length > 0 && (
      <div>
        <Typography variant="h6" component="h2" gutterBottom>
          The selected time is not available. Please consider the following alternative time slots:
        </Typography>
        <ul>
          {alternatives.map((alt, index) => (
            <li key={index}>{new Date(alt).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    )}
  </Container>
  );
}


export default App;
