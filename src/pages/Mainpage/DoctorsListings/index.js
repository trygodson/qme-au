import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarFill } from 'react-bootstrap-icons';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { doctorImage } from '../../../EntryFile/images';
import { doctorMockData } from '../../../mockData/doctor';
import { Doctor } from '../../../shared/components/Doctor';
import { DoctorCard } from '../../../shared/components/Doctor/DoctorCard';
import { Navbar } from '../../../shared/components/header/Navbar';
import './doctorsListings.scss';
import api from '../../../utils/api';
import { ApiEndpoints, BASE_URL } from '../../../shared/config/Endpoints';
import axios from 'axios';

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

const DoctorsListing = () => {
  const [orderBy, setOrderBy] = useState({});
  const [expertise, setExpertise] = useState({});
  const [gender, setGender] = useState({});
  const [pageCount, setpageCount] = useState(10);
  const [allSpecializationData, setAllSpecializationData] = useState(null);
  const { specializationId } = useParams();

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

  useEffect(() => {
    async function specData() {
      const res = await axios.get(`${BASE_URL}doctorsearch?specialization_id=${specializationId}`);
      console.log(res);
      setAllSpecializationData(res.data);
    }

    specData();
  }, []);

  const paginatePage = async ({ selected }) => {
    const res = await axios.get(
      `${BASE_URL}doctorsearch?specialization_id=${specializationId}&page=${selected + 1}`,
    );
    setAllSpecializationData(res.data);
  };

  return (
    <div className="doctor-list-wrapper">
      {/* <Navbar style={{ position: 'relative' }} /> */}
      <div className="doctors-list-inner-wrapper">
        <div className="sort-list-wrapper">
          <div className="sort-list">
            {/* <div className="row ">
              <div className="col-lg-2 p-lg-3 mb-3">
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
              <div className="col-lg-2  p-lg-3 mb-3">
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
              <div className="col-lg-2  p-lg-3 mb-3">
                <Select
                  options={Gender}
                  styles={customStyles}
                  onChange={setGender}
                  theme={customTheme}
                  isSearchable
                  placeholder="Gender"
                />
              </div>
              <div className="col-lg-6  p-lg-3">
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
            </div> */}
          </div>
        </div>
        <div className="my-5">
          <div className="row">
            {allSpecializationData != null &&
              allSpecializationData.data.map((doc, i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-3 text-center">
                  <DoctorCard image={doctorImage} {...doc} className="mx-auto" />
                </div>
              ))}
          </div>
          <div className="mt-5">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={Math.ceil(allSpecializationData?.total / allSpecializationData?.per_page)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={paginatePage}
              containerClassName={'pagination justify-content-center'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsListing;
