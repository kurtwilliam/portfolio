import React, { Component, useEffect } from "react";
import GameOfLifeExplanationLayout from "./GameOfLifeExplanationLayout";

class GameOfLifeExplanation extends Component {
  render() {
    return (
      <GameOfLifeExplanationLayout>
        <h3>So, what am I looking at...?</h3>
        <p>
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            The Game of Life
          </a>{" "}
          is a grid of cells, where each cell is either Alive or Dead. After
          each generation, each square counts how many Alive neighbours it has,
          and if:
        </p>
        <span className="gol__explanation--big-rule">
          The current Cell is Alive
        </span>
        <div className="gol__explanation--rule">
          <span className="gol__explanation--rule">
            And has 1 or 0 neighbours = death
          </span>
          <span className="gol__explanation--rule">
            Has 2 or 3 neighbours = alive
          </span>
          <span className="gol__explanation--rule">
            Has 4 or more neighbours = death
          </span>
        </div>
        <span className="gol__explanation--big-rule">
          The current Cell is Dead
        </span>
        <div className="gol__explanation--rule">
          <span className="gol__explanation--rule">
            And has 3 neighbours = alive
          </span>
          <span className="gol__explanation--rule">
            And doesn't have 3 neighbours = dead
          </span>
        </div>
        <div className="gol__explanation--hidden-rule">
          The above logic looks like: if (square.state === "alive") {"{"}
          if (sumOfAliveNeighbours {"<="} 1) {"{"}
          stateToUpdateTo = "dead"; } else if (sumOfAliveNeighbours > 1 &&
          sumOfAliveNeighbours {"< 4"}) {"{"}
          stateToUpdateTo = "alive"; } else if (sumOfAliveNeighbours >= 4) {"{"}
          stateToUpdateTo = "dead"; } } else {"{"}
          if (sumOfAliveNeighbours === 3) {"{"}
          stateToUpdateTo = "alive"; } else {"{"}
          stateToUpdateTo = "dead"; } }
        </div>
        <p>These simple rules can create complex patterns.</p>
        Developer Notes and Learnings The biggest lesson for me is, just because
        you can use a library/framework to build something doesn't mean you
        should (React, looking at you)😅. Also to research the right tools for
        the job before you build anything. I originally built the grid in React
        but it was not performant at all. I researched, and decided a canvas was
        the way to go. I settled on the{" "}
        <a href="https://p5js.org/" target="_blank">
          p5
        </a>{" "}
        library to render the canvas with JS and used it as an instance instead
        of globally to allow React to play nicely with it. The state structure
        is a two dimentional array (array of arrays) for rows and nested objects
        for squares. Thus, I was revisiting past learnings about accidental
        state mutation and properly copying/updating nested objects in
        application state 😐. Yay.
      </GameOfLifeExplanationLayout>
    );
  }
}

export default GameOfLifeExplanation;
