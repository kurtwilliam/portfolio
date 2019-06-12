import React, { Component, Fragment } from "react";
import hiraganaChart from "../../../data/hiraganaChart";
import words from "../../../data/words";
import HiraganaContainer from "./HiraganaContainer";
import HiraganaOverlay from "./HiraganaOverlay";
import Chart from "./Chart";
import ChartRow from "./ChartRow";
import Character from "./Character";

class Hiragana extends Component {
  state = {
    highlightY: null,
    highlightX: null,
    word: "",
    splitWord: [],
    currentCharacter: "",
    english: false
  };

  highlightLetters = (highlightX, highlightY) => {
    this.setState({ highlightX, highlightY });
  };

  openWordOverlay = (word, char) => {
    if (!word) return;
    const splitWord = word.split("");
    this.setState({ word, splitWord, currentCharacter: char });
  };

  closeWordOverlay = e => {
    e.stopPropagation();
    this.setState({ word: "", splitWord: [] });
  };

  sayWord = e => {
    e.stopPropagation();

    // get audio file from word
    // set state of audio playing to true
    // set timeout to stop

    // this.setState()
  };

  toggleEnglish = e => {
    e.stopPropagation();
    this.setState(prevState => ({ english: !prevState.english }));
  };

  render() {
    const {
      highlightX,
      highlightY,
      word,
      splitWord,
      currentCharacter,
      english
    } = this.state;
    return (
      <Fragment>
        {word.length > 0 ? (
          <HiraganaOverlay onClick={this.closeWordOverlay}>
            <div className="hiraganaOverlay__content" onClick={this.sayWord}>
              {words[word].content}
            </div>
            <div className="hiraganaOverlay__word" onClick={this.toggleEnglish}>
              {splitWord.map((char, i) => {
                console.log(char);
                console.log(currentCharacter);
                return (
                  <p
                    key={char + i}
                    className={`${
                      char === currentCharacter ? "highlight" : ""
                    }`}
                  >
                    {english ? words[word].eng : char}
                  </p>
                );
              })}
            </div>
          </HiraganaOverlay>
        ) : null}

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
                    openWordOverlay={this.openWordOverlay}
                  />
                ))}
              </ChartRow>
            ))}
          </Chart>
          <p>🖱️ = 🔊</p>
          <p>🖱️🖱️ = 🖼️</p>
        </HiraganaContainer>
      </Fragment>
    );
  }
}

export default Hiragana;
