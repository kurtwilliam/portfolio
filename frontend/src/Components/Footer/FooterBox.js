import styled from 'styled-components';
import ASCII from '../../assets/footer/ascii2.png';
import Fire from '../../assets/footer/blueflame.gif';

const FooterBox = styled.div`
    width:100%;
    padding:14px 24px;
    background:#D8D8D8;
    position:relative;
    display:flex;
    flex-direction:column;
    border-radius: 2px 0 0 0;
    margin:0 auto;
    background-image:url(${ASCII});
    background-position:24px bottom;
    background-repeat: no-repeat;
    background-size: 91%;

    @media(max-width:1200px) {
        max-width:96%;
    }

    .footerBox__top {
        display:flex;
        justify-content:space-between;

        @media(max-width:850px) {
            flex-direction:column;
        }

        &--cont {
            width:48.5%;
            @media(max-width:850px) {
                width:100%;
            }
        }
        &--left {
            .footerBox__top--content {
                flex-direction:column;
            }
        }

        &--right {
            .footerBox__top--title {
                width:33.33%;
            }
            .footerBox__top--title__cont {
                display:flex;
            }
        }

        &--title {
            color:rgb(60,60,60);
            text-transform:uppercase;
            font-size:1.2rem;
            font-family: 'PingFang SC', sans-serif;
            font-weight:200;

            &__cont {
                border-bottom: 1px solid rgb(127,127,127);
                position:relative;
                margin-bottom:5px;

                &:after {
                    content: " ";
                    position: absolute;
                    top: auto;
                    left: 0px;
                    right: 0px;
                    bottom: -5px;
                    border: 0.2px solid rgb(127,127,127);
                }
            }
        }

        &--content {
            color:rgb(60,60,60);
            text-transform:uppercase;
            font-size:1.2rem;
            display:flex;
            border-bottom: 1px solid rgb(127,127,127);
            padding: 8px 0;
            position:relative;

            &:after {
                content: " ";
                position: absolute;
                top: auto;
                left: 0px;
                right: 0px;
                bottom: -5px;
                border: 0.2px solid rgb(127,127,127);
            }

            @media(max-width:850px) {
                border-bottom: none;
            }

            .oneThird {
                width:33.33%;
                position:relative;

                &__bug img {
                    position:absolute;
                    top:0;
                    left:0;
                    width: 140px;
                    height:148px;
                    z-index:1000;
                }
            }

            .hole {
                position:relative;
                height:auto;
                border-radius:50%;
                max-width: 100px;
                overflow:hidden;

                div {
                    position:absolute;
                    height:100%;
                    width:100%;
                    background:rgb(238,238,238);
                    background-image:url(${Fire});

                    background-attachment: fixed;
                    background-repeat: no-repeat;
                    background-size: 70px auto;
                }
            }

            &__cont {
                border-bottom: 10px double rgb(127,127,127);
            }

            &__us {
                display:flex;
                flex-direction:column;

                div {
                    display:flex;
                    align-items:center;
                }

                img {
                    width:34px;
                    height:34px;
                    margin-right:14px;
                }
            }
        }
    }
    .footerBox__content {
        display:flex;
        justify-content:space-between;
        margin-top:24px;
        padding-bottom: 80px;

        @media(max-width:850px) {
            flex-direction:column;
        }
        @media(max-width:550px) {
            padding-bottom:40px;
        }

        p {
            width:48.5%;
            letter-spacing:1.8px;
            font-size:32px;
            font-weight:500;

            @media(max-width:850px) {
                width:100%;
            }

            @media(max-width:550px) {
                font-size: 24px;
            }

            &:first-of-type {
                @media(max-width:850px) {
                    margin-bottom:16px;
                }
            }
        }
    }
    .bigFont {
        font-size:4.2rem;
        color:black;
    }
`

export default FooterBox;