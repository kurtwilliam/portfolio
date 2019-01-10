import React from "react";
import WordSandwichesChunk from "./WordSandwichesChunk";
import ChunkDesc from "../../shared/ChunkDesc";
import WordSandwichesLogo from "./assets/WordSandwichesLogo.png";

const WordSandwiches = () => [
  <WordSandwichesChunk key="chunk">
    <a
      href="http://kurtwilliam.com/word-sandwiches"
      target="_blank"
      rel="noopener noreferrer"
    >
      {" "}
      <img src={WordSandwichesLogo} alt="Link to Word Sandwiches" />
    </a>
  </WordSandwichesChunk>,
  <ChunkDesc key="chunkdesc">
    My first React project!! Gets a bunch of words from a big text file and
    makes a game out of them. Try to find all of the words in the string!
  </ChunkDesc>
];

export default WordSandwiches;
