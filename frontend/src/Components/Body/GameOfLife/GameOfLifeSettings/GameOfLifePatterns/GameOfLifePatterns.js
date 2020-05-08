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

  shouldComponentUpdate(prevProps, prevState) {
    if (
      prevProps.types !== this.props.types ||
      this.state !== prevState ||
      prevProps.selectedPattern !== this.props.selectedPattern
    ) {
      return true;
    } else {
      return false;
    }
  }

  updateSelectedType = selectedType => this.setState({ selectedType });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  // changeDisplay = () => {
  //   const { updateState, updateSelectedPattern } = this.props;
  //   updateSelectedPattern("Dot");
  //   updateState("displayedInfo", "settings");
  // };

  render() {
    const { updateSelectedPattern, selectedPattern } = this.props;
    const { types, selectedType } = this.state;

    return (
      <>
        <GameOfLifePatternsLayout
          className={`gol__patterns ${selectedPattern === "" ? "hidden" : ""}`}
        >
          <span className="gol__patterns--title">Draw Patterns</span>

          {/*<div className="gol__patterns--settings">
          <span
            // onClick={() =>
            //   selectedType !== "all"
            //     ? this.updateSelectedType("all")
            //     : updateSelectedPattern("")
            // }
            onClick={() => this.changeDisplay()}
          >
            Draw Patterns
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
        </div>*/}
          <div className="gol__patterns--overflow">
            <div className="gol__patterns--container">
              {/* <div className="gol__patterns--pattern">
                <div className="gol__patterns--pattern__row">
                  <span>Name</span>
                  <span>Dimensions</span>
                </div>
              </div> */}
              {Object.keys(patterns).map((patternId, i) => {
                const pattern = patterns[patternId];
                const { type, name, source } = pattern;
                return selectedType === "all" || type === selectedType ? (
                  <div
                    className={`gol__patterns--pattern ${
                      selectedPattern === name ? "selected" : ""
                    }`}
                    key={name}
                    onClick={() => updateSelectedPattern(name)}
                  >
                    <div className="gol__patterns--pattern__row">
                      <span>{name}</span>
                      <span>
                        {patterns[patternId].config[0].length} x{" "}
                        {patterns[patternId].config.length}
                      </span>
                    </div>
                    <div className="gol__patterns--pattern__hidden">
                      <span>Type: {type}</span>
                      {source ? (
                        <a href={`${source}`} target="__blank">
                          Wiki Source
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </GameOfLifePatternsLayout>
      </>
    );
  }
}

export default GameOfLifePatterns;
