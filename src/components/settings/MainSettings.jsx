import React from "react";
import CategorySettings from "./CategorySettings";
import ColorPaletteSettings from "./ColorPaletteSettings";

import { useState } from "react";

const MainSettings = () => {
  const [categories, setCategories] = useState([]);
  return (
    <div className="settings-container">
      <div className="color-pallete-settings">
        <ColorPaletteSettings />
      </div>
      <CategorySettings categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default MainSettings;
