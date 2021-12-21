import { logoWhite } from '../../../EntryFile/images';
import './style.css';
export const Footer = () => {
  return (
    // <footer>
    //   <div className="footer-wrapper">
    //     <div className="row ">
    //       <div className="col-lg-4 col-md-12">
    // <div>
    //   <img src={logoWhite} />
    //   <p>
    //     We are an e-care facility dedicated to bring portable healthcare to the society -
    //     its a way provide healthcare Anytime, Anywhere.
    //   </p>
    // </div>
    //       </div>
    //       <div className="col-lg-8 col-md-12">
    //         <div className="row">
    //           <div className="col-lg-3 text-left">
    //             <h5>About</h5>
    //             <div>
    //               <a>About Us</a>
    //             </div>
    //             <div>
    //               <a>Blog</a>
    //             </div>
    //             <div>
    //               <a>FAQs</a>
    //             </div>
    //             <div>
    //               <a>Login</a>
    //             </div>
    //             <div>
    //               <a>Register</a>
    //             </div>
    //           </div>
    //           <div className="col-lg-3 my-3">
    //             <h5>Services</h5>
    //             <div>
    //               <a>Doctors</a>
    //             </div>
    //             <div>
    //               <a>Clinics</a>
    //             </div>
    //             <div>
    //               <a>Specialization</a>
    //             </div>
    //           </div>
    //           <div className="col-lg-3">
    //             <h5>Contact Us</h5>
    //             <div>
    //               <a mailto="">help@onemedy.com</a>
    //             </div>
    //             <div>
    //               <a tel="+2348035391954">+(234)803 539 1954</a>
    //             </div>
    //           </div>
    //           <div className="col-lg-3 my-2">
    //             <h5>Subscribe To Our Newsletter</h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="row footer-end">
    //       <div className="col-sm-4 lhs">
    //         <div>Terms and Condition</div>
    //         <div>Privacy Policy</div>
    //       </div>
    //       <div className="col-sm-8 rhs">2021 OneMedy</div>
    //     </div>
    //   </div>
    // </footer>
    <footer className="footer">
      <div className="container">
        <div className="row ">
          <div className="footer-col col-md-3">
            <div className="about-wrapper ">
              <img src={logoWhite} className="mb-3" />
              <p>
                We are an e-care facility dedicated to bring portable healthcare to the society -
                its a way provide healthcare Anytime, Anywhere.
              </p>
            </div>
          </div>
          <div className="footer-col col-md-3">
            <h4>Navigate</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Register</a>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-3">
            <h4>Services</h4>
            <ul className="">
              <li>
                <a href="#">Doctors</a>
              </li>
              <li>
                <a href="#">Clinics</a>
              </li>
              <li>
                <a href="#">Specialization</a>
              </li>
              <li>
                <a href="#">Affordable</a>
              </li>
            </ul>
          </div>
          <div className="footer-col col-md-3">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <h5>Subscribe To Our Newsletter</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};
