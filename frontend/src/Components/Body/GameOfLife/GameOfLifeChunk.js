import React from "react";
import GameOfLifeChunkLayout from "./GameOfLifeChunkLayout";
import ChunkDesc from "../../shared/ChunkDesc";

import GolThumb from "../../../assets/GameOfLife/GolThumbs.png";

const GameOfLifeChunk = () => (
  <>
    <GameOfLifeChunkLayout>
      <a
        href="https://ethicsgradient.co/bc"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
      <img src={GolThumb} />
    </GameOfLifeChunkLayout>
    <ChunkDesc>
      Cellular autonom based off of{" "}
      <a
        target="__blank"
        href="https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life"
      >
        John Conways Game of Life
      </a>
      . (External link, Desktop only)
      <span className="skills">React, P5.js, Styled Components.</span>
    </ChunkDesc>
  </>
);

export default GameOfLifeChunk;
