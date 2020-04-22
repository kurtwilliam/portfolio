/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifeStarsLayout from "./GameOfLifeStarsLayout";
class GameOfLifeStars extends Component {
  render() {
    return (
      <GameOfLifeStarsLayout>
        <div />
      </GameOfLifeStarsLayout>
    );
  }
}

export default GameOfLifeStars;

// shapes[shapeId].config[0].length > 6 ? (
//   <span
//     className={`gol__shapes--shape ${
//       selectedShape === shapeId ? "selected" : ""
//     }`}
//     onClick={() => updateSelectedShape(shapeId)}
//     key={shapeId}
//   >
//     {shapes[shapeId].name}
//   </span>
// ) : (
//   <div
//     className={`gol__shapes--shape ${
//       selectedShape === shapeId ? "selected" : ""
//     }`}
//     key={shapeId}
//     title={shapeId}
//     onClick={() => updateSelectedShape(shapeId)}
//   >
//     {shapes[shapeId].config.map((row, rowIndex) => (
//       <div className="gol__shapes--row" key={`${shapeId}${rowIndex}`}>
//         {shapes[shapeId].config[rowIndex].map((shape, shapeIndex) => (
//           <div
//             key={`${shapeId}r${rowIndex}s${shapeIndex}`}
//             className={`gol__shapes--shape__square gol__shapes--shape__${
//               shape ? "filled" : "empty"
//             }`}
//           ></div>
//         ))}
//       </div>
//     ))}
//   </div>
// )
