import React, { Component } from "react";
import JungleScene from "./JungleScene";
import styled from "styled-components";
import { shuffle } from "../../../utils";
import ChunkDesc from "../../shared/ChunkDesc";
import JungleChunk from "./JungleChunk";

import Plant1 from "./assets/fauna/plant1.jpg";
import Plant2 from "./assets/fauna/plant2.png";
import Plant3 from "./assets/fauna/plant3.png";
import Plant4 from "./assets/fauna/plant4.png";
import Plant5 from "./assets/fauna/plant5.png";
import Montsera from "./assets/fauna/montsera.png";
import Heart from "./assets/fauna/heart.png";

import Cat from "./assets/animals/cat.jpg";
import Cat2 from "./assets/animals/cat2.jpg";
import Dog from "./assets/animals/dog.jpg";
import Dog2 from "./assets/animals/dog2.jpg";
import Dog3 from "./assets/animals/dog3.jpg";
import Chicken from "./assets/animals/chicken.jpg";
import Horse from "./assets/animals/horse.jpg";
import Spider from "./assets/animals/spider.jpg";

const animals = [Cat, Cat2, Dog, Dog2, Dog3, Chicken, Horse, Spider];
const plantsArray = [
  Plant1,
  Montsera,
  Heart,
  Plant2,
  Plant3,
  Plant4,
  Plant5,
  Plant1,
  Plant2,
  Plant3
];

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
    let bg;
    if (animals.length === 1) {
      bg = animals[0];
    } else {
      animals.splice(0, 1);
      bg = animals[0];
    }

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
        <ShuffleBtn onClick={this.shuffle}>Reset</ShuffleBtn>
      </JungleChunk>,
      <ChunkDesc key="chunkdesc">
        Spread the foliage to find some wild forest animals! Uses React.
      </ChunkDesc>
    ];
  }
}

export default JungleSearch;
