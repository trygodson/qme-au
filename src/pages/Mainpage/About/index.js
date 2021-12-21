import { Book, CameraVideo, Chat, Gear, Shield, Telephone } from 'react-bootstrap-icons';
import { aboutRight, mision, vision } from '../../../EntryFile/images';
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';
import './about.scss';
const AboutPage = () => {
  return (
    <>
      <div className="top-banner mb-4">
        <div className="container text-center">
          <h2>About One-Medy</h2>
        </div>
      </div>
      <section className="who-we-are py-3">
        <div className="container who-we">
          <div className="row ">
            <div className="col-lg-6">
              <div className="inner text-center">
                <h3>Who we Are</h3>
                <div>
                  <p>
                    OneMedy is a Medical Second Opinion platform where users can get medical advice
                    from doctors. Our virtual online medical help service provides the ultimate
                    convenience and premier health care. we are proud to be in the Telemedicine
                    industry. Our doctor panel consists of medical practitioners, physicians and
                    therapists from US, UK, UAE, India, Singapore, Germany and counting... iCliniq
                    upholds the highest standards when approving physicians to practice in the
                    online doctor consultation service. We are adding new doctors by the day. We
                    stringently verify our online doctors to ensure they are fully licensed so that
                    the care we provide will always be of the highest quality. icliniq.com is
                    brought to you by Orane Healthcare India Private Limited. Team-iCliniq consists
                    of eminent doctors, researchers and programmers who work round the clock to
                    innovate, create and implement the best web technologies for the use of doctors,
                    users and hospitals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="video-image">
                <img src={aboutRight} width="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do py-5">
        <div className="container">
          <div className="top text-center">
            <div className="top-what-we-do">
              <h3>What We Do</h3>
              <div></div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Fade left>
                <div className="do my-5">
                  <div className="item ">
                    <CameraVideo size={35} color="white" />
                    <div className="name">Video</div>
                  </div>
                  <div className="item two">
                    <Chat size={35} color="white" />
                    <div className="name">Chat</div>
                  </div>
                </div>
              </Fade>
              <Fade left>
                <div className="do my-5">
                  <div className="item three">
                    <Telephone size={35} color="white" />
                    <div className="name">Query</div>
                  </div>
                  <div className="item four">
                    <Shield size={35} color="white" />
                    <div className="name">Accessibility</div>
                  </div>
                </div>
              </Fade>
              <Fade left>
                <div className="do my-5">
                  <div className="item five">
                    <Gear size={35} color="white" />
                    <div className="name">Health Tools</div>
                  </div>
                  <div className="item six">
                    <Book size={35} color="white" />
                    <div className="name">Book an Appointment</div>
                  </div>
                </div>
              </Fade>
            </div>
            <div className="col-lg-6 rhs">
              <div>
                <p className="gf">
                  We provide various channels to contact our doctors such as posting as a health
                  query or booking a slot for real time face-to-face consultation over HD video and
                  phone (it will be a private/secure call back). One can use our service to consult
                  with highly qualified physicians at the comfort of your home.
                </p>
                <p className="gf">
                  We provide various channels to contact our doctors such as posting as a health
                  query or booking a slot for real time face-to-face consultation over HD video and
                  phone (it will be a private/secure call back). One can use our service to consult
                  with highly qualified physicians at the comfort of your home.
                </p>
                <p className="gf">
                  We provide various channels to contact our doctors such as posting as a health
                  query or booking a slot for real time face-to-face consultation over HD video and
                  phone (it will be a private/secure call back). One can use our service to consult
                  with highly qualified physicians at the comfort of your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="our-vision my-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="our-vision">
                <div className="top mb-3">
                  <h3>Our Vision</h3>
                  <div></div>
                </div>
                <div className="text">
                  Vision is to gain recognition from its users as the world's largest medical second
                  opinion platform and to keep working tirelessly to stay there. We want to ensure
                  that all its users are rightly informed about their potential health issues and
                  that the Doctor team at helps the users with prevention. We want to make the
                  one-stop-shop for all health-related clarifications. We aim at connecting patients
                  from all around the world with doctors whenever necessary with a click of the
                  button.
                </div>
              </div>
            </div>
            <Reveal right>
              <div className="col-lg-6 my-3">
                <img src={mision} width="90%" style={{ borderRadius: '7px' }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="our-vision mission my-4">
        <div className="container">
          <div className="row flex-xl-row-reverse">
            <Reveal right>
              <div className="col-lg-6 my-3">
                <img src={vision} width="90%" style={{ borderRadius: '7px' }} />
              </div>
            </Reveal>
            <div className="col-lg-6 order-md-1">
              <div className="our-vision">
                <div className="top mb-3">
                  <h3>Our Mission</h3>
                  <div></div>
                </div>
                <div className="text">
                  Mission is to gain recognition from its users as the world's largest medical
                  second opinion platform and to keep working tirelessly to stay there. We want to
                  ensure that all its users are rightly informed about their potential health issues
                  and that the Doctor team at helps the users with prevention. We want to make the
                  one-stop-shop for all health-related clarifications. We aim at connecting patients
                  from all around the world with doctors whenever necessary with a click of the
                  button.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
