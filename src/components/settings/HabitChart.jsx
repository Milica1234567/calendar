import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const HabitChart = ({ habit }) => {
  const data = Object.entries(habit.days).map(([date, done]) => ({
    day: new Date(date).getDate(),
    done: done ? 1 : 0
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      

      <BarChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} domain={[0, 1]} />
        <Tooltip />
        <Bar dataKey="done" fill={habit.color} />
      </BarChart>
    </div>
  );
};

export default HabitChart;
