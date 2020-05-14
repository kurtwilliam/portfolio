import React from "react";
import GameOfLifeChunkLayout from "./GameOfLifeChunkLayout";
import ChunkDesc from "../../shared/ChunkDesc";
import { Link } from "react-router-dom";

import LogoGerm from "../GameOfLife/assets/LogoGerm";
import LogoGermBig from "../GameOfLife/assets/LogoGermBig";
import Logo from "../../../assets/GameOfLife/BacterialColony.png";

const GameOfLifeChunk = () => (
  <>
    <GameOfLifeChunkLayout>
      <Link
        href="https://kurtwilliam.com/bc"
        target="_blank"
        rel="noopener noreferrer"
      ></Link>
      <div className="logo">
        <img src={Logo} />
        <LogoGerm />
        <LogoGermBig />
      </div>

      <div className="gol__bg">
        <div className="gol__bg--rectContTop">
          <div className="gol__bg--longRect"></div>
          <div className="gol__bg--longRect"></div>
          <div className="gol__bg--longRect"></div>
          <div className="gol__bg--longRect"></div>
          <div className="gol__bg--longRect"></div>
        </div>
        <div className="gol__bg--rectContBottom">
          <div className="gol__bg--longRect"></div>
          <div className="gol__bg--longRect"></div>
        </div>
      </div>
    </GameOfLifeChunkLayout>
    <ChunkDesc>
      Cellular autonom based off of{" "}
      <a
        target="__blank"
        href="https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life"
      >
        John Conways Game of Life
      </a>
      .<span className="skills">React, P5.js, Styled Components.</span>
    </ChunkDesc>
  </>
);

export default GameOfLifeChunk;
