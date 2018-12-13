import React from "react";
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
const scenes = [Plant1, Montsera, Heart, Plant2, Plant3, Plant4, Plant5];

const randomNumber = (max, min) => Math.random() * (max - min) + min;

const JungleChunk = styled(Chunk)`
  overflow: hidden;
  background-image: url(${shuffle(animals)[0]});
  background-position: center;
  background-size: cover;
`;

const JungleSearch = () => (
  <JungleChunk>
    {shuffle(scenes).map((scene, i) => {
      // Randomly generate x/y position for jungle box
      let x = randomNumber(80, -20);
      let y = randomNumber(80, -20);

      // Randomly generate width/height for jungle box
      let w = randomNumber(100, 35);
      // let h = randomNumber(100, 60);

      // Ensures top left is at least covered
      if (i < 3) {
        x = randomNumber(10, -20);
        y = randomNumber(10, -20);
        w = randomNumber(80, 50);
        // h = randomNumber(80, 50);
      }
      console.log(scene, x, y, w);
      return <JungleScene key={i} x={x} y={y} w={w} scene={scene} />;
    })}
  </JungleChunk>
);

export default JungleSearch;
