import { MobileDiv } from './styles';

export const MobileMenu = ({ children, ...restProps }) => {
  return <MobileDiv {...restProps}>{children}</MobileDiv>;
};
