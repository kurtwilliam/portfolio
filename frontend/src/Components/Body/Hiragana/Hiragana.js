import React, { Component, Fragment } from "react";
import hiraganaChart from "../../../data/hiraganaChart";
import hiraganaChartMuddied from "../../../data/hiraganaChartMuddied";
import words from "../../../data/words";
import HiraganaContainer from "./HiraganaContainer";
import HiraganaOverlay from "./HiraganaOverlay";
import Chart from "./Chart";
import ChartRow from "./ChartRow";
import Character from "./Character";
import Container from "../../shared/Container";
import Gradient from "../../shared/Gradient";
import InnerCont from "../../shared/InnerCont";
import Footer from "../../Footer";

class Hiragana extends Component {
  state = {
    highlightY: null,
    highlightX: null,
    word: "",
    splitWord: [],
    currentCharacter: "",
    english: false,
    audio: [],
    audioPlaying: "",
    currentChart: "",
    syllabary: "hiragana"
  };

  highlightLetters = (highlightX, highlightY, currentChart) => {
    this.setState({ highlightX, highlightY, currentChart });
  };

  openWordOverlay = (word, char) => {
    if (!word) return;
    const splitWord = word.split("");
    this.setState({ word, splitWord, currentCharacter: char, english: false });
  };

  closeWordOverlay = e => {
    e.stopPropagation();
    this.setState({ word: "", splitWord: [] });
  };

  changeSyllabary = e => this.setState({ syllabary: e.target.value });

  addNewSound = (e, sound) => {
    if (e) e.stopPropagation();
    // get the sound from character and
    // add to audio tag playlist
    const { audio } = this.state;
    let updatedAudio = [...audio];
    updatedAudio.push(sound);

    this.setState({ audio: updatedAudio }, () => this.playSound());
  };

  playSound = () => {
    // if there is a queue in playlist
    // play next sound
    const { audio, audioPlaying } = this.state;
    let updatedAudio = [...audio];
    if (audioPlaying !== "" || updatedAudio.length < 1) return;
    const newAudioPlaying = updatedAudio[0];

    this.setState({ audioPlaying: newAudioPlaying }, () => this.player.play());
  };

  removeSound = e => {
    // after playing, remove sound from playlist
    // then play next sound
    e.stopPropagation();
    const { audio } = this.state;
    let updatedAudio = [...audio];
    updatedAudio.shift();

    this.setState({ audio: updatedAudio, audioPlaying: "" }, () =>
      this.playSound()
    );
  };

  toggleEnglish = e => {
    e.stopPropagation();
    this.setState(prevState => ({ english: !prevState.english }));
  };

  render() {
    const {
      highlightX,
      highlightY,
      word,
      splitWord,
      currentCharacter,
      english,
      audioPlaying,
      currentChart,
      syllabary
    } = this.state;

    return (
      <>
        <Gradient>
          <Container>
            <InnerCont>
              {word.length > 0 ? (
                <HiraganaOverlay onClick={this.closeWordOverlay}>
                  <div
                    className="hiraganaOverlay__content"
                    onClick={
                      words[word].sound && audioPlaying === ""
                        ? e => this.addNewSound(e, words[word].sound)
                        : e => e.stopPropagation()
                    }
                  >
                    {words[word].content}
                    {!words[word].sound ? <span>🚫💬</span> : null}
                  </div>
                  <div
                    className="hiraganaOverlay__word"
                    onClick={this.toggleEnglish}
                  >
                    {splitWord.map((char, i) => {
                      return (
                        <p
                          key={char + i}
                          className={`${
                            char === currentCharacter && !english
                              ? "highlight"
                              : ""
                          }`}
                        >
                          {english ? (i === 0 ? words[word].eng : null) : char}
                        </p>
                      );
                    })}
                  </div>
                </HiraganaOverlay>
              ) : null}

              <HiraganaContainer>
                <div className="hiragana__instructions">
                  <p>🖱️ = 🔊</p>
                  <p>🖱️🖱️ = 🖼️</p>
                </div>
                <form className="hiragana__syllabary">
                  <label htmlFor="hiragana__syllabary">
                    <input
                      id="hiragana__syllabary"
                      type="radio"
                      name="syllabary"
                      value="hiragana"
                      onChange={this.changeSyllabary}
                      checked={syllabary === "hiragana"}
                    />
                    ひらがな
                  </label>
                  <label htmlFor="katakana__syllabary">
                    <input
                      id="katakana__syllabary"
                      type="radio"
                      name="syllabary"
                      value="katakana"
                      onChange={this.changeSyllabary}
                      checked={syllabary === "katakana"}
                    />
                    カタカナ
                  </label>
                </form>
                <Chart>
                  {Object.keys(hiraganaChart).map((y, i) => (
                    <ChartRow key={y} className={`${i === 0 ? "hidden" : ""}`}>
                      {hiraganaChart[y].map((char, index) => (
                        <Character
                          key={char.x + y}
                          index={index}
                          character={char}
                          y={parseInt(y)}
                          highlightX={highlightX}
                          highlightY={highlightY}
                          highlightLetters={this.highlightLetters}
                          openWordOverlay={this.openWordOverlay}
                          addNewSound={this.addNewSound}
                          lastColumn={12}
                          currentChart={currentChart}
                          thisChart={"hiragana"}
                          syllabary={syllabary}
                        />
                      ))}
                    </ChartRow>
                  ))}
                </Chart>

                <Chart>
                  {Object.keys(hiraganaChartMuddied).map((y, i) => (
                    <ChartRow key={y} className={`${i === 0 ? "hidden" : ""}`}>
                      {hiraganaChartMuddied[y].map((char, index) => (
                        <Character
                          key={char.x + y}
                          index={index}
                          character={char}
                          y={parseInt(y)}
                          highlightX={highlightX}
                          highlightY={highlightY}
                          highlightLetters={this.highlightLetters}
                          openWordOverlay={this.openWordOverlay}
                          addNewSound={this.addNewSound}
                          lastColumn={6}
                          currentChart={currentChart}
                          thisChart={"hiraganaMuddied"}
                          syllabary={syllabary}
                        />
                      ))}
                    </ChartRow>
                  ))}
                </Chart>

                <audio
                  src={audioPlaying !== "" ? audioPlaying : null}
                  ref={ref => (this.player = ref)}
                  onEnded={this.removeSound}
                />
              </HiraganaContainer>
            </InnerCont>
          </Container>
        </Gradient>
        <Footer />
      </>
    );
  }
}

export default Hiragana;
