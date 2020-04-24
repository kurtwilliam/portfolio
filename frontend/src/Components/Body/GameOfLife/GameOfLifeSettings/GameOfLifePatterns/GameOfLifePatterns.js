/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifePatternsLayout from "./GameOfLifePatternsLayout";
import patterns from "../../patterns";
class GameOfLifePatterns extends Component {
  state = {
    selectedType: "all",
    types: []
  };
  componentDidMount() {
    let types = [];
    types[0] = "all";
    for (let i = 0; i < patterns.length; i++) {
      if (types.indexOf(patterns[i].type) === -1) {
        types.push(patterns[i].type);
      }
    }
    this.setState({ types });
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps.types !== this.props.types) {
      return true;
    } else {
      return false;
    }
  }

  updateSelectedType = selectedType => this.setState({ selectedType });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  changeDisplay = () => {
    const { updateDisplayedInfo, updateSelectedPattern } = this.props;
    updateSelectedPattern("");
    updateDisplayedInfo("settings");
  };

  render() {
    const { updateSelectedPattern, selectedPattern } = this.props;
    const { types, selectedType } = this.state;

    return (
      <GameOfLifePatternsLayout
        className={`gol__patterns ${selectedPattern === "" ? "hidden" : ""}`}
      >
        <div className="gol__patterns--settings">
          <span
            // onClick={() =>
            //   selectedType !== "all"
            //     ? this.updateSelectedType("all")
            //     : updateSelectedPattern("")
            // }
            onClick={() => this.changeDisplay()}
          >
            Back
          </span>
          <select
            className={`gol__patterns--type`}
            onChange={this.handleChange}
            value={selectedType}
            name="selectedType"
          >
            {types.map((type, i) => (
              <option
                value={type}
                key={type}
                className={`gol__patterns--type__${type}`}
              >
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="gol__patterns--container">
          {Object.keys(patterns).map((patternId, i) =>
            selectedType === "all" ||
            patterns[patternId].type === selectedType ? (
              <span
                className={`gol__patterns--pattern ${
                  patterns[patternId].type
                } ${selectedPattern === patternId ? "selected" : ""}`}
                onClick={() => updateSelectedPattern(patternId)}
                key={patternId}
                title={`Type: ${patterns[patternId].type} , Name: ${patterns[patternId].name}`}
              >
                {patterns[patternId].config.map((row, rowIndex) => (
                  <div className={`gol__patterns--pattern__row`} key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <div
                        className={`gol__patterns--pattern__col ${
                          col ? "alive" : null
                        }`}
                        key={`${rowIndex},${colIndex}`}
                      />
                    ))}
                  </div>
                ))}
              </span>
            ) : // <span
            //   className={`gol__patterns--pattern ${
            //     patterns[patternId].type
            //   } ${selectedPattern === patternId ? "selected" : ""}`}
            //   onClick={() => updateSelectedPattern(patternId)}
            //   key={patternId}
            //   title={`Type: ${patterns[patternId].type}`}
            // >
            //   {patterns[patternId].name}
            //   <span>
            //     {patterns[patternId].config[0].length} x{" "}
            //     {patterns[patternId].config.length}
            //   </span>
            // </span>
            null
          )}
        </div>
      </GameOfLifePatternsLayout>
    );
  }
}

export default GameOfLifePatterns;
