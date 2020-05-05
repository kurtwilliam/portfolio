import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Home from "./Components/Routes/Home";
import Hiragana from "./Components/Routes/Hiragana";
import GameOfLife from "./Components/Routes/GameOfLife";
import Footer from "./Components/Footer";
import BodyCont from "./Components/shared/BodyCont";
import Ogg from "./assets/fonts/Ogg-Roman.otf";
import { Router, Route, Link } from "react-router-dom";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const theme = {
  grey: "#B9B4AF",
  main: "#232323",
  gradient:
    "linear-gradient(#5F6460, #AC836B, #C5E199, #5DC99F, #3B6D81, #6F677F, #812A3A, #79341A, #504235)",
  golBrown: "rgb(77,33,27)",
  golTan: "rgb(151,138,88)",
  golOffWhite: "rgb(210,210,206)",
  golOffWhiteDark: "rgb(133, 133, 128);",
  golOffWhiteDarker: "rgb(120, 120, 115);",
  golBlack: "rgb(52,55,52)",
  golBorderWidth: 1.5,
  golHighlight: "maroon",
  golGrey: "rgb(143, 142, 152)",
  golPrimary1: "#22A657",
  golPrimary2: "#D3FBC5",
  golPrimary3: "#0E6D34",
  golButtonColor: "#363834",
  golTextColor: "#1C1919",
  golGrey1: "#959695"
  // golScrewGradient:"",
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Work+Sans');
  @font-face {
    font-family: 'Ogg';
    src: url(${Ogg});
  }

  * {
    box-sizing:border-box;
    padding:0;
    margin:0;
  }
  html {
    font-size:62.5%;
  }
  body {
    color:${props => props.theme.main};
    font-size:2.4rem;
  }
  h1,h2,h3,h4,h5,h6 { font-family: 'Ogg', serif; }
  p,span,a,label,button,textarea,li,figcaption { font-family:'Work Sans', sans-serif; font-size:1.6rem; }
`;

// const client = new ApolloClient({
//   uri: "https://nodejs-d46mbauhe.now.sh"
// });

const App = () => (
  // <ApolloProvider client={client}>
  <ThemeProvider theme={theme}>
    <BodyCont>
      <Router history={customHistory}>
        <Route exact path="/" component={Home} />
        <Route exact path="/hiragana" component={Hiragana} />
        <Route exact path="/game-of-life" component={GameOfLife} />
      </Router>
      <GlobalStyle />
    </BodyCont>
  </ThemeProvider>
  // </ApolloProvider>
);

export default App;
