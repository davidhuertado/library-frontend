import React, { useState } from 'react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';

import loginServices from './services/login.service';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log('entro login');
      const user = await loginServices.login({ username, password });
      setUser(user);
      setNotification(`${user.username} logged in`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError('invalid username or password');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  if (!user) {
    return (
      <div className="App">
        {notification ? <Notification message={notification} /> : null}
        {error ? <Notification message={error} /> : null}
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }
}

export default App;
