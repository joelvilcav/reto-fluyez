import { useState } from 'react';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled(Paper)({
  maxWidth: 300,
  margin: '0 auto',
  paddingTop: 4,
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const LoginButton = styled(Button)({
  marginTop: 2,
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/movies');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <LoginContainer elevation={3}>
      <Form>
        <Typography variant='h5' align='center'>
          Iniciar sesión
        </Typography>
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label='Contraseña'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <LoginButton variant='contained' color='primary' onClick={handleLogin}>
          Ingresar
        </LoginButton>
      </Form>
    </LoginContainer>
  );
};

export default Login;
