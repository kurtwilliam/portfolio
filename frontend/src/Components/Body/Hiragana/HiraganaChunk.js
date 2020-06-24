import React from "react";
import HiraganaChunkLayout from "./HiraganaChunkLayout";
import ChunkDesc from "../../shared/ChunkDesc";
import { Link } from "react-router-dom";

const HiraganaChunk = () => (
  <>
    <HiraganaChunkLayout>
      <Link to="/hiragana" target="_blank" rel="noopener noreferrer">
        <div className="hiragana-container">
          <div>
            hi
            <span>ひ</span>
          </div>
          <div>
            ra
            <span>ら</span>
          </div>
          <div>
            ga
            <span>が</span>
          </div>
          <div>
            na<span>な</span>
          </div>
        </div>
        {/* <br />ʕ ꈍᴥꈍʔ */}
      </Link>
    </HiraganaChunkLayout>
    <ChunkDesc>
      Simple tool I built to teach myself Hiragana. Using sounds and emojis to
      learn an alphabet.
      <span className="skills">React, Styled Components</span>
    </ChunkDesc>
  </>
);

export default HiraganaChunk;
