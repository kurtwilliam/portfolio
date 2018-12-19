import React from "react";
import EmailBuilderStyles from "./EmailBuilderStyles";

import Color1 from "./assets/color1.gif";
import Color2 from "./assets/color2.gif";
import General1 from "./assets/general1.gif";
import General2 from "./assets/general2.gif";
import Info1 from "./assets/info1.gif";
import Info2 from "./assets/info2.gif";
import Sidebar1 from "./assets/sidebar1.gif";
import Sidebar2 from "./assets/sidebar2.gif";
import Templates from "./assets/templates.png";
import Values1 from "./assets/values1.gif";
import Values3 from "./assets/values3.gif";
import Warn from "./assets/warn.svg";
import Yes from "./assets/yes.svg";
import ChunkDesc from "../../shared/ChunkDesc";

const EmailBuilder = () => [
  <EmailBuilderStyles key="chunk">
    <header>
      <ul>
        <li className="navNum">1</li>
        <li className="navNum">2</li>
        <li className="navNum">3</li>
        <li className="navNum">4</li>
        <li className="navNum">5</li>
        <li className="navNum">6</li>
      </ul>
    </header>
    <section className="container">
      <main>
        <section id="intro">
          <h1>Spently Email Builder</h1>
          <p>
            <a href="http://www.spently.com">Spently</a>'s Email Builder helps
            Shopify store owners build their own emails. In each GIF below the
            left side is the email the user edits, whilst the right sidebar
            customizes the emails content. The user will use these emails as
            their online order confirmation, shipment sent, etc...
          </p>
          <br />
          <p>
            How could the email builder be quicker, more intuitive, and better
            looking?
          </p>
          <br />
          <p>
            Skills and tools used: ReactJS, HTML, CSS, Sketch, JSON, Liquid,
            WebPack
          </p>
        </section>
        <section id="values" className="feature scrollTo">
          <h2>👨‍💻 Changing Numeric Values</h2>
          <div className="content">
            <div className="card">
              <img src={Values1} alt="Changing Values" />
              <div className="card__text">
                <img src={Warn} alt="pre kurt" />
                <div className="card__text--right">
                  <h3>Pre Kurt - Changing Values</h3>
                  <ul>
                    <li>Difficult to adjust with mouse</li>
                    <li>Increments slowly</li>
                    <li>Unsure of min - max values</li>
                    <li>Only applies to one component</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <img src={Values3} alt="Changing Values" />
              <div className="card__text">
                <img src={Yes} alt="post kurt" />
                <div className="card__text--right">
                  <h3>Post Kurt - Easily Changing Multiple Values</h3>
                  <ul>
                    <li>Easy and quick with mouse or keyboard</li>
                    <li>Smooth and indicative visual cues</li>
                    <li>Optionally change multiple components at once</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="sidebar" className="feature scrollTo">
          <h2>🏡 Cleaning up the Right Settings Sidebar</h2>
          <div className="content">
            <div className="card">
              <img src={Sidebar1} alt="Changes to options sidebar" />
              <div className="card__text">
                <img src={Warn} alt="pre kurt" />
                <div className="card__text--right">
                  <h3>Large and Disorienting</h3>
                  <ul>
                    <li>No navigation, what am I looking at?</li>
                    <li>Two thick columns</li>
                    <li>Large values</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <img src={Sidebar2} alt="Changes to options sidebar" />
              <div className="card__text">
                <img src={Yes} alt="post kurt" />
                <div className="card__text--right">
                  <h3>Minimal with Navigation</h3>
                  <ul>
                    <li>Navigation bar - Settings and Components</li>
                    <li>Thinner column with a makeover</li>
                    <li>Smooth animations with nested components</li>
                    <li>Toggleable Global Settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="color" className="feature scrollTo">
          <h2>👩‍🎨 Adding some Color</h2>
          <div className="content">
            <div className="card">
              <img src={Color1} alt="Changing Color the old way" />
              <div className="card__text">
                <img src={Warn} alt="pre kurt" />
                <div className="card__text--right">
                  <h3>Add a Custom Color</h3>
                  <ul>
                    <li>No way to save color</li>
                    <li>Have to change each component</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <img src={Color2} alt="Changing Color" />
              <div className="card__text">
                <img src={Yes} alt="post kurt" />
                <div className="card__text--right">
                  <h3>Reuse Custom Colors</h3>
                  <ul>
                    <li>Readily available custom swatches</li>
                    <li>Could apply to all similar components, if desired</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="components" className="feature scrollTo">
          <h2>💰 Transactional Details</h2>
          <div className="content">
            <div className="card">
              <img src={Info1} alt="HTML Email changes" />
              <div className="card__text">
                <img src={Warn} alt="pre kurt" />
                <div className="card__text--right">
                  <h3>Complicated Order Information</h3>
                  <ul>
                    <li>Unresponsive across email clients</li>
                    <li>Custom code; uneditable</li>
                    <li>Messy️</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <img src={Info2} alt="HTML Email changes" />
              <div className="card__text">
                <img src={Yes} alt="post kurt" />
                <div className="card__text--right">
                  <h3>Simple and Editable Order Information</h3>
                  <ul>
                    <li>Consistently renders</li>
                    <li>Liquid Variables hidden to user</li>
                    <li>Stylish, simple, consistent structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="components" className="feature scrollTo">
          <h2>📬 Email Templates</h2>
          <div className="content">
            <div className="card">
              <img src={General1} alt="Email Template design changes" />
              <div className="card__text">
                <img src={Warn} alt="pre kurt" />
                <div className="card__text--right">
                  <h3>Gets the Job Done</h3>
                  <ul>
                    <li>Outdated</li>
                    <li>Custom Designs</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card">
              <img src={General2} alt="Email Template design changes" />
              <div className="card__text">
                <img src={Yes} alt="post kurt" />
                <div className="card__text--right">
                  <h3>Modern and Informative</h3>
                  <ul>
                    <li>Sleek and new</li>
                    <li>Based on Shopify Store themes &amp; custom designs</li>
                    <li>Works more consistently across email clients</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="components" className="feature scrollTo">
          <h2>😍 Example Template Designs</h2>
          <div className="content">
            <div className="card">
              <img src={Templates} alt="New Template Designs" />
            </div>
          </div>
        </section>
      </main>
    </section>
  </EmailBuilderStyles>,
  <ChunkDesc key="chunkdesc">
    This project showcases some changes the Spently team and I made to Spently's
    Email Builder. The builder itself uses React, Redux, Axios, SCSS, among
    other tools.
  </ChunkDesc>
];

export default EmailBuilder;
