import styled from "styled-components";
import Chunk from "../../shared/Chunk";

import MaisonNeueLightT from "./assets/fonts/MaisonNeue-Light.ttf";
import MaisonNeueLightW from "./assets/fonts/MaisonNeue-Light.woff";
import MaisonNeueLight2 from "./assets/fonts/MaisonNeue-Light.woff2";

const EmailBuilderStyles = styled(Chunk)`
  @font-face {
    font-family: 'MaisonNeue-Light';
    src:url('${MaisonNeueLight2}') format('woff2'),
      url('${MaisonNeueLightW}') format('woff'),
      url('${MaisonNeueLightT}') format('ttf'),
  }
  background: rgb(245, 245, 245);
  overflow: hidden;
  overflow-y: scroll;
  height:75vh

  .container {
    margin: 0 auto;
    position: relative;
    width: 100%;
    max-width: 100%
    padding: 0 20px;
  }

  main {
    position: relative;
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  li,
  a {
    font-family: "MaisonNeue-Light", "Helvetica Neue", "Helvetica", helvetica,
      sans-serif;
    color: #2f2f33;
    font-weight: 300;
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 4rem;
    padding-bottom: 1.2rem;
    font-weight: bold;
  }

  h2 {
    font-size: 3.2rem;
    padding: 0 0 20px;
    font-weight: bold;
  }

  h3 {
    font-size: 2.4rem;
  }

  p {
    font-size: 1.8rem;
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
  }

  img {
    max-width: 100%;
  }

  header {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    height: 100%;
    display: none;
    justify-content: center;
    flex-direction: column;
    z-index: 100;
  }

  header ul {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    align-items: center;
    max-height: 300px;
  }

  .navNum {
    list-style: none;
    color: #2f2f33;
    font-size: 1.4rem;
    cursor: pointer;
    transition: all 200ms;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 50%;
    height: 23px;
    width: 23px;
    text-align: center;
    line-height: 1.4rem;
    padding-top: 5px;
    font-weight: bold;
  }

  .navNum:hover,
  header ul li.activeSection {
    background-color: #2f2f33;
    color: #f5f5f5;
  }

  #intro {
    padding: 5rem 0 10rem;
  }

  #intro p {
    padding-bottom: 0;
    line-height: 2.2rem;
  }

  #intro a {
    font-size: 1.8rem;
  }

  .feature {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    padding: 60px 0 100px;
  }

  .content {
    background: #f5f5f5;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .card {
    display: block;
    max-width: 500px;
  }

  .card:first-of-type {
    margin-top: 0;
    margin-right: 16px;
  }

  .card__text {
    padding: 0;
    display: flex;
    align-items: flex-start;
  }

  .card__text img {
    margin:2rem 1.2rem 0 0;
  }

  .card__text h3 {
    padding: 2rem 0 1.2rem;
  }

  .card__text p {
    color: #6e6e79;
    padding: 0;
  }

  .card__text ul {
    margin: 0;
    margin-left: 17px;
    padding: 0;
  }

  .card__text ul li {
    list-style: figcaption;
    font-size: 1.6rem;
    padding-bottom: 5px;
  }

  .card__text ul li:last-of-type {
    padding-bottom: 0;
  }

  footer {
    text-align: center;
    margin: 0 0 50px 100px;
  }

  footer a {
    font-size: 2rem;
  }

  @media (max-width: 850px) {
    .content {
      flex-direction: column;
      align-items: center;
      padding-bottom: 50px;
    }
    .card:first-of-type {
      margin-right: 0;
    }
    .card {
      margin-bottom: 2rem;
    }
    h2 {
      margin: 0 auto;
    }
  }

  @media (max-width: 600px) {
    header {
      right: 0;
      bottom: inherit;
      width: 100%;
      height: 60px;
      background: rgba(245, 245, 245, 0.8);
    }
    header ul {
      flex-direction: row;
      width: 100%;
      max-width: 300px;
    }
    .navNum {
      margin-right: 10px;
    }
    .container {
      margin-top: 60px;
      padding: 0 20px;
      max-width: inherit;
      width: 100%;
      overflow-x: hidden;
      margin-left: 0;
    }
    .card:first-of-type {
      margin: 0 0 60px 0;
    }
    main {
      position: relative;
      width: 100%;
      max-width: inherit;
      margin: 0 auto;
      padding: 0;
      display: inline-block;
    }
    footer {
      margin: 0 0 50px 0;
    }
  }
`;

export default EmailBuilderStyles;
