import React from "react";

const UpcomingTasks = ({ tasks }) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const allTasks = Object.keys(tasks)
    .map((dateKey) =>
      tasks[dateKey].map((task) => ({ ...task, dateKey }))
    )
    .flat();

  const upcomingTasks = allTasks.filter((task) => {
    const taskDate = new Date(task.dateKey);
    return taskDate >= today && taskDate <= nextWeek;
  });

  upcomingTasks.sort(
    (a, b) => new Date(a.dateKey) - new Date(b.dateKey)
  );

  if (upcomingTasks.length === 0) return <p>No events in next 7 days</p>;

  return (
    <div className="upcoming-tasks">
      <h3>Upcoming Tasks (7 days)</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {upcomingTasks.map((task, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
              padding: "6px",
              borderRadius: "4px",
              backgroundColor: task.category
                ? task.category.color + "22"
                : "#eee",
            }}
          >
            {task.category?.avatar && (
              <img
                src={task.category.avatar}
                alt={task.category.title}
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              />
            )}
            <div>
              <strong>{task.title}</strong>{" "}
              {task.category && `(${task.category.title})`}
              <div>
                {new Date(task.dateKey).toDateString()}{" "}
                {task.time && `at ${task.time}`}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingTasks;
