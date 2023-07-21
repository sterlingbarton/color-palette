import React from 'react'
import DraggableColorBox from "./DraggableColorBox";
import { ReactSortable } from "react-sortablejs";

export default function DraggableColorList({colors, setColors, handleRemoveColor}) {
    return (
        <ReactSortable
            // tag="div"
            list={colors}
            setList={setColors}
            style={{ height: "100%" }}
        >
        {colors.map((color) => (
            <DraggableColorBox
                key={color.name}
                color={color.color}
                name={color.name}
                handleRemoveColor={() => handleRemoveColor(color.name)}
            />
        ))}
        </ReactSortable>
  )
}

