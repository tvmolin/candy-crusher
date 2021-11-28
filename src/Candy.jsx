import React from "react";
import { resolvePosition } from "./Utils";

function Candy({ id, type, color, position, onCandyClick }) {
  return (
    <div
      role="Candy"
      data-testid={`Candy@${position.x}x,${position.y}y`}
      className={"Candy " + type}
      onClick={() => onCandyClick({ id, color, type, position })}
      style={{ backgroundColor: color, ...resolvePosition(position, type) }}
    />
  );
}

export default Candy;
