import React, { Component } from "react";
import hiraganaChart from "../../../data/hiraganaChart";
import HiraganaContainer from "./HiraganaContainer";
import Chart from "./Chart";
import ChartRow from "./ChartRow";
import Character from "./Character";

const totalX = 12;
const totalY = 6;

console.log(hiraganaChart);

class Hiragana extends Component {
  state = {
    highlightY: null,
    highlightX: null
  };

  highlightLetters = (highlightX, highlightY) => {
    this.setState({ highlightX, highlightY });
  };

  render() {
    const { highlightX, highlightY } = this.state;
    return (
      <HiraganaContainer>
        <Chart>
          {Object.keys(hiraganaChart).map((y, i) => (
            <ChartRow key={y} className={`${i === 0 ? "hidden" : ""}`}>
              {hiraganaChart[y].map((char, index) => (
                <Character
                  key={char.x + y}
                  index={index}
                  character={char}
                  y={parseInt(y)}
                  highlightX={highlightX}
                  highlightY={highlightY}
                  highlightLetters={this.highlightLetters}
                />
              ))}
            </ChartRow>
          ))}
        </Chart>
        <p>🖱️ = 🔊</p>
        <p>🖱️🖱️ = 🖼️</p>
      </HiraganaContainer>
    );
  }
}

export default Hiragana;
