/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifeShapesLayout from "./GameOfLifeShapesLayout";
import shapes from "../../shapes";
class GameOfLifeShapes extends Component {
  render() {
    const { updateSelectedShape, selectedShape } = this.props;
    // console.log(shapes);
    return (
      <GameOfLifeShapesLayout
        className={`gol__shapes gol__shapes--sidebar ${
          selectedShape === "" ? "hidden" : ""
        }`}
      >
        <span
          className={`gol__shapes--shape cancel`}
          onClick={() => updateSelectedShape("")}
          key="cancel"
        >
          Cancel
        </span>
        {Object.keys(shapes).map((shapeId, i) => (
          <span
            className={`gol__shapes--shape ${shapes[shapeId].type} ${
              selectedShape === shapeId ? "selected" : ""
            }`}
            onClick={() => updateSelectedShape(shapeId)}
            key={shapeId}
            title={`Type: ${shapes[shapeId].type}`}
          >
            {shapes[shapeId].name}
            <span>
              {shapes[shapeId].config[0].length} x{" "}
              {shapes[shapeId].config.length}
            </span>
          </span>
        ))}
      </GameOfLifeShapesLayout>
    );
  }
}

export default GameOfLifeShapes;

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
