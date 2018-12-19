import React from "react";
import AestheticDimensionChunk from "./AestheticDimensionChunk";
import ChunkDesc from "../../shared/ChunkDesc";

const AestheticDimension = () => [
  <AestheticDimensionChunk key="chunk">
    <a href="http://aestheticdimension.com/" />
  </AestheticDimensionChunk>,
  <ChunkDesc key="chunkdesc">
    A CMS site built for the design firm Aesthetic Dimension. Built using
    JavaScript, Craft CMS, Twig and SCSS. Please note I did not design the site.
  </ChunkDesc>
];

export default AestheticDimension;
