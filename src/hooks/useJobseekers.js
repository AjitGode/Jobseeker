// useJobseekers.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useJobseekers = (isLoggedIn) => {
  const [jobseekers, setJobseekers] = useState([]);
  const [showAddJobseeker, setShowAddJobseeker] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newExp, setNewExp] = useState("");
  const [modalError, setModalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserType, setNewUserType] = useState("");
  const [error, setError] = useState("");
  const [filteredJobseekers, setFilteredJobseekers] = useState([]);
  const [experienceRange, setExperienceRange] = useState([0, 50]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isLoading, setIsLoading] = useState(false); // Loading state


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true); // Start loading
      fetch(
        "https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/jobseekers"
      )
        .then((response) => response.json())
        .then((data) => {
          setJobseekers(data);
          setFilteredJobseekers(data); // Initialize filtered list
          setIsLoading(false); // Stop loading
        })
        .catch((error) => {
          setIsLoading(false); // Stop loading on error
          toast.error("Failed to load jobseekers");
        });
    }
  }, [isLoggedIn]);

  // Pagination logic
  const indexOfLastJobseeker = currentPage * itemsPerPage;
  const indexOfFirstJobseeker = indexOfLastJobseeker - itemsPerPage;
  const currentJobseekers = filteredJobseekers.slice(
    indexOfFirstJobseeker,
    indexOfLastJobseeker
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExperienceFilter = (minExperience, maxExperience) => {
    setExperienceRange([minExperience, maxExperience]);
    const filteredJobseekers = jobseekers.filter((jobseeker) => {
      const experience = parseInt(jobseeker.Exp);
      return experience >= minExperience && experience <= maxExperience;
    });
    setFilteredJobseekers(filteredJobseekers);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredJobseekers = jobseekers.filter((jobseeker) => {
      const searchLower = query.toLowerCase();
      return (
        jobseeker.name.toLowerCase().includes(searchLower) ||
        jobseeker.role.toLowerCase().includes(searchLower)
      );
    });
    setFilteredJobseekers(filteredJobseekers);
    setCurrentPage(1); // Reset to the first page
  };

  // Handler for the to add new jobseeker;

  const handleAddJobseeker = (e) => {
    e.preventDefault();

    if (!newImage || !newName || !newRole || !newExp) {
      toast.error("All fields are required");
      return;
    }

    const newJobseeker = {
      img: newImage,
      name: newName,
      role: newRole,
      Exp: newExp,
    };

    fetch(
      "https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/jobseekers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobseeker),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.success("Jobseeker registered successfully!");
        setJobseekers([...jobseekers, data]);
        setNewImage("");
        setNewName("");
        setNewRole("");
        setNewExp("");
      })
      .catch(() => toast.error("Error adding jobseeker"));
  };

  // for user register handler

  const handleRegister = (e) => {
    e.preventDefault();

    if (!newUsername || !newPassword || !newUserType) {
      toast.error("All fields are required");
      return;
    }

    const newUser = {
      username: newUsername,
      password: newPassword,
      userType: newUserType,
    };

    fetch("https://66cecbbc901aab24841f95e1.mockapi.io/api/jobseekers/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("User registered successfully!");
        setNewUsername("");
        setNewPassword("");
        setNewUserType("");
      })
      .catch(() => toast.error("Error registering user"));
  };

  return {
    jobseekers,
    showAddJobseeker,
    setShowAddJobseeker,
    newImage,
    setNewImage,
    newName,
    setNewName,
    newRole,
    setNewRole,
    newExp,
    setNewExp,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    newUserType,
    setNewUserType,
    modalError,
    successMessage,
    setSuccessMessage,
    isRegistering,
    error,
    setError,
    setIsRegistering,
    handleAddJobseeker,
    handleRegister,
    filteredJobseekers,
    experienceRange,
    handleExperienceFilter,
    searchQuery,
    handleSearch,
    isLoading,
    currentJobseekers,
    paginate,
    currentPage,
    itemsPerPage,
  };
};
