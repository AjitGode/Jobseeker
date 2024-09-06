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
  const [userId, setUserId] = useState("");
  const [lastActivity, setLastActivity] = useState(Date.now());

  const [showPasswordChangePopup, setShowPasswordChangePopup] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Check if user data is available in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(user.username);
      setUserType(user.userType);
      setLoggedInUser(user.username);
      setUserId(user.id);
      setCurrentPassword(user.password);
      setLastActivity(Date.now());
    }

    // Set up event listeners for detecting activity
    const activityHandler = () => setLastActivity(Date.now());
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Set up visibility change listener (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setLastActivity(Date.now()); // Reset the last activity when the user returns to the tab
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Auto logout after 5 minutes of inactivity
    const checkInactivity = () => {
      const currentTime = Date.now();
      if (isLoggedIn && currentTime - lastActivity > INACTIVITY_TIMEOUT) {
        handleLogout(); // Automatically log out after timeout
        toast.info("You have been logged out due to inactivity.");
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 1000); // Check every second

    return () => {
      // Clean up listeners on component unmount
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(inactivityInterval);
    };
  }, [isLoggedIn, lastActivity]);

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
          setCurrentPassword(user.password);
          setError("");

          // Save user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));
          setLastActivity(Date.now()); // Reset activity timer on login
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

  const handleChangePassword = () => {
    if (newPassword1 !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    const updatedUserData = {
      password: newPassword1,
    };

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
