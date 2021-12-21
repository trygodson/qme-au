import {
  OuterWrapper,
  RHSInnerWrapper,
  Title,
  WelcomeTextWrapper,
  LHSInnerWrapper,
  Overlay,
  Overlay2,
} from './styled/RegisterJumbotron';

export const AuthJumbotron = ({ children, ...props }) => {
  return <OuterWrapper {...props}>{children}</OuterWrapper>;
};

AuthJumbotron.RightSideFrame = ({ children, ...props }) => {
  console.log({ ...props });
  return <RHSInnerWrapper {...props}>{children}</RHSInnerWrapper>;
};

AuthJumbotron.WelcomeTextWrapper = ({ children, ...props }) => {
  return <WelcomeTextWrapper {...props}>{children}</WelcomeTextWrapper>;
};

AuthJumbotron.Title = ({ children, ...props }) => {
  return <Title {...props}>{children}</Title>;
};

AuthJumbotron.LeftSideFrame = ({ children, ...props }) => {
  return (
    <LHSInnerWrapper {...props}>
      <Overlay></Overlay>
      <Overlay2></Overlay2>
      {children}
    </LHSInnerWrapper>
  );
};
