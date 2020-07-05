import React, { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated } from "react-spring";
import useFadeIn from "../hooks/useFadeIn";

const Container = styled.div`
  height: 100vh;
  position: relative;
`;

const ScaleDiv = styled.div`
  width: 120vw;
  height: 120vh;
  position: absolute;
  top: 50%;
  left: 50%;
  background-image: url("https://mod.3dmgame.com/static/upload/mod/201907/MOD5d39023c5ff70.png");
  background-size: cover;
  transform-origin: 50% 50%;
`;
const SloganSection = styled.h1`
  padding: 0 15px;
  text-align: center;
  margin: 60vh auto 15vh;
  max-width: none;
  font-size: 3.5rem;
`;

const ContentSection = () => {
  const props = useFadeIn();
  useEffect(() => {
    if (typeof window !== `undefined`) {
      gsap.registerPlugin(ScrollTrigger);
      // gsap.core.globals("ScrollTrigger", ScrollTrigger);
    }
    gsap.set(".scale-down", {
      xPercent: -50,
      yPercent: -50,
    });
    gsap.to(".scale-down", {
      scale: 0.5,
      scrollTrigger: {
        trigger: ".container",
        pin: ".container",
        scrub: true,
      },
    });
  }, []);
  return (
    <div className="free-section">
      <animated.div style={props}>
        <SloganSection>「前所，未有，身心靈的自由。」</SloganSection>
      </animated.div>
      <Container className="container">
        <ScaleDiv className="scale-down"></ScaleDiv>
      </Container>
      <animated.div style={props}>
        <SloganSection>Dance, shall we?</SloganSection>
      </animated.div>
    </div>
  );
};

export default ContentSection;
