import React from "react";
import { skillz } from "../../utils";

import Skill from "./Skill";
import SkillzContainer from "./SkillzContainer";
import Introduction from "./Introduction";

const Header = () => (
  <header style={{ minHeight: "90vh", marginBottom: "10vh" }}>
    <Introduction>
      Hi, I'm Kurt, a Web Developer based out of Toronto. I use JavaScript to
      solve meaningful problems.
    </Introduction>
    <SkillzContainer>
      {skillz.map(skill => (
        <Skill key={skill.title} skill={skill} />
      ))}
    </SkillzContainer>
  </header>
);

export default Header;
