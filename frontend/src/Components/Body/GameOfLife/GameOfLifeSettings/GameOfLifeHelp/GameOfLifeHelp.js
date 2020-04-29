import React, { Component, useEffect } from "react";
import GameOfLifeHelpLayout from "./GameOfLifeHelpLayout";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import guide from "./GameOfLifeHelpGuide.json";

class GameOfLifeHelp extends Component {
  state = {
    hideDevNotes: true
  };

  toggleNotes = () => {
    console.log(this.state.hideDevNotes);
    this.setState(prevState => ({ hideDevNotes: !prevState.hideDevNotes }));
  };

  componentDidUpdate = () => {
    const { updateState } = this.props;

    let addPatterns = document.getElementById("addPatterns");
    let developerNotes = document.getElementById("developerNotes");

    if (addPatterns || developerNotes) {
      addPatterns.addEventListener("click", () =>
        updateState("displayedInfo", "patterns")
      );
      developerNotes.addEventListener("click", () => this.toggleNotes);
    }
  };

  render() {
    const { currentHelpPage, updateState } = this.props;
    const { hideDevNotes } = this.state;
    return (
      <GameOfLifeHelpLayout>
        <div className="gol__help">
          <button
            className="gol__help--close"
            onClick={() => updateState("displayedInfo", "settings")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {hideDevNotes ? (
            <>
              {ReactHtmlParser(guide[currentHelpPage].html)}
              <div className="gol__help--pages">
                {currentHelpPage > 0 ? (
                  <button
                    onClick={() =>
                      updateState("currentHelpPage", currentHelpPage - 1)
                    }
                  >
                    Previous
                  </button>
                ) : (
                  <span></span>
                )}
                {currentHelpPage < guide.length - 1 ? (
                  <button
                    onClick={() =>
                      updateState("currentHelpPage", currentHelpPage + 1)
                    }
                  >
                    Next
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
              <button
                className="gol__help--switch"
                onClick={() => this.toggleNotes()}
              >
                Developer Notes
              </button>
            </>
          ) : (
            <div className="gol__help">
              <button
                className="gol__help--switch"
                onClick={() => this.toggleNotes()}
              >
                Tutorial
              </button>
              <h2>Developer Notes and Learnings</h2>
              <p>
                The biggest lesson for me is, just because you can use a
                library/framework to build something doesn't mean you should (in
                this project, React)😅. Also to research the right tools for the
                job before you build anything.
              </p>
              <p>
                I originally built the grid in React by rendering div's as the
                grid but it was not performant at all. I researched, and decided
                a normal HTML canvas was the way to go. I settled on the{" "}
                <a href="https://p5js.org/" target="_blank">
                  p5
                </a>{" "}
                library to render the canvas with JS and used it as an instance
                instead of globally to allow React to play nicely with it.{" "}
              </p>
              <p>
                The state structure is a two dimentional array (array of arrays)
                for rows and nested objects for squares. Thus, when I built in
                React the first time I was revisiting past learnings about
                accidental state mutation and properly copying/updating nested
                objects in application state 😐. Yay.
              </p>
              <p>
                I learned how to optimize performance; using the performance tab
                in google chrome I identified which function calls were slowest
                and improved them. Some examples are: not creating new arrays at
                each interval, more checks to see if each loop is actually
                necessary, and more efficiently counting neighbours.
              </p>
              <p>
                Crazy Ones: [State] Zero Encoded by Zero Population
                261841×261841 https://www.conwaylife.com/wiki/0E0P_metacell
                Caterloopillar https://www.conwaylife.com/wiki/Caterloopillar
              </p>
            </div>
          )}
        </div>
      </GameOfLifeHelpLayout>
    );
  }
}

export default GameOfLifeHelp;
