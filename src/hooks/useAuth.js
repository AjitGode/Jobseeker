// useAuth.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error1, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const[userId, setUserId]=useState("");

  const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    // Check if user data is available in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserType(user.userType);
      setLoggedInUser(user.username);
      setUserId(user.id)
    }
  }, []);

  // Function to handle password change

  const handleChangePassword = () => {
    if (newPassword1 !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
  

     // Prepare the payload correctly
     
     const updatedUserData = {
      password: newPassword1,
    };

    // const userId = user.id;
    console.log(userId);

    fetch(`https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      }
    )
      .then((response) => response.json())
      .then(() => {
        toast.success("Password changed successfully!");
        setShowPasswordChangePopup(false);
        setCurrentPassword("");
        setNewPassword1("");
        setConfirmNewPassword("");
      })
      .catch(() => toast.error("Error changing password"));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch("https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
      
        if (user) {
          setIsLoggedIn(true);
          setUserType(user.userType);
          setLoggedInUser(user.username);
          setUserId(user.id);
          setError("");

          // Save user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Login successful!");
        } else {
          toast.error("Invalid username or password");
        }
      })
      .catch(() => toast.error("Error fetching user data"));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setUserType("");
    setLoggedInUser("");
    setError("");

    // Clear user data from localStorage on logout
    localStorage.removeItem("user");
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
    showPasswordChangePopup,
    setShowPasswordChangePopup,
    currentPassword,
    setCurrentPassword,
    newPassword1,
    setNewPassword1,
    confirmNewPassword,
    setConfirmNewPassword,
    handleChangePassword,
    handleLogout,
  };
};
