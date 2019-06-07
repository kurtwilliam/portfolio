import React, { Component } from "react";
import hiraganaChart from "../../../data/hiraganaChart";
import HiraganaContainer from "./HiraganaContainer";
import Chart from "./Chart";
import ChartRow from "./ChartRow";
import Character from "./Character";

const totalX = 12;
const totalY = 6;

console.log(hiraganaChart);

const Hiragana = () => (
  <HiraganaContainer>
    <Chart>
      {Object.keys(hiraganaChart).map((y, i) => (
        <ChartRow key={y} className={`${i === 0 ? "hidden" : ""}`}>
          {hiraganaChart[y].map((char, index) => (
            <Character key={char.x + y} index={index} character={char} />
          ))}
        </ChartRow>
      ))}
    </Chart>
    <p>🖱️ = 🔊</p>
    <p>🖱️🖱️ = 🖼️</p>
  </HiraganaContainer>
);

export default Hiragana;
