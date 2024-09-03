// useAuth.js
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error1, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    // Check if user data is available in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserType(user.userType);
      setLoggedInUser(user.username);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/users')
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          setIsLoggedIn(true);
          setUserType(user.userType);
          setLoggedInUser(user.username);
          setError('');

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful!');
        } else {
          toast.error('Invalid username or password');

        }
      })
      .catch(() => toast.error('Error fetching user data'));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserType('');
    setLoggedInUser('');
    setError('');

      // Clear user data from localStorage on logout
      localStorage.removeItem('user');


  };

 
  return {
    isLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
    userType,
    error1,
    loggedInUser,
    handleLogin,
    handleLogout,
  };
};
