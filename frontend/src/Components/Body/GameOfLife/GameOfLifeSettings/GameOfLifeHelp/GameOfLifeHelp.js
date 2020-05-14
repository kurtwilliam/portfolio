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
import HelpButtonCaret from "../../assets/HelpButtonCaret";

class GameOfLifeHelp extends Component {
  state = {
    hideDevNotes: true
  };

  toggleNotes = () =>
    this.setState(prevState => ({ hideDevNotes: !prevState.hideDevNotes }));

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
          <span className="gol__help--title">Ok what is this?</span>
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
                    className="gol__help--pages__previous"
                    onClick={() =>
                      updateState("currentHelpPage", currentHelpPage - 1)
                    }
                  >
                    <span>
                      <HelpButtonCaret />
                    </span>{" "}
                    previous
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
                    next{" "}
                    <span>
                      <HelpButtonCaret />
                    </span>
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
              {/* <button
                className="gol__help--switch"
                onClick={() => this.toggleNotes()}
              >
                Developer Notes
              </button> */}
            </>
          ) : (
            <div className="gol__help--notes">
              <button
                className="gol__help--switch"
                onClick={() => this.toggleNotes()}
              >
                Tutorial
              </button>
              <h2>Notes and Learnings</h2>
              <p>Designed by Devin, built by Kurt.</p>
              <p>
                Built using React, p5.js, and Styled-Components, but Vanilla
                JavaScript, HTML and CSS would have been fine. Doesn't use React
                hooks (because I couldn't update React versions without wifi
                when initially building)
              </p>
              <p>
                Just because you can use a library/framework to build something
                doesn't mean you should. In the future I will research the right
                tools for the job before building anything.
              </p>
              <p>
                The grid was originally built in React by rendering div's as the
                grid, but performance was terrible. After research I decided a
                normal HTML canvas was the way to go. I settled on the{" "}
                <a href="https://p5js.org/" target="_blank">
                  p5
                </a>{" "}
                library to render the canvas with JS and used it as an instance
                instead of globally to allow React to play nicely with it.{" "}
              </p>
              <p>
                The grid state structure is a two dimentional array (array of
                arrays) for rows and nested objects for squares. Thus, when I
                built it in React the first time I was revisiting past learnings
                about accidental state mutation and properly copying/updating
                nested objects in application state 😐. Yay.
              </p>
              <p>
                I learned how to optimize performance; using the performance tab
                in google chrome I identified which function calls were slowest
                and improved them. Some improvements were: not creating new
                arrays on each interval, more checks to see if each loop is
                actually necessary, and more efficiently counting neighbouring
                cells.
              </p>
              <p>
                Big Ones: [State] Zero Encoded by Zero Population 261841×261841
                https://www.conwaylife.com/wiki/0E0P_metacell Caterloopillar
                https://www.conwaylife.com/wiki/Caterloopillar
              </p>
            </div>
          )}
        </div>
      </GameOfLifeHelpLayout>
    );
  }
}

export default GameOfLifeHelp;
