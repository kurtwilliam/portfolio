import React from "react";
import styled from "styled-components";

const Character = ({ character, index }) => (
  <CharacterContainer>{character.char}</CharacterContainer>
);

const CharacterContainer = styled.div`
  padding: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  width: calc(100% / 12);

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default Character;
