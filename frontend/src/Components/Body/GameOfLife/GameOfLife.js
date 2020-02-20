import React, { useState, useEffect } from "react";
// import GameOfLifeChart from "../../../data/GameOfLifeChart";
// import GameOfLifeChartMuddied from "../../../data/GameOfLifeChartMuddied";
// import words from "../../../data/words";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeOverlay from "./GameOfLifeOverlay";
import GameOfLifeGrid from "./GameOfLifeGrid";
// import Chart from "./Chart";
// import ChartRow from "./ChartRow";
// import Character from "./Character";

const GameOfLife = () => {
  return (
    <GameOfLifeLayout>
      <GameOfLifeGrid />
      <GameOfLifeOverlay />
    </GameOfLifeLayout>
  );
};

export default GameOfLife;
