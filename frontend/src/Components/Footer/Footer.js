import React from "react";
import FooterCont from "./FooterCont";

const Footer = () => (
  <FooterCont>
    <a
      href="https://github.com/kurtwilliam"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-github" />
    </a>
    <a
      href="https://linkedin.com/in/kurtwilliam"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i class="fab fa-linkedin" />
    </a>
    <p>
      |{" "}
      <a
        href="mailto:k.w.schneid@gmail.com"
        target="_top"
        rel="noopener noreferrer"
      >
        k.w.schneid@gmail.com
      </a>
    </p>
  </FooterCont>
);

export default Footer;
