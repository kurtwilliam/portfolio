/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifeShapesLayout from "./GameOfLifeShapesLayout";
import shapes from "../../shapes";
class GameOfLifeShapes extends Component {
  state = {
    selectedType: "all",
    types: []
  };
  componentDidMount() {
    let types = [];
    types[0] = "all";
    for (let i = 0; i < shapes.length; i++) {
      if (types.indexOf(shapes[i].type) === -1) {
        types.push(shapes[i].type);
      }
    }
    this.setState({ types });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { updateSelectedShape, selectedShape } = this.props;
    const { types, selectedType } = this.state;

    return (
      <GameOfLifeShapesLayout
        className={`gol__shapes gol__shapes--sidebar ${
          selectedShape === "" ? "hidden" : ""
        }`}
      >
        <span className={`gol__shapes--shape cancel`} key="cancel">
          <span onClick={() => updateSelectedShape("")}>{"<"}</span>
          <select
            className={`gol__shapes--type`}
            onChange={this.handleChange}
            value={selectedType}
            name="selectedType"
          >
            {types.map((type, i) => (
              <option
                value={type}
                key={type}
                className={`gol__shapes--type__${type}`}
              >
                {type}
              </option>
            ))}
          </select>
        </span>
        {Object.keys(shapes).map((shapeId, i) =>
          selectedType === "all" || shapes[shapeId].type === selectedType ? (
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
          ) : null
        )}
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
