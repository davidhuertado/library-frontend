import React, { useState } from 'react';
import LoginForm from './LoginForm';

import loginServices from './services/login.service';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [books, setBooks] = useState([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      />
    </div>
  );
}

export default App;
