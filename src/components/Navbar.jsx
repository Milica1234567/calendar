import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import logo from "../assets/logo.png";

const Navbar = ({ onLogout }) => {
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [openCalendarDropdown, setOpenCalendarDropdown] = useState(false);
  const menuRef = useRef(null);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenProfileDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setOpenCalendarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/">
          <div className="logoavatar-container">
            <img src={logo} alt="" />
          </div>
          <h1>Planery.</h1>
        </Link>
      </div>

      <div className="navbar">
        <Link to="/">Dashboard</Link>
        <div className="calendar-wrapper" ref={calendarRef}>
          <p
            className="nav-calendar"
            onClick={() => setOpenCalendarDropdown(!openCalendarDropdown)}
          >
            Calendar
          </p>

          {openCalendarDropdown && (
            <div className="dropdown-calendar">
              <p onClick={() => navigate("/monthlycalendar")}>Monthly</p>
              <p onClick={() => navigate("/weeklycalendar")}>Weekly</p>
              <p onClick={() => navigate("/dailycalendar")}>Daily</p>
              
            </div>
          )}
        </div>{" "}
        <Link to="/habit-tracker">Habbit tracker</Link>
        {/* <Link to="/notes">Notes</Link> */}
      </div>

      <div className="profile-container" ref={menuRef}>
        <div
          className="profileavatar-container"
          onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
        >
          <img src={user} alt="" />
        </div>

        {openProfileDropdown && (
          <div className="dropdownProfileDropdown">
            <p onClick={() => navigate("/profile")}>Profile</p>
            <p onClick={() => navigate("/settings")}>Settings</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
