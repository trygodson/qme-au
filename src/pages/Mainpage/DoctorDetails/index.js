import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Envelope, Telephone, CameraVideo, ChatFill, Chat } from 'react-bootstrap-icons';
import './index.scss';
import ChatBox from '../../../shared/components/chat/ChatBox';
import '../../../shared/components/chat/chat.scss';
import _chatmessages from '../../../assets/jsondata/chat_messages.json';
import BookAppointmentForm from '../../../shared/components/appointmentform/bookAppointmentForm';
import api from '../../../utils/api';
import { ApiEndpoints, BASE_URL } from '../../../shared/config/Endpoints';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { bounceInRight } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useAuthState } from '../../../context/useAuthContext';

// todo: divide into components
const DoctorDetails = () => {
  const [user, setUser] = useState({ name: 'John Doe', image: 'http://localhost:3001/male.jpg' });
  const [chatMessages, setChatMessages] = useState(_chatmessages);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const { user: _user } = useAuthState();
  const { state } = useLocation();
  const bounceAnimation = keyframes`${mobileChat ? bounceInRight : ''}`;
  const _style = styled.div`
    animation: 1s ${bounceAnimation};
  `;
  useEffect(() => {
    async function detailData() {
      const res = await axios.get(`${BASE_URL}doctordetail/${state.id}`);
      setDoctorDetail(res.data);
    }

    detailData();
  }, []);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const closeChat = () => {
    setUserId(null);
    setChat(false);
  };
  return (
    <LoadingOverlay active={isLoading} spinner text="Creating Appointment">
      <>
        <div className="doctor-details container">
          <div className="first-row row">
            <div className="a  col-lg-8 col-sm-12 col-xs-12">
              <div className="container _border">
                <div className="row">
                  <div className="col-3">
                    <img src="http://localhost:3000/male.jpg" />
                  </div>
                  <div className="col-9">
                    <div className="row user-info">
                      <h3>
                        Dr. {doctorDetail?.users.firstname} {doctorDetail?.users.lastname}
                      </h3>
                      <p>MEDICINE AND SURGERY</p>
                    </div>
                    <div className="actions ">
                      <button className="b1 btn btn-primary">
                        <Envelope style={{ marginRight: '2px', marginTop: '-3px' }} /> Ask A Query
                      </button>
                      <button className="b2 btn" onClick={() => setBookModal(!bookModal)}>
                        <Telephone style={{ marginRight: '2px', marginTop: '-3px' }} /> Book Online
                      </button>
                      {/* <button className="b2 btn">
                    <CameraVideo style={{ marginRight: '2px', marginTop: '-3px' }} /> Video Chat
                  </button> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <br />
                    <b>Professional Bio:</b>
                    <p>{doctorDetail?.professional_bio}</p>
                  </div>
                </div>
              </div>
              <div className="about-me row">
                <div className="b col-lg-6 col-sm-12 col-xs-12">
                  <div className="container _border">
                    <h3>Specialities</h3>
                    <hr />
                    <p>General Practitioner, Hypertension Management, Common Cold, ...</p>
                  </div>
                </div>
                <div className="b b4 col-lg-6 col-sm-12 col-xs-12">
                  <div className="container _border">
                    <h6>Experience</h6>
                    <h2>{doctorDetail?.yearsofexperience} Years</h2>
                    <br />
                    <h6>Languages</h6>
                    <h2>English</h2>
                    <br />
                    <h6>Fee</h6>
                    <h2>{`₦ ${doctorDetail?.consultation_fee}`}</h2>
                  </div>
                </div>
                <div className="bio row">
                  <div className="c col-lg-12 col-sm-12 col-xs-12">
                    <div className="container _border">
                      <h3>Professional Bio</h3>
                      <hr />
                      <p>
                        Dr.Ezinne Okeoma is a General Practitioner and a Family Physician with five
                        years of clinical experience. She completed her MBBS at the University of
                        Nigeria, Nsukka. She treats people of all ages with various medical
                        conditions and is experienced as a primary-care doctor to treat patients
                        with short and long-term illnesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d col-lg-4 col-sm-12 col-xs-12 mb-4">
              {getWindowDimensions().width >= 768 ? (
                <div className="chat_list">
                  <ChatBox
                    user={user}
                    name={`${doctorDetail?.users.firstname} ${doctorDetail?.users.lastname}`}
                    chat_messages={chatMessages}
                    closeChat={closeChat}
                    type={`small`}
                    userId={userId}
                  />
                </div>
              ) : (
                <>
                  <div className="mb-3 text-center">
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => setMobileChat(!mobileChat)}
                    >
                      <Chat size={25} color="white" className="mr-2" />
                      {`${mobileChat ? ' Close Chat With Doctor' : ' Open Chat With Doctor'}`}
                    </button>
                  </div>
                  <_style>
                    <div className={`chat_list ${mobileChat ? 'show' : ''}`}>
                      <ChatBox
                        user={user}
                        name={`${doctorDetail?.users.firstname} ${doctorDetail?.users.lastname}`}
                        chat_messages={chatMessages}
                        closeChat={closeChat}
                        type={`small`}
                        userId={userId}
                      />
                    </div>
                  </_style>
                </>
              )}
            </div>
          </div>
        </div>
        {bookModal && (
          <BookAppointmentForm
            user_id={_user.user.id}
            consultation_fee={doctorDetail?.consultation_fee}
            spec_id={state.specialization_id}
            doctorId={doctorDetail?.id}
            setShowModal={setBookModal}
            setIsloadingOverlay={setIsLoading}
          />
        )}
      </>
    </LoadingOverlay>
  );
};
export default DoctorDetails;
