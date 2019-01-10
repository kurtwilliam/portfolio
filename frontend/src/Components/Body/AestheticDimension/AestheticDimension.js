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
    A CMS site built for the design firm Aesthetic Dimension. Built using
    JavaScript, Craft CMS, Twig and SCSS. Please note I did not design the site.
  </ChunkDesc>
];

export default AestheticDimension;
