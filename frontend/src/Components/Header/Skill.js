import React from 'react';
import styled from 'styled-components';

const SkillCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 90px;
  width: 25%;

  @media (max-width: 720px) {
    width: 50%;
    margin-top: 40px;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.grey};
  margin-bottom: 8px;

  @media (max-width: 720px) {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  li {
    width: 100%;
    list-style: none;
    font-size: 2.4rem;
  }
`;

const Skill = ({ skill }) => (
  <SkillCont>
    <Title>{skill.title}</Title>
    <List>
      {skill.skillz.map(el => (
        <li key={el}>{el}</li>
      ))}
    </List>
  </SkillCont>
);

export default Skill;
