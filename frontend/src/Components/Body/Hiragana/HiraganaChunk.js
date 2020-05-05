import React from "react";
import HiraganaChunkLayout from "./HiraganaChunkLayout";
import ChunkDesc from "../../shared/ChunkDesc";
import { Link } from "react-router-dom";

const HiraganaChunk = () => (
  <>
    <HiraganaChunkLayout>
      <Link
        href="https://kurtwilliam.com/hiragana"
        target="_blank"
        rel="noopener noreferrer"
      >
        平仮名
      </Link>
    </HiraganaChunkLayout>
    <ChunkDesc>
      Simple tool I built to help learn Hiragana. Using sounds and emojis to
      learn a language.
    </ChunkDesc>
  </>
);

export default HiraganaChunk;
