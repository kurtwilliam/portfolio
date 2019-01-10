import React from "react";
import LinkChunk from "../../shared/LinkChunk";
import ChunkDesc from "../../shared/ChunkDesc";
import EmailBuilderLogo from "./EmailBuilder.png";

const EmailBuilder = () => [
  <LinkChunk
    key="chunk"
    href="http://kurtwilliam.com/emailBuilder"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={EmailBuilderLogo} alt="Link to Email Builder project" />
  </LinkChunk>,
  <ChunkDesc key="chunkdesc">
    This project showcases some changes our team and I made to their Email
    Builder. The builder itself uses React, Redux, Axios, SCSS, among other
    tools.
  </ChunkDesc>
];

export default EmailBuilder;
