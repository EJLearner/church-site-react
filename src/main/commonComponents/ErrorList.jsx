import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ErrorList = (props) => {
  const errorList = props.errors.map((error, index) => {
    return <li key={index}>{error.message}</li>;
  });

  return (
    <div className="error-list">
      <FontAwesomeIcon icon={faExclamationTriangle} />
      Oops, there were some errors!
      <ul>{errorList}</ul>
    </div>
  );
};

ErrorList.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ErrorList;
