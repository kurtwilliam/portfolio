import React, { Component, useEffect } from "react";
import GameOfLifeExplanationLayout from "./GameOfLifeExplanationLayout";

class GameOfLifeExplanation extends Component {
  closeModal = e => {
    e.stopPropagation();
    this.props.updateDisplayedInfo("settings");
  };
  render() {
    const { updateDisplayedInfo } = this.props;
    return (
      <GameOfLifeExplanationLayout onClick={e => this.closeModal}>
        <div className="gol__explanation--modal">
          <button>So, what am I looking at...?</button>
          <button>Developer notes</button>
        </div>
        {/*<h3>So, what am I looking at...?</h3>
        <p>
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            The Game of Life
          </a>{" "}
          is a cellular automaton that takes place 2D grid, where each cell is
          either Alive or Dead. After each generation, each square counts how
          many Alive neighbours it has, and if:
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
        <h2>Developer Notes and Learnings</h2>
        <p>
          The biggest lesson for me is, just because you can use a
          library/framework to build something doesn't mean you should (in this
          project, React)😅. Also to research the right tools for the job before
          you build anything.
        </p>
        <p>
          I originally built the grid in React by rendering div's as the grid
          but it was not performant at all. I researched, and decided a normal
          HTML canvas was the way to go. I settled on the{" "}
          <a href="https://p5js.org/" target="_blank">
            p5
          </a>{" "}
          library to render the canvas with JS and used it as an instance
          instead of globally to allow React to play nicely with it.{" "}
        </p>
        <p>
          The state structure is a two dimentional array (array of arrays) for
          rows and nested objects for squares. Thus, when I built in React the
          first time I was revisiting past learnings about accidental state
          mutation and properly copying/updating nested objects in application
          state 😐. Yay.
        </p>
        <p>
          I learned how to optimize performance; using the performance tab in
          google chrome I identified which function calls were slowest and
          improved them. Some examples are: not creating new arrays at each
          interval, more checks to see if each loop is actually necessary, and
          more efficiently counting neighbours.
        </p>
        <p>
          Crazy Ones: [State] Zero Encoded by Zero Population 261841×261841
          https://www.conwaylife.com/wiki/0E0P_metacell Caterloopillar
          https://www.conwaylife.com/wiki/Caterloopillar
          </p>*/}
      </GameOfLifeExplanationLayout>
    );
  }
}

export default GameOfLifeExplanation;
