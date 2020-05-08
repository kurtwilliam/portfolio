import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeBackgroundLayout from "./GameOfLifeBackgroundLayout";
import LeftRectangle from "./LeftRectangle";
import RightRectangle from "./RightRectangle";
import Screw from "../assets/Screw";
import ScrewCont from "./ScrewCont";

// const numberOfScrews = 30;

class GameOfLifeBackground extends Component {
  state = {
    w: 0,
    h: 0,
    screws: [
      [1, 65],
      [0.5, 68],
      [4.5, 65],
      [98, 3],
      [5, 96.7],
      [69.65, 12, true],
      [69.65, 47, true],
      [95, 35.7],
      [96, 38],
      [55.5, 97],
      [98, 97]
    ]
  };
  getRandomRange = (min, max) => Math.random() * (max - min) + min;

  componentDidMount() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.setState({ w, h });
  }

  render() {
    const { screws } = this.state;
    return (
      <GameOfLifeBackgroundLayout>
        <LeftRectangle>
          <div className="gol__bg--hexagons">
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
            <div className="gol__bg--hexagons__row">
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
              <div className="gol__bg--hexagons__hex"></div>
            </div>
          </div>
        </LeftRectangle>
        <RightRectangle>
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
        </RightRectangle>
        {screws.map((screw, i) => {
          return (
            <ScrewCont key={i} x={screw[0]} y={screw[1]} right={screw[2]}>
              <Screw />
            </ScrewCont>
          );
        })}
      </GameOfLifeBackgroundLayout>
    );
  }
}

export default withTheme(GameOfLifeBackground);
