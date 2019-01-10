import React from 'react';
import NewYouChunk from './NewYouChunk';
import ChunkDesc from '../../shared/ChunkDesc';

const EmailBuilder = () => [
  <NewYouChunk
    key="chunk"
    href="http://kurtwilliam.com/new-you"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p>New You</p>
  </NewYouChunk>,
  <ChunkDesc key="chunkdesc">
    New Identity generator for runaway criminals. Three separate Ajax calls pull API data to display
    and the rest of the information is randomly generated (or is it...?).
  </ChunkDesc>,
];

export default EmailBuilder;
