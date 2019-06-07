import React, { Component } from "react";
import styled from "styled-components";

class Character extends Component {
  state = {
    clicks: 0,
    playing: false
  };

  handleClick = () => {
    const { clicks } = this.state;

    let newClicks = clicks;
    if (clicks === 0) newClicks = 1;
    else if (clicks === 1) newClicks = 2;

    if (newClicks === 1) {
      this.player.play();
    }
  };

  render() {
    const { index, character } = this.props;
    return (
      <CharacterContainer
        className={`${character.x === 12 ? "hidden" : ""}`}
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

  &.hidden {
    visibility: hidden;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default Character;
