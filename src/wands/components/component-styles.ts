import styled from 'styled-components';

const Icon = styled.svg.attrs({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 389.6 2628",
})``;

export const WandSVG = styled(Icon)`
  height: 50%;
  /* height: ${props => props.height}; */
`;

export const Path = styled.path`
  fill: ${props => props.fill};
  fill-opacity: 75%;
  transform-origin: center;
  transform: rotate(${props => props.rotate}deg) scale(.60) translateY(25%);
`;