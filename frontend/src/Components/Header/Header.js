import React from 'react';
import styled from 'styled-components';
import { skillz } from '../../utils';

import Skill from './Skill';
import SkillzContainer from './SkillzContainer';
import Introduction from './Introduction';

const HeaderCont = styled.header`
  min-height: 90vh;
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    min-height: 70vh;
  }
`;

const Header = () => (
  <HeaderCont>
    <Introduction>
      Hi, I'm Kurt, a Web Developer based out of Toronto. I use JavaScript to solve meaningful
      problems in creative ways.
    </Introduction>
    <SkillzContainer>
      {skillz.map(skill => (
        <Skill key={skill.title} skill={skill} />
      ))}
    </SkillzContainer>
  </HeaderCont>
);

export default Header;
