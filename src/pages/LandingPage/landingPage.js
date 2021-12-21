import { Fragment, useState, useRef, useEffect } from 'react';
import { NavLink, Link, useHistory, useLocation } from 'react-router-dom';
import AsyncInput from 'react-select/async';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import {
  calenderIcon,
  chat,
  findDoctor,
  groupOne,
  groupTwo,
  heroImage,
  location,
  logo,
  logoWhite,
  user,
} from '../../EntryFile/images';
import { LandinPageRoute } from '../../EntryFile/LandingPageRoute';
import { Navbar } from '../../shared/components/header/Navbar';
import { CustomNavlink } from '../../shared/components/navLink/navLink';
import { MobileMenu } from './mobileMenu/mobileMenu';
import './style.scss';
import axios from 'axios';
import { ApiEndpoints, BASE_URL } from '../../shared/config/Endpoints';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    zindex: '20',
  }),

  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    border: '2px solid #000000',
    margin: '10px 0',
    padding: '10px 5px 10px 10px',
    borderColor: state.isFocused ? '#5842f4' : null,
  }),
};

const LandingPage = () => {
  const { push } = useHistory();
  const loadDoctoOptions = async (text, callback) => {
    const res = await axios.get(`${BASE_URL}${ApiEndpoints.SPECIALIZATION}?search=${text}`);
    // const json = res.json();
    callback(
      res.data.map(({ name, ...i }) => ({
        label: name,
        value: name,
        ...i,
      })),
    );
  };
  const selectDoctor = i => {
    console.log(i);
    push(`/doctors/${i.id}`);
  };

  return (
    <Fragment>
      <header>
        <div className="hero-section">
          <div className="row">
            <div className="col-lg-6">
              <div className=" call-to">
                <Fade bottom cascade>
                  <div className="retro">
                    <div className="hero-content">
                      <h1 className="hero-title">
                        HealthCare <br />
                        From Home
                      </h1>
                      <div className="hero-subtitle">
                        <div className="hero-details">
                          <div className="hero-subdetails">
                            <div className="icon">
                              <img src={calenderIcon} />
                            </div>
                            <div className="some-details">
                              <h4>Make An Appointment</h4>
                              <p>Make schedule with your favourite doctors anytime</p>
                            </div>
                          </div>
                          <div className="hero-subdetails">
                            <div className="icon">
                              <img src={chat} />
                            </div>
                            <div className="some-details">
                              <h4>Online consultation</h4>
                              <p>Make schedule with your favourite doctors anytime</p>
                            </div>
                          </div>
                        </div>
                        <div className="hero-details">
                          <div className="hero-subdetails">
                            <div className="icon">
                              <img src={user} />
                            </div>
                            <div className="some-details">
                              <h4>Find Your Best Doctor</h4>
                              <p>Make schedule with your favourite doctors anytime</p>
                            </div>
                          </div>
                          <div className="hero-subdetails">
                            <div className="icon">
                              <img src={location} />
                            </div>
                            <div className="some-details">
                              <h4>Spread In Various Places</h4>
                              <p>We are Patnered with Pharmacy spread around the country</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="reach-a-doctor-container">
                      <h4 className="reach-doctor-text">Reach a Doctor</h4>
                      <div className="">
                        <AsyncInput
                          className="reach-doctor-input"
                          styles={customStyles}
                          loadOptions={loadDoctoOptions}
                          touchUi={true}
                          onBlur={event => event.preventDefault()}
                          placeholder="Search For A Specialization"
                          onChange={val => selectDoctor(val)}
                        />
                      </div>
                      <div className="reach-button-wrapper">
                        <Link className="hero-button" to="/">
                          Consult Online
                        </Link>
                        <Link className="hero-button book" to="/">
                          Book Online
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
            <div className="col-lg-6">
              <Fade right>
                <div className="circle">
                  <img src={heroImage} />
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </header>
      <section className="quick-solution">
        <div className="quick-solution-wrapper">
          <div className="quick-solution-top">
            <div className="quick-solution-top-text">
              <div className="underline"></div>
              <h4>
                Quick Solution For Scheduling
                <br />
                With Doctor
              </h4>
            </div>
          </div>
          <div className="row quick-solution-card-wrapper">
            <Fade duration={500}>
              <div className="col-lg-4  ">
                <div className="quick-solution-card p-3">
                  <img src={findDoctor} />
                  <h5>Find a Doctor</h5>
                  <p>
                    Feeling some kind of way and need medical attenttion? Type in your symptoms and
                    find a matching doctor!
                  </p>
                </div>
              </div>
            </Fade>
            <Fade delay={500} duration={500}>
              <div className="col-lg-4 my-3">
                <div className="quick-solution-card p-3 ">
                  <img src={findDoctor} />
                  <h5>Find a Doctor</h5>
                  <p>
                    Feeling some kind of way and need medical attenttion? Type in your symptoms and
                    find a matching doctor!
                  </p>
                </div>
              </div>
            </Fade>
            <Fade delay={1000} duration={500}>
              <div className="col-lg-4 ">
                <div className="quick-solution-card p-3">
                  <img src={findDoctor} />
                  <h5>Find a Doctor</h5>
                  <p>
                    Feeling some kind of way and need medical attenttion? Type in your symptoms and
                    find a matching doctor!
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
      <section className="live-consultation">
        <Reveal>
          <div className="live-consultation-lhs">
            <img src={groupOne} />
          </div>
        </Reveal>
        <Reveal>
          <div className="live-consultation-rhs">
            <div className="inner-wrapper">
              <div className="underline"></div>
              <h4>Live Consultation</h4>
              <p>
                Consult doctors online with our seamless Live Chat feature! Q Medic allows you to
                get in touch with a doctor online with our online chat feature. This way you can
                easily get medical attention or advice on the hurry.
              </p>
              <Link to="/doctors" className="consult-button">
                consult a doctor now
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className=" join-now">
        <div className="row mx-auto">
          <div className=" join-now-lhs col-lg-6 ">
            <div className="innner-wrapper">
              <div className="underline"></div>
              <h4>Are You A Doctor</h4>
              <p>
                Be a part of the next big thing in healthcare. Join us in our journey of
                revolutionizing healthcare delivery by harnessing technology to help millions lead
                healthier lives.
              </p>
              <Link to="/doctors" className="join-button">
                join us now
              </Link>
            </div>
          </div>
          <div className=" join-now-rhs col-lg-6">
            <div className="image">
              <img src={groupTwo} className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="sponsors">
        <div className="sponsors-wrapper"></div>
      </section>
    </Fragment>
  );
};

export default LandingPage;
