import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideOutLeft } from 'react-animations';

const slideInAnimation = keyframes`${slideInLeft}`;
const slideOutAnimation = keyframes`${slideOutLeft}`;

export const MobileDiv = styled.div`
  animation: 1s
    ${({ toggleMobileMenu }) => {
      return toggleMobileMenu ? slideInAnimation : slideOutAnimation;
    }};
`;
