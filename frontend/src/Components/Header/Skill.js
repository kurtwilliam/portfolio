import React from "react";
import styled from "styled-components";

const SkillCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
  width: 25%;

  @media (max-width: 720px) {
    width: 50%;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.grey};
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 12px;
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
