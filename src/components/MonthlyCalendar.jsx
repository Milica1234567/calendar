import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import InsertTaskModal from "./InsertTaskModal";

const MonthlyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addIdToTask = (t) => {
    if (!t.id) return { ...t, id: Date.now() + Math.random() };
    return t;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleSaveTask = (task) => {
    const t = addIdToTask(task);
    const dateKey = t.date.toDateString();

    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey] ? [...prev[dateKey], t] : [t],
    }));
  };

  const handleUpdateTask = (updatedTask) => {
    const { dateKey, index } = updatedTask;

    setTasks((prev) => {
      const updatedList = [...prev[dateKey]];
      updatedList[index] = updatedTask;
      return {
        ...prev,
        [dateKey]: updatedList,
      };
    });
  };

  const handleDeleteTask = (dateKey, index) => {
    setTasks((prev) => {
      const updatedList = prev[dateKey].filter((_, i) => i !== index);
      return {
        ...prev,
        [dateKey]: updatedList,
      };
    });
    setModalOpen(false);
  };

  const handleDrop = (e, newDate) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("task"));
      const { task, fromDate, index } = data;
      const newDateKey = newDate.toDateString();

      setTasks((prev) => {
        const updated = { ...prev };

        if (updated[fromDate]) {
          updated[fromDate] = updated[fromDate].filter((_, i) => i !== index);
          if (updated[fromDate].length === 0) delete updated[fromDate];
        }

        if (!updated[newDateKey]) updated[newDateKey] = [];
        updated[newDateKey].push(task);

        return updated;
      });
    } catch (err) {
      console.error("drop parse error:", err);
    }
  };

  return (
    <div className="monthly-calendar">
      <Calendar
        onClickDay={handleDayClick}
        tileContent={({ date, view }) => {
          return (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, date)}
              style={{ width: "100%", height: "100%" }}
            >
              {view === "month" && tasks[date.toDateString()] && (
                <ul
                  className="task-show"
                  style={{ padding: 0, margin: 0, listStyle: "none" }}
                >
                  {tasks[date.toDateString()].map((task, i) => (
                    <li
                      key={task.id ?? i}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        e.dataTransfer.setData(
                          "task",
                          JSON.stringify({
                            task,
                            fromDate: date.toDateString(),
                            index: i,
                          })
                        );
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask({
                          ...task,
                          index: i,
                          dateKey: date.toDateString(),
                        });
                        setSelectedDate(date);
                        setModalOpen(true);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        margin: "2px",
                        backgroundColor: task.category
                          ? task.category.color + "22"
                          : "transparent",
                        border: "1px solid",
                        borderColor: task.category?.color || "#ddd",
                        borderRadius: "8px",
                        padding: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {task.category?.avatar && (
                        <img
                          src={task.category.avatar}
                          alt={task.category.title}
                          style={{ width: 20, height: 20, borderRadius: "50%" }}
                        />
                      )}

                      {task.time && <span>{task.time}</span>}
                      <p style={{ margin: 0, color: task.category?.color }}>
                        {task.title}
                      </p>

                      {task.category && (
                        <span
                          style={{
                            opacity: 0.7,
                            color: task.category.color,
                            marginLeft: "6px",
                          }}
                        >
                          ({task.category.title})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />

      {modalOpen && (
        <InsertTaskModal
          date={selectedDate}
          editingTask={editingTask}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default MonthlyCalendar;
