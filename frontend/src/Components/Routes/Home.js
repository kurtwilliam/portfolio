import React, { Fragment } from "react";
import Body from "../Body";
import Header from "../Header";
import Footer from "../Footer";
import Container from "../shared/Container";
import Gradient from "../shared/Gradient";
import InnerCont from "../shared/InnerCont";
const Home = () => (
  <>
    <Gradient>
      <Container>
        <InnerCont>
          <Header />
          <Body />
        </InnerCont>
      </Container>
    </Gradient>
    <Footer />
  </>
);

export default Home;
