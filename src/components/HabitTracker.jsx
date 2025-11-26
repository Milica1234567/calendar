import React, { useState } from "react";
import Habit from "./settings/Habit"
import HabitChart from "./settings/HabitChart"

function generateDaysForMonth(year, month) {
  const days = {};
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const key = `${y}-${m}-${d}`;

    days[key] = false;
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function generateDaysForCurrentMonth() {
  const today = new Date();
  return generateDaysForMonth(today.getFullYear(), today.getMonth());
}

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Reading", color: "#4caf50", days: generateDaysForCurrentMonth() },
    { id: 2, name: "Cooking", color: "#2196f3", days: generateDaysForCurrentMonth() }
  ]);

  const toggleDay = (habitId, date) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          days: {
            ...habit.days,
            [date]: !habit.days[date]
          }
        };
      }
      return habit;
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      
      {habits.map(habit => (
        <div key={habit.id} style={{ marginBottom: "40px" }}>
          <Habit habit={habit} toggleDay={toggleDay} />
          <HabitChart habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default HabitTracker;
