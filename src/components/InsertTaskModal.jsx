import React, { useState, useEffect } from "react";

const InsertTaskModal = ({ date, onClose, onSave, editingTask, onUpdate, onDelete }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setTime(editingTask.time);
      setCategory(editingTask.category?.title || "");
    }
  }, [editingTask]);

  const handleSave = () => {
    const categoryObj = categories.find((c) => c.title === category);

    onSave({
      date,
      title,
      time,
      category: categoryObj || null,
    });

    onClose();
  };

  const handleUpdate = () => {
    const categoryObj = categories.find((c) => c.title === category);

    onUpdate({
      ...editingTask,
      title,
      time,
      category: categoryObj || null,
    });

    onClose();
  };

  return (
    <div className="modal-overlay-insert-task" onClick={onClose}>
      <div
        className="modal-content-insert-task"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
            Zatvori
          </button>
        <h3>
          {editingTask ? "Update event" : "Add event"} — {date.toDateString()}
        </h3>

        <input
          type="text"
          placeholder="Event"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>

          {categories.map((cat, i) => (
            <option key={i} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          {!editingTask && (
            <button onClick={handleSave}>Save</button>
          )}

          {editingTask && (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button
                style={{ background: "red", color: "white" }}
                onClick={() => onDelete(editingTask.dateKey, editingTask.index)}
              >
                Delete
              </button>
            </>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default InsertTaskModal;
