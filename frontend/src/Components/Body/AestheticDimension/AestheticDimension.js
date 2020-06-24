import React from "react";
import LinkChunk from "../../shared/LinkChunk";
import ChunkDesc from "../../shared/ChunkDesc";

import AestheticDimensionImg from "./AestheticDimensionImg.png";

const AestheticDimension = () => [
  <LinkChunk
    href="http://aestheticdimension.com/"
    key="chunk"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={AestheticDimensionImg}
      alt="link to Aesthetic Dimension project"
    />
  </LinkChunk>,
  <ChunkDesc key="chunkdesc">
    A CMS site built for the design firm Aesthetic Dimension.{" "}
    <span className="skills">
      JavaScript, Craft CMS, Twig and SCSS. *I did not design the site.*
    </span>
  </ChunkDesc>
];

export default AestheticDimension;
