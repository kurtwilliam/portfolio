import React from "react";
import JungleSearch from "./JungleSearch";
import AestheticDimension from "./AestheticDimension";
import Shooter from "./Shooter";
import EmailBuilder from "./EmailBuilder";
import WordSandwiches from "./WordSandwiches";
import Separator from "./Separator";

// Map over body chunks we get from state
// from here we render a body piece
// in the body piece we render the type of body it is

const Body = () => (
  <main>
    <EmailBuilder />
    <AestheticDimension />
    <WordSandwiches />
    <Separator>Fun Projects</Separator>
    {/* <Shooter /> */}
    <JungleSearch />
  </main>
);

export default Body;
