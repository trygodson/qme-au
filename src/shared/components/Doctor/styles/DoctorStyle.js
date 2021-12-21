import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
export const DoctorWrapper = styled.div`
  width: 320px;
  border-radius: 10px;
  display: inline-block;
`;
export const ImageContentWrapper = styled.div`
  background-image: url(${({ Image }) => (Image ? `${Image}` : '')});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 320px;
  width: 100%;
`;
export const ImageOverlay = styled.div`
  height: 40%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.28177) 18.8%,
    rgba(0, 0, 0, 0.452231) 32.86%,
    #000000 100%
  );
`;
export const OnlineHolder = styled.div`
  text-align: right;
  margin-top: 10px;
`;
export const Online = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 3px;
  padding: 3px 5px;
  margin-right: 10px;
  text-align: center;
  display: inline-block;
  background-color: ${({ OnlineNotification }) => (OnlineNotification ? `#38BF16` : `#C50032`)};
`;

export const DetailsHolder = styled.div`
  position: relative;
  height: auto;
  padding-bottom: 15px;
  padding-left: 15px;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;
export const Name = styled.h4`
  font-weight: 700;
  font-size: 22px;
  color: white;
  margin-bottom: 0;
`;

export const Role = styled.p`
  font-size: 13px;
  font-family: 'Montserrat', sans-serif;
  color: white;
  margin-bottom: 5px;
`;
export const Visits = styled.p`
  font-size: 9px;
  font-weight: 300;
  margin-left: 5px;
  color: white;
  margin-bottom: 0;
`;
export const Pin = styled.p`
  font-size: 9px;
  margin-left: 5px;
  font-weight: 300;
  color: white;
  margin-bottom: 0;
`;

export const BookButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Ratings = styled.div`
  border-bottom-left-radius: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  transition: box-shadow 400ms ease;
  &:hover {
    box-shadow: 1px 1px 3px 10px rgba(#000000, 0.1);
  }
`;
export const BookButton = styled.a`
  outline: none;
  border: none;
  padding: 10px 15px;
  width: 60%;
  text-decoration: none;
  font-weight: 700px;
  font-size: 20px;
  border-bottom-right-radius: 10px;
  background-color: #5842f4;
  color: white;
  transition: all 400ms ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 1px 3px 3px rgba(#000000, 0.1);
    color: white;
  }
`;
