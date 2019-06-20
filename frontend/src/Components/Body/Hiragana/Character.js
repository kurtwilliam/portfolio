import React, { Component } from "react";
import styled from "styled-components";
import words from "../../../data/words";

class Character extends Component {
  state = {
    clicks: 0,
    playing: false,
    word: false,
    words: []
  };

  componentDidMount = () => {
    const { character } = this.props;
    const { char } = character;

    if (!char) return;

    // get all words and push it to local state by key
    let newWords = [];
    for (let key in words) {
      const currentWord = key;
      const currentWordSplit = currentWord.split("");
      for (let i = 0; i < currentWordSplit.length; i++) {
        if (currentWordSplit[i] === char) {
          newWords.push(currentWord);
          break;
        }
      }
    }

    this.setState({ words: newWords });
  };

  handleClick = () => {
    const { clicks } = this.state;
    const {
      highlightLetters,
      y,
      character,
      addNewSound,
      lastColumn
    } = this.props;
    const { x, char } = character;

    if (x === lastColumn || y === 1 || char === null) return;

    let newClicks = clicks;
    if (clicks === 0) newClicks = 1;
    else if (clicks === 1) newClicks = 2;

    if (newClicks === 1) {
      addNewSound(null, character.audio[0]);
    } else if (newClicks === 2) {
      this.openWordOverlay(char);
    }

    this.setState({ playing: true, clicks: newClicks });
    highlightLetters(character.x, y);
    setTimeout(() => {
      return this.stopPlaying();
    }, 300);
  };

  stopPlaying = () => {
    this.props.highlightLetters(null, null);
    this.setState({ playing: false, clicks: 0 });
  };

  openWordOverlay = char => {
    const { openWordOverlay } = this.props;
    const { words } = this.state;
    // get random word from array to display
    const word = words[Math.floor(Math.random() * words.length)];

    openWordOverlay(word, char);
  };

  render() {
    const { character, y, highlightY, highlightX, lastColumn } = this.props;
    const { x } = character;
    const { playing } = this.state;

    return (
      <CharacterContainer
        className={`character ${character.x === lastColumn ? "hidden" : ""} ${
          playing ? "highlight" : ""
        } ${
          (x === lastColumn && highlightY === y) ||
          (y === 1 && highlightX === x)
            ? "highlight"
            : ""
        }`}
        onClick={e => this.handleClick(character)}
      >
        {character.char}
      </CharacterContainer>
    );
  }
}

const CharacterContainer = styled.div`
  padding: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  width: calc(100% / 12);
  transition: all 30ms;
  cursor: pointer;

  &.hidden {
    border: none;
    color: lightgrey;
  }

  &.hiddenOverride {
    color: black;
  }

  &.highlight {
    background: lightgrey;
  }
  &.highlight.hidden {
    background: rgba(0, 0, 0, 0);
    color: black;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default Character;
