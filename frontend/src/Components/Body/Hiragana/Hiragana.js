import React, { Component, Fragment } from "react";
import hiraganaChart from "../../../data/hiraganaChart";
import words from "../../../data/words";
import HiraganaContainer from "./HiraganaContainer";
import HiraganaOverlay from "./HiraganaOverlay";
import Chart from "./Chart";
import ChartRow from "./ChartRow";
import Character from "./Character";

class Hiragana extends Component {
  state = {
    highlightY: null,
    highlightX: null,
    word: "",
    splitWord: [],
    currentCharacter: "",
    english: false,
    audio: [],
    audioPlaying: ""
  };

  highlightLetters = (highlightX, highlightY) => {
    this.setState({ highlightX, highlightY });
  };

  openWordOverlay = (word, char) => {
    if (!word) return;
    const splitWord = word.split("");
    this.setState({ word, splitWord, currentCharacter: char });
  };

  closeWordOverlay = e => {
    e.stopPropagation();
    this.setState({ word: "", splitWord: [] });
  };

  addNewSound = sound => {
    // get the sound from character and
    // add to audio tag playlist
    const { audio } = this.state;
    let updatedAudio = [...audio];
    console.log(sound);
    updatedAudio.push(sound);

    this.setState({ audio: updatedAudio }, () => this.playSound());
  };

  playSound = () => {
    // if there is a queue in playlist
    // play next sound
    console.log("playing");
    const { audio, audioPlaying } = this.state;
    let updatedAudio = [...audio];
    if (audioPlaying !== "" || updatedAudio.length < 1) return;
    const newAudioPlaying = updatedAudio[0];

    this.setState({ audioPlaying: newAudioPlaying }, () => this.player.play());
  };

  removeSound = e => {
    // after playing, remove sound from playlist
    // then play next song
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
      audioPlaying
    } = this.state;

    return (
      <Fragment>
        {word.length > 0 ? (
          <HiraganaOverlay onClick={this.closeWordOverlay}>
            <div
              className="hiraganaOverlay__content"
              onClick={
                words[word].sound ? this.addNewSound(words[word].sound) : null
              }
            >
              {words[word].content}
            </div>
            <div className="hiraganaOverlay__word" onClick={this.toggleEnglish}>
              {splitWord.map((char, i) => {
                return (
                  <p
                    key={char + i}
                    className={`${
                      char === currentCharacter && !english ? "highlight" : ""
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
                  />
                ))}
              </ChartRow>
            ))}
          </Chart>
          <p>🖱️ = 🔊</p>
          <p>🖱️🖱️ = 🖼️</p>
          <audio
            src={audioPlaying !== "" ? audioPlaying : null}
            ref={ref => (this.player = ref)}
            onEnded={this.removeSound}
          />
        </HiraganaContainer>
      </Fragment>
    );
  }
}

export default Hiragana;
