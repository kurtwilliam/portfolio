import styled from "styled-components";

const FooterCont = styled.footer`
  background: #1d1c1c;
  padding: 80px 0;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  p,
  a {
    font-family: "Ogg", serif;
    font-size: 2.4rem;
    line-height: 2.4rem;
    text-decoration: none;
    color: #f6f6f6;
    padding-right: 8px;

    @media (max-width: 600px) {
      font-size: 1.8rem;
      line-height: 1.8rem;
    }
  }
`;

export default FooterCont;
