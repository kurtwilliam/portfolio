import React, { useState, useEffect } from "react";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";

const GameOfLifeGrid = () => {
  const [grid, updateGrid] = useState([]);

  return <GameOfLifeGridLayout>grid</GameOfLifeGridLayout>;
};

export default GameOfLifeGrid;
