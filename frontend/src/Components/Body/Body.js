import React from "react";
import JungleSearch from "./JungleSearch";
import Hiragana from "./Hiragana/HiraganaChunk";
import AestheticDimension from "./AestheticDimension";
import Shooter from "./Shooter";
import EmailBuilder from "./EmailBuilder";
import MicroBiomeSimulator from "./GameOfLife/GameOfLifeChunk";
import WordSandwiches from "./WordSandwiches";
import NewYou from "./NewYou";

// Map over body chunks we get from state
// from here we render a body piece
// in the body piece we render the type of body it is

const Body = () => (
  <main>
    <MicroBiomeSimulator />
    <Hiragana />
    <EmailBuilder />
    {/* <Shooter /> */}
    <AestheticDimension />
    {/* <WordSandwiches /> */}
    {/* <NewYou /> */}
    {/* <JungleSearch /> */}
  </main>
);

export default Body;
