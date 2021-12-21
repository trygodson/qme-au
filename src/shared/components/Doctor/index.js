import {
  BookButton,
  BookButtonWrapper,
  Details,
  DetailsHolder,
  DoctorWrapper,
  ImageContentWrapper,
  ImageOverlay,
  Name,
  Online,
  OnlineHolder,
  Pin,
  Ratings,
  Role,
  Visits,
} from './styles/DoctorStyle';

export const Doctor = ({ children, ...props }) => {
  return <DoctorWrapper {...props}>{children}</DoctorWrapper>;
};

Doctor.ImageContentWrapper = ({ children, ...props }) => {
  return (
    <ImageContentWrapper {...props}>
      <ImageOverlay />
      {children}
    </ImageContentWrapper>
  );
};
Doctor.OnlineHolder = ({ children, ...props }) => {
  return <OnlineHolder {...props}>{children}</OnlineHolder>;
};
Doctor.Online = ({ children, ...props }) => {
  return <Online {...props}>{children}</Online>;
};
Doctor.DetailsHolder = ({ children, ...props }) => {
  return <DetailsHolder {...props}>{children}</DetailsHolder>;
};
Doctor.Details = ({ children, ...props }) => {
  return <Details {...props}>{children}</Details>;
};
Doctor.Name = ({ children, ...props }) => {
  return <Name {...props}>{children}</Name>;
};
Doctor.Role = ({ children, ...props }) => {
  return <Role {...props}>{children}</Role>;
};
Doctor.Visits = ({ children, ...props }) => {
  return <Visits {...props}>{children}</Visits>;
};

Doctor.Pin = ({ children, ...props }) => {
  return <Pin {...props}>{children}</Pin>;
};
Doctor.BookButtonWrapper = ({ children, ...props }) => {
  return <BookButtonWrapper {...props}>{children}</BookButtonWrapper>;
};
Doctor.Ratings = ({ children, ...props }) => {
  return <Ratings {...props}>{children}</Ratings>;
};
Doctor.BookButton = ({ children, ...props }) => {
  return <BookButton {...props}>{children}</BookButton>;
};
