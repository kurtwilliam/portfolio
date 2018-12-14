import React from "react";
import styled from "styled-components";

const SkillCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
`;

const Title = styled.h2`
  font-size: 2.8rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  li {
    width: 20%;
    list-style: none;
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
