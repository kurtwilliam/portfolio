import React from "react";
import { skillz } from "../../utils";

import Skill from "./Skill";
import SkillzContainer from "./SkillzContainer";
import Introduction from "./Introduction";

const Header = () => (
  <header style={{ minHeight: "90vh" }}>
    <Introduction>
      Hi, I'm Kurt, a JavaScript developer based out of Toronto. To build a
      product I research applicable user experience, design the data schema,
      then build it.
    </Introduction>
    <SkillzContainer>
      {skillz.map(skill => (
        <Skill key={skill.title} skill={skill} />
      ))}
    </SkillzContainer>
  </header>
);

export default Header;
