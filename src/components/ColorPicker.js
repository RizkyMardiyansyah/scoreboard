// ColorPicker.js
import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        {showColorPicker ? "Close Color Picker" : "Change Secondary Color"}
      </button>

      {showColorPicker && (
        <ChromePicker
          color={selectedColor}
          onChange={(color) => onColorChange(color.hex)}
        />
      )}
    </div>
  );
};

export default ColorPicker;
