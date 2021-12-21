import styled from 'styled-components/macro';
import { registerOverlay } from '../../../../EntryFile/images';

export const OuterWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-position: top center;
  background-size: cover;
  display: flex;
  position: relative;
`;

export const RHSInnerWrapper = styled.div`
  width: 55%;
  height: 100%;
  background-image: url(${({ bgRightImage }) => (bgRightImage ? `${bgRightImage}` : ``)});
  display: flex;
  justify-content: center;
  background-position: center;
  background-size: cover;
  position: relative;
  align-items: center;
  color: white;
  z-index: 1;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #32239a;
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
  font-size: 130px;
`;

export const LHSInnerWrapper = styled.div`
  width: 45%;
  height: 100%;
  background: whitesmoke;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  background-position: top center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media (max-width: 992px) {
    width: 100%;
  }
`;
