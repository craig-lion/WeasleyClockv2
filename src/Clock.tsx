import React from "react";
import styled from "styled-components";

const Clock = () => {
  const ClockMainContainer = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: 5% 1fr 5%;
    text-align: center;
  `;
  const ClockTitle = styled.div`
    background-color: aquamarine;
  `;
  const ClockFace = styled.div`
    background-color: green;
    border-radius: 50%
    box-shadow: 1px 1px 5px black;
    // -webkit-mask-image: url(../../img/chevron-thin-right.svg);
    // -webkit-mask-size: cover;
  `;

  const Circle = styled.div`
    height: 100%;
    background-color: purple;
  `;
  const SVG = styled.svg`
    height: 100%;
    width: 100%;
    background-color: red;
    border-radius: 50%;
    overflow: visible;
    white-space: nowrap;
    position: relative;
  `;

  return (
    <ClockMainContainer>
      <ClockTitle>Now The Clock Test is Here Ha HA!</ClockTitle>
      <SVG>
        <Circle>
          <circle
            cx="50%"
            cy="50%"
            r="50"
            fill="rgba(204, 204, 204, 0.25)"
            stroke="tan"
            strokeWidth="2"
          />
        </Circle>
      </SVG>
      <ClockFace>Circle Go Brrrrrr</ClockFace>
    </ClockMainContainer>
  );
};

export default Clock;
