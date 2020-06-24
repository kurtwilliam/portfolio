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
    A showcase to some changes our team and I made to the companies Email
    Builder.{" "}
    <span className="skills">
      The email builder uses React, Redux, Axios, SCSS, and other tools.
    </span>
  </ChunkDesc>
];

export default EmailBuilder;
