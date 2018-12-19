import React, { Component } from "react";
import JungleScene from "./JungleScene";
import styled from "styled-components";
import { shuffle, animals, plantsArray } from "../../../utils";
import ChunkDesc from "../../shared/ChunkDesc";
import JungleChunk from "./JungleChunk";

const ShuffleBtn = styled.button`
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translate(-50%, 0);
  border-radius: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  border: none;

  &:active {
  }
`;

const randomNumber = (max, min) => Math.random() * (max - min) + min;

class JungleSearch extends Component {
  state = {
    bg: shuffle(animals)[0],
    plants: shuffle(plantsArray)
  };

  shuffle = () => {
    // on click of the bg, shuffle everything!
    const bg = shuffle(animals)[0];
    const plants = shuffle(plantsArray);
    this.setState({ bg, plants });
  };

  render() {
    const { bg, plants } = this.state;
    return [
      <JungleChunk key="chunk" style={{ backgroundImage: `url(${bg})` }}>
        {plants.map((plant, i) => {
          // Randomly generate x/y position for jungle box
          let x = randomNumber(60, -20);
          let y = randomNumber(60, -20);

          // Randomly generate width for jungle box
          let w = randomNumber(100, 45);

          // Ensures top left is at least covered
          if (i < 5) {
            x = randomNumber(40, 10);
            y = randomNumber(40, 10);
            w = randomNumber(80, 50);
          }

          return <JungleScene key={i} x={x} y={y} w={w} plant={plant} />;
        })}
        <ShuffleBtn onClick={this.shuffle}>
          <span role="img" aria-label="search">
            🔍🔍
          </span>
        </ShuffleBtn>
      </JungleChunk>,
      <ChunkDesc key="chunkdesc">
        Spread the foliage to find some wild forest animals! Uses React.
      </ChunkDesc>
    ];
  }
}

export default JungleSearch;
