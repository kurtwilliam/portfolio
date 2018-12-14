import React from "react";
import { skillz } from "../../utils";

import Skill from "./Skill";

const Header = () => (
  <header>
    <h1>Kurt William is a JavaScript developer based out of Toronto, ON.</h1>
    {skillz.map(skill => (
      <Skill key={skill.title} skill={skill} />
    ))}
  </header>
);

export default Header;
