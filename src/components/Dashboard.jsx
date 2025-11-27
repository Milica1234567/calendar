import React from 'react'
import UpcomingTasks from './UpComingTasks'
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  return (
    <div className='dashboard-container'>
      <UpcomingTasks tasks={tasks} />
    </div>
  )
}

export default Dashboard