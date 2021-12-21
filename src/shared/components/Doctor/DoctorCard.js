import { useHistory } from 'react-router-dom';
import { Star, StarFill } from 'react-bootstrap-icons';
import { pin, star, avatar } from '../../../EntryFile/images';
import { Doctor } from './index';
import Rating from 'react-rating';
export const DoctorCard = ({ image, ...props }) => {
  const { push } = useHistory();
  const { doctors } = props;
  console.log(props);
  return (
    <Doctor>
      <Doctor.ImageContentWrapper
        Image={doctors.users.avatar == null ? avatar : doctors.users.avatar}
      >
        <Doctor.OnlineHolder>
          <Doctor.Online OnlineNotification={doctors?.availability}>
            {doctors?.availability == 'online' ? 'Online' : 'Offline'}
          </Doctor.Online>
        </Doctor.OnlineHolder>
        <Doctor.DetailsHolder>
          <Doctor.Details>
            <Doctor.Name>
              {doctors?.users.firstname} {doctors?.users.lastname}
            </Doctor.Name>
            <Doctor.Role>{doctors?.ratercount}</Doctor.Role>
            <div className="d-flex">
              <div className="d-flex align-items-center mr-2">
                <img src={star} /> <Doctor.Visits>{doctors.ratings}</Doctor.Visits>
              </div>
              <div className="d-flex align-items-center">
                <img src={pin} /> <Doctor.Pin>{doctors.users.city}</Doctor.Pin>
              </div>
            </div>
          </Doctor.Details>
        </Doctor.DetailsHolder>
      </Doctor.ImageContentWrapper>
      <Doctor.BookButtonWrapper className="mt-2">
        <Doctor.Ratings>
          {/* <StarFill color="yellow" size={42} /> */}
          <Rating
            initialRating={parseInt(doctors.ratings)}
            start={0}
            stop={5}
            fractions={2}
            emptySymbol={<Star size={22} color="orange" />}
            fullSymbol={<StarFill size={22} color="orange" />}
            readonly={true}
          />
        </Doctor.Ratings>
        <Doctor.BookButton
          // to={`/doctor-details/${props.doctor_id}`}
          onClick={() =>
            push({
              pathname: '/doctor-details',
              state: {
                id: props.doctor_id,
                specialization_id: props.specialization_id,
              },
            })
          }
        >
          View
        </Doctor.BookButton>
      </Doctor.BookButtonWrapper>
    </Doctor>
  );
};
