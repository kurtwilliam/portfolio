import React, { Component } from "react";
import styled from "styled-components";

class Character extends Component {
  state = {
    clicks: 0,
    playing: false,
    word: false
  };

  handleClick = () => {
    const { clicks } = this.state;
    const { highlightLetters, y, character } = this.props;
    const { x, char, words } = character;

    if (x === 12 || y === 1 || char === null) return;

    let newClicks = clicks;
    if (clicks === 0) newClicks = 1;
    else if (clicks === 1) newClicks = 2;

    if (newClicks === 1) {
      this.player.play();
    } else if (newClicks === 2) {
      this.openWordOverlay(words, char);
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

  openWordOverlay = (words, char) => {
    const { openWordOverlay } = this.props;
    // get random word from array to display
    const word = words[Math.floor(Math.random() * words.length)];

    openWordOverlay(word, char);
  };

  render() {
    const { index, character, y, highlightY, highlightX } = this.props;
    const { x } = character;
    const { playing } = this.state;

    return (
      <CharacterContainer
        className={`character ${character.x === 12 ? "hidden" : ""} ${
          playing ? "highlight" : ""
        } ${
          (x === 12 && highlightY === y) || (y === 1 && highlightX === x)
            ? "highlight"
            : ""
        }`}
        onClick={e => this.handleClick(character)}
      >
        {character.char}
        <audio
          src={character.audio[0] ? character.audio[0] : null}
          ref={ref => (this.player = ref)}
        />
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
