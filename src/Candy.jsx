import React from "react";
import { resolvePosition } from "./Utils";

function Candy({ id, type, color, position, onCandyClick }) {
  return (
    <div
      className={"Candy " + type}
      onClick={() => onCandyClick({ id, color, type, position })}
      style={{ backgroundColor: color, ...resolvePosition(position, type) }}
    />
  );
}

export default Candy;
