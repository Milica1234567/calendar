import { useState, useEffect } from "react";

const colorPalettes = {
  Pastel: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E0BBE4"],
  Vibrant: ["#FF6B6B", "#F7B32B", "#6BCB77", "#4D96FF", "#9B5DE5", "#FF8FAB"],
  Productivity: [
    "#264653",
    "#2A9D8F",
    "#E9C46A",
    "#F4A261",
    "#E76F51",
    "#8AB17D",
  ],
};

export default function ColorPaletteSettings() {
  const [selectedPalette, setSelectedPalette] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const savedColors = localStorage.getItem("colors");
    const savedPalette = localStorage.getItem("selectedPalette");
    if (savedColors && savedPalette) {
      setColors(JSON.parse(savedColors));
      setSelectedPalette(savedPalette);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
    localStorage.setItem("selectedPalette", selectedPalette);
    window.dispatchEvent(new Event("paletteChanged")); // obavesti druge komponente
  }, [colors, selectedPalette]);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
    localStorage.setItem("selectedPalette", selectedPalette);
    window.dispatchEvent(new Event("paletteChanged"));
  }, [colors, selectedPalette]);

  const handlePaletteChange = (paletteName) => {
    setSelectedPalette(paletteName);
    if (paletteName) {
      setColors(colorPalettes[paletteName]);
    } else {
      setColors([]);
    }
  };

  return (
    <div className="color-palette-selector">
      <h3>Customize Paltte</h3>
      <select 
        value={selectedPalette}
        onChange={(e) => handlePaletteChange(e.target.value)}
      >
        <option value="">Izaberi paletu</option>
        {Object.keys(colorPalettes).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {colors.length > 0 &&
        selectedPalette &&
        colorPalettes[selectedPalette] && (
          <div className="pallete-preview">
            {colors.map((c, i) => (
              <div
              className="individual-color"
                key={i}
                style={{ backgroundColor: c }}
              ></div>
            ))}
          </div>
        )}
    </div>
  );
}
