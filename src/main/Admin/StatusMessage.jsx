import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ERROR_COLOR} from '../commonComponents/formFieldStyles';

const StyledStatusMessage = styled.div`
  border-left: 4px solid;
  border-radius: 4px;
  font-weight: bold;
  margin: 1em 0;
  padding: 0.75em 1em;

  &.success {
    background-color: rgb(232, 245, 233);
    border-color: green;
    color: rgb(27, 94, 32);
  }

  &.error {
    background-color: rgb(253, 236, 234);
    border-color: ${ERROR_COLOR};
    color: ${ERROR_COLOR};
  }
`;

// Confirmation or error shown after an admin action; renders nothing when
// there is no status
function StatusMessage({status}) {
  if (!status) return null;
  const {type, text} = status;
  return (
    <StyledStatusMessage
      className={type}
      role={type === 'error' ? 'alert' : 'status'}
    >
      {text}
    </StyledStatusMessage>
  );
}

StatusMessage.propTypes = {
  status: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
  }),
};

export default StatusMessage;
