import React from "react";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Muli|Noto+Serif');

  * {
    box-sizing:border-box;
    padding:0;
    margin:0;
  }
  html {
    font-size:62.5%;
  }
  body {
    background: linear-gradient(#f7fbde, #d0ccc0);
    padding:20px;
    color:#232323;
    font-size:2.4rem;
  }
  h1,h2,h3,h4,h5,h6 { font-family: 'Muli', sans-serif; }
  p,span,a,label,button,textarea,li { font-family:'Noto Serif', serif; font-size:1.6rem; }
`;

const AppCont = styled.div`
  width: 100%;
  height: auto;
  background: white;
`;

const Container = styled.div`
  width: calc(100% - 40px);
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
  padding-top: 40px;
`;

const App = () => (
  <AppCont>
    <Container>
      <Header />
      <Body />
      <Footer />
      <GlobalStyle />
    </Container>
  </AppCont>
);

export default App;
