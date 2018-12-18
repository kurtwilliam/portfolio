import React, { Component } from "react";
import Chunk from "../../shared/Chunk";
import JungleScene from "./JungleScene";
import styled from "styled-components";
import { shuffle } from "../../../utils";

import Plant1 from "../../../assets/jungleSearch/fauna/plant1.jpg";
import Plant2 from "../../../assets/jungleSearch/fauna/plant2.png";
import Plant3 from "../../../assets/jungleSearch/fauna/plant3.png";
import Plant4 from "../../../assets/jungleSearch/fauna/plant4.png";
import Plant5 from "../../../assets/jungleSearch/fauna/plant5.png";
import Montsera from "../../../assets/jungleSearch/fauna/montsera.png";
import Heart from "../../../assets/jungleSearch/fauna/heart.png";

import Koala from "../../../assets/jungleSearch/animals/koala.jpg";
import Monkie from "../../../assets/jungleSearch/animals/monkie.jpg";
import Cat from "../../../assets/jungleSearch/animals/cat.jpg";
import Cat2 from "../../../assets/jungleSearch/animals/cat2.jpg";
import Dog from "../../../assets/jungleSearch/animals/dog.jpg";
import Dog2 from "../../../assets/jungleSearch/animals/dog2.jpg";
import Chicken from "../../../assets/jungleSearch/animals/chicken.jpg";
import Horse from "../../../assets/jungleSearch/animals/horse.jpg";
import Spider from "../../../assets/jungleSearch/animals/spider.jpg";

const animals = [Koala, Monkie, Cat, Cat2, Dog, Dog2, Chicken, Horse, Spider];
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

const JungleChunk = styled(Chunk)`
  overflow: hidden;
  background-position: center;
  background-size: cover;
`;

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
    return (
      <JungleChunk style={{ backgroundImage: `url(${bg})` }}>
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
      </JungleChunk>
    );
  }
}

export default JungleSearch;
