import { useState, useEffect } from "react";
import AvatarDropdown from "./AvatarDropdown";
import defaultAvatar from "../../assets/avatars/defaultAvatar.png";

const CategorySettings = () => {
  const [categories, setCategories] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [colors, setColors] = useState([]);
  const [savedPalette, setSelectedPalette] = useState("");
  const [color, setColor] = useState("");
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [newAvatar, setNewAvatar] = useState(defaultAvatar);

  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem("colors") || "[]");
    const savedPalette = localStorage.getItem("selectedPalette") || "";
    setSelectedPalette(savedPalette);
    setColors(Array.isArray(savedColors) ? savedColors : []);
  }, []);

  useEffect(() => {
    const updateColors = () => {
      const savedColors = JSON.parse(localStorage.getItem("colors") || "[]");
      setColors(Array.isArray(savedColors) ? savedColors : []);
      setColor("");
    };
    updateColors();
    window.addEventListener("paletteChanged", updateColors);
    return () => window.removeEventListener("paletteChanged", updateColors);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    const updateColorsFromPalette = () => {
      const savedColors = JSON.parse(localStorage.getItem("colors") || "[]");
      setColors(savedColors);
    };

    window.addEventListener("paletteChanged", updateColorsFromPalette);

    return () =>
      window.removeEventListener("paletteChanged", updateColorsFromPalette);
  }, []);

  const handleAvatarSelect = (index, avatar) => {
    const updated = [...categories];
    updated[index].avatar = avatar;
    setCategories(updated);
  };

  const addCategory = () => {
    if (!newTitle.trim()) return;
    if (categories.some((cat) => cat.title === newTitle.trim())) return;

    const newCategory = {
      title: newTitle.trim(),
      color: color || "#aabbcc",
      avatar: newAvatar || defaultAvatar,
    };

    setCategories([...categories, newCategory]);
    setNewTitle("");
    setNewAvatar(defaultAvatar);
    setColor("");
  };

  const removeCategory = (title) => {
    setCategories(categories.filter((cat) => cat.title !== title));
  };

  const handleColorChange = () => {};

  return (
    <div className="category-settings">
      <h3>Customize Categories</h3>

      <div className="category-input">
        <input
          type="text"
          placeholder="New category"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <AvatarDropdown selectedAvatar={newAvatar} onSelect={setNewAvatar} />
      <p style={{ color: "rgb(130, 128, 121)" }}>Choose color</p>
      <div style={{ position: "relative", width: 100, marginBottom: 20 }}>
        <div
          onClick={() => setOpenColorPicker(!openColorPicker)}
          style={{
            height: 20,
            width: 30,
            border: "1px solid #000",
            backgroundColor: color || "#fff",
            cursor: "pointer",
          }}
        ></div>

        {openColorPicker && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              display: "flex",
              gap: 5,
              padding: 5,
              background: "#fff",
              zIndex: 10,
            }}
          >
            {colors.map((c, i) => (
              <div
                key={i}
                onClick={() => {
                  setColor(c);
                  setOpenColorPicker(false);
                }}
                style={{
                  backgroundColor: c,
                  width: 30,
                  height: 20,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <button className="main-button" onClick={addCategory}>Add Category</button>

      <ul>
        {categories.map((cat, i) => (
          <li
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div style={{}}>
              <img
                src={cat.avatar}
                alt=""
                style={{ width: 24, height: 24, borderRadius: "50%" }}
              />
            </div>
            {cat.title}{" "}
            <button onClick={() => removeCategory(cat.title)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySettings;
