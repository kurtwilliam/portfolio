import React, { Component } from 'react';

import EntireFooter from './EntireFooter';
import FooterCont from './FooterCont';
import FooterBox from './FooterBox';
import FooterBar from './FooterBar';

import Beginning from '../../assets/footer/beginning.png';
import Bug1 from '../../assets/footer/bug1.png';
import Graveyard from '../../assets/footer/graveyard.png';
import Lighthouse from '../../assets/footer/lighthouse.png';

class Header extends Component {
    state={
        fireX:0,
        fireY:0,
    }

    componentDidMount() {
        const fireContainer = this.refs.FireContainer
        const contWidth = fireContainer.offsetWidth;
        const contHeight = fireContainer.offsetHeight;
        const contPos = fireContainer.getBoundingClientRect();

        this.setState({ fireX: contPos.x + (contWidth * 0.15), fireY: contPos.y + (contHeight * -0.2), })
    }

    render() {
        const {fireX, fireY} = this.state;
        return (
            <EntireFooter>
                <FooterCont>
                    <img className="beginning" src={Beginning} alt="The Beginning" />
                    <FooterBox>
                        <div className="footerBox__top">
                            <div className="footerBox__top--cont footerBox__top--left">
                                <div className="footerBox__top--title__cont">
                                    <p className="footerBox__top--title">This bit was made on–</p>
                                </div>
                                <div className="footerBox__top--content">
                                    <p className="bigFont">&copy;5/11/2018</p>
                                    <p className="bigFont">Toronto, Canada</p>
                                </div>
                            </div>
                            <div className="footerBox__top--cont footerBox__top--right">
                                <div className="footerBox__top--title__cont">
                                    <p className="footerBox__top--title">us–</p>
                                    <p className="footerBox__top--title">bug–</p>
                                    <p className="footerBox__top--title">hole–</p>
                                </div>
                                <div className="footerBox__top--content">
                                    <div className="footerBox__top--content__us oneThird">
                                        <div>
                                            <img src={Graveyard} alt="Dead" />
                                            <p className="bigFont">#1</p>
                                        </div>
                                        <div>
                                            <img src={Lighthouse} alt="Captain"/>
                                            <p className="bigFont">#2</p>
                                        </div>
                                    </div>
                                    <div className="oneThird oneThird__bug">
                                        <img alt="bug" src={Bug1} />
                                    </div>
                                    <div className="oneThird hole" ref="FireContainer" >
                                        <div style={{ backgroundPosition: `${fireX}px ${fireY}px` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footerBox__content">
                            <p>Ethics Gradient is a FULL STACK DESIGN and DEVELOPMENT and MARKETING and BUSINESS firm. We are two real startup guys ready to hit the ground running and fully synergize with your business family.</p>
                            <p>Ethics Gradient is a FULL STACK DESIGN and DEVELOPMENT and MARKETING and BUSINESS firm. We are two real startup guys ready to hit the ground running and fully synergize with your business family.</p>
                        </div>
                    </FooterBox>
                </FooterCont>
                <FooterBar>
                    <p>the bottom.</p>
                    <p>contact us.</p>
                    <p>secret collection →</p>
                </FooterBar>
            </EntireFooter>
        )
    }
}

export default Header;