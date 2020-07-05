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

const CanvasSection = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );
  const [scrolling, setScrolling] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(0);

  useEffect(() => {
    const CanvasImage = async () => {
      const canvas = canvasRef.current;
      const currentFrameUrl = (index: number) =>
        `./_testImages/${index.toString().padStart(4, "0")}.jpg`;
      const frameCount = 138;
      function loadImage() {
        return new Promise<HTMLImageElement>((r) => {
          for (let i = 1; i < frameCount; i++) {
            let img = new Image();
            img.onload = () => r(img);
            img.src = currentFrameUrl(i);
          }
        });
      }
      // init canvas and load images
      if (canvas) {
        const renderCtx = canvas.getContext("2d");
        if (renderCtx) {
          setContext(renderCtx);
          const img = await loadImage();
          // update canvas image by scroll height index
          const updateImage = async (index: number) => {
            img.src = currentFrameUrl(index);
            renderCtx.drawImage(img, 0, 0);
          };
          // calc index by window height and update canvas image
          const onScroll = (e: any) => {
            // TODO: add height index shift
            // or find ohter way
            const scrollTopValue = e.target.documentElement.scrollTop
            const maxScrollTop = e.target.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTopValue / maxScrollTop;
            const frameIndex = Math.min(
              frameCount - 1,
              Math.ceil(scrollFraction * frameCount)
            );
            window.requestAnimationFrame(() => updateImage(frameIndex + 1));
          };
          window.addEventListener("scroll", onScroll);
          return () => window.removeEventListener("scroll", onScroll);
        }
      }
    };
    CanvasImage();
  }, [context, scrollTop]);
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          border: "2px solid #888888",
          marginTop: 10,
        }}
      ></canvas>
    </div>
  );
};
export default CanvasSection;
