import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const { user, token, logout } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (token) {
      fetchItems();
    }
  }, [token]);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Inicio hecho
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home; 