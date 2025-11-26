import "./App.css";
import Dashboard from "./components/Dashboard";
import HabitTracker from "./components/HabitTracker"
import MonthlyCalendar from "./components/MonthlyCalendar";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainSettings from "./components/settings/MainSettings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (justLoggedIn) {
      navigate("/"); 
      setJustLoggedIn(false); 
    }
  }, [justLoggedIn, navigate]);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setJustLoggedIn(true); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <>
      {!isLoggedIn ? (
        <Register onLogin={handleLogin} />
      ) : (
        <div className="App">
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/monthlycalendar" element={<MonthlyCalendar />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/settings" element={<MainSettings />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
