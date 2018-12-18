import React from "react";
import { skillz } from "../../utils";

import Skill from "./Skill";

const Header = () => (
  <header>
    <h1>
      Hi I'm Kurt, a JavaScript developer based out of Toronto. I research
      applicable user experience, design the data schema, then build the
      product.
    </h1>
    {skillz.map(skill => (
      <Skill key={skill.title} skill={skill} />
    ))}
  </header>
);

export default Header;
