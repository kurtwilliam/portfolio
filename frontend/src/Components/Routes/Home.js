import React, { Fragment } from "react";
import Body from "../Body";
import Header from "../Header";
import Container from "../shared/Container";
import Gradient from "../shared/Gradient";
import InnerCont from "../shared/InnerCont";
const Home = () => (
  <Fragment>
    <Gradient>
      <Container>
        <InnerCont>
          <Header />
          <Body />
        </InnerCont>
      </Container>
    </Gradient>
  </Fragment>
);

export default Home;
