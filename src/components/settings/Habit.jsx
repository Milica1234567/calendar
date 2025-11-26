import React from "react";

const Habit = ({ habit, toggleDay }) => {
  return (
    <div style={{ border: `2px solid ${habit.color}`, padding: "15px", borderRadius: "8px" }}>
      <h2>{habit.name}</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {Object.entries(habit.days).map(([date, done]) => (
          <div
            key={date}
            onClick={() => toggleDay(habit.id, date)}
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: done ? habit.color : "#eee",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "12px",
              color: done ? "white" : "black",
              transition: "0.2s"
            }}
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Habit;
