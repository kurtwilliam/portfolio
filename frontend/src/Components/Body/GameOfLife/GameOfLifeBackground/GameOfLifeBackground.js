import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeBackgroundLayout from "./GameOfLifeBackgroundLayout";
import LeftRectangle from "./LeftRectangle";
import RightRectangle from "./RightRectangle";
import Screw from "../assets/Screw";

class GameOfLifeBackground extends Component {
  render() {
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
        <Screw />
      </GameOfLifeBackgroundLayout>
    );
  }
}

export default withTheme(GameOfLifeBackground);
