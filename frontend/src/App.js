import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Ogg from './assets/fonts/Ogg-Roman.otf';

const theme = {
  grey: '#B9B4AF',
  main: '#232323',
  gradient:
    'linear-gradient(#5F6460, #AC836B, #C5E199, #5DC99F, #3B6D81, #6F677F, #812A3A, #79341A,#504235)',
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
    background: ${props => props.theme.gradient};
    padding:15px;
    color:${props => props.theme.main};
    font-size:2.4rem;

    @media(max-width:550px) {
      padding:10px;
    }
  }
  h1,h2,h3,h4,h5,h6 { font-family: 'Ogg', serif; }
  p,span,a,label,button,textarea,li,figcaption { font-family:'Work Sans', sans-serif; font-size:1.6rem; }
`;

const AppCont = styled.div`
  width: 100%;
  height: auto;
  background: white;
`;

const Container = styled.div`
  width: calc(100% - 60px);
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
  padding-top: 100px;

  @media (max-width: 720px) {
    width: calc(100% - 40px);
    padding-top: 40px;
  }
`;

const client = new ApolloClient({
  uri: 'https://nodejs-d46mbauhe.now.sh',
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppCont>
        <Container>
          <Header />
          <Body />
          <Footer />
          <GlobalStyle />
        </Container>
      </AppCont>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
