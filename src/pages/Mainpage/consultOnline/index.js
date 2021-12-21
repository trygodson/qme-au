import { useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { doctorImage } from '../../../EntryFile/images';
import { doctorMockData } from '../../../mockData/doctor';
import { Doctor } from '../../../shared/components/Doctor';
import { DoctorCard } from '../../../shared/components/Doctor/DoctorCard';
import { Navbar } from '../../../shared/components/header/Navbar';
import './doctorsListings.scss';

const OrderBy = [
  {
    value: 'age',
    label: 'Age',
  },
  {
    value: 'experience',
    label: 'Experience',
  },
  {
    value: 'sex',
    label: 'Sex',
  },
];
const Expertise = [
  {
    value: 'surgery',
    label: 'Surgeon',
  },
  {
    value: 'cardiac',
    label: 'Cardiac',
  },
  {
    value: 'orthopedic',
    label: 'Orthopedic',
  },
];
const Gender = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'others',
    label: 'Others',
  },
];

const ConsultOnline = () => {
  const [orderBy, setOrderBy] = useState({});
  const [expertise, setExpertise] = useState({});
  const [gender, setGender] = useState({});
  const customTheme = theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
      },
    };
  };
  const customStyles = {
    control: provided => ({
      ...provided,
      backgroundColor: '#fff',
      border: 'none', // tried border: 'none'
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: '#fff',
      border: 'none', // tried border: 'none'
    }),
    option: provided => ({
      ...provided,
      border: 'none',
      backgroundColor: 'white', // tried border: 'none'
    }),
  };

  return (
    <div className="doctor-list-wrapper">
      <Navbar style={{ position: 'relative' }} />
      <div className="doctors-list-inner-wrapper">
        <div className="sort-list-wrapper">
          <div className="sort-list">
            <div className="row ">
              <div className="col-lg-2 mb-3">
                <Select
                  options={OrderBy}
                  styles={customStyles}
                  onChange={setOrderBy}
                  theme={customTheme}
                  isSearchable
                  placeholder="Order By"
                  className="mb-lg-3"
                />
              </div>
              <div className="col-lg-2 mb-3">
                <Select
                  options={Expertise}
                  onChange={setExpertise}
                  styles={customStyles}
                  theme={customTheme}
                  isSearchable
                  placeholder="Expertise"
                  className="mb-lg-3"
                />
              </div>
              <div className="col-lg-2 mb-3">
                <Select
                  options={Gender}
                  styles={customStyles}
                  onChange={setGender}
                  theme={customTheme}
                  isSearchable
                  placeholder="Gender"
                />
              </div>
              <div className="col-lg-6">
                <div className="search-form-wrapper">
                  <form>
                    <div className="form-wrap">
                      <div className="input-wrapper">
                        <input placeholder="Search Doctors and Illness" type="text" />
                      </div>
                      <button className="button">search</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="row">
            {doctorMockData.map((doc, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-3 text-center">
                <DoctorCard image={doctorImage} {...doc} className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultOnline;
