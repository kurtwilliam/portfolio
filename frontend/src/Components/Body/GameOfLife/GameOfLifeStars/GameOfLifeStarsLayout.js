import styled from "styled-components";

const GameOfLifeStarsLayout = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 0;
  background: #000 url("https://image.ibb.co/mjnygo/stars.png") repeat top
    center;

  div {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 1;
    background: transparent url("https://image.ibb.co/ir1DE8/twinkling.png")
      repeat top center;
    animation: move-twink-back 500s linear infinite;
  }
  @keyframes move-twink-back {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -10000px 5000px;
    }
  }
`;

export default GameOfLifeStarsLayout;
