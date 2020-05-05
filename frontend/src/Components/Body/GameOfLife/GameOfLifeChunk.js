import React from "react";
import GameOfLifeChunkLayout from "./GameOfLifeChunkLayout";
import ChunkDesc from "../../shared/ChunkDesc";
import { Link } from "react-router-dom";

const GameOfLifeChunk = () => (
  <>
    <GameOfLifeChunkLayout>
      <Link
        href="https://kurtwilliam.com/hiragana"
        target="_blank"
        rel="noopener noreferrer"
      ></Link>
      <div></div>
      <div></div>
      <div></div>
    </GameOfLifeChunkLayout>
    <ChunkDesc>
      Cellular autonom based off of{" "}
      <a
        target="__blank"
        href="https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life"
      >
        John Conways Game of Life
      </a>
      . Built with React, P5.js and Styled Components.
    </ChunkDesc>
  </>
);

export default GameOfLifeChunk;
