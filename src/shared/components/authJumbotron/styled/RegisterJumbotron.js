import styled from 'styled-components/macro';
import { registerOverlay } from '../../../../EntryFile/images';

export const OuterWrapper = styled.section`
  background-position: top center;
  background-size: cover;
  display: flex;
  min-height: 100vh;
  @media (max-width: 992px) {
    width: 100%;
    height: auto;
  }
`;

export const RHSInnerWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  width: 45%;
  height: 100%;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: top center;
  background-size: cover;
  align-items: center;
  color: white;
  z-index: 1;
  color: black;
  @media (max-width: 992px) {
    width: 100%;
    height: auto;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #c50032;
  opacity: 0.4;
  position: absolute;
  z-index: 1;
`;
export const Overlay2 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${() => `${registerOverlay}`});
  opacity: 0.6;
  z-index: 2;
  position: absolute;
`;

export const WelcomeTextWrapper = styled.div`
  padding: 20px 30px;
  z-index: 3;
`;

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 100px;
`;

export const LHSInnerWrapper = styled.div`
  width: 55%;
  background: whitesmoke;
  background-image: url(${({ bgLeftImage }) => (bgLeftImage ? `${bgLeftImage}` : ``)});
  background-position: center;
  background-size: cover;
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media (max-width: 992px) {
    display: none;
  }
`;
