import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ERROR_COLOR} from './formFieldStyles';

const LabelStyle = styled.label`
  font-size: 14px;
  display: block;
  margin-bottom: 0.5em;

  &.inline {
    display: inline;
    margin-right: 1em;
  }

  .required-mark {
    color: ${ERROR_COLOR};
    margin-left: 2px;
  }
`;

// Pass as="legend" to label a fieldset of related inputs
function InputLabel(props) {
  const {as, className, inline = false, children, required} = props;

  return (
    <LabelStyle
      as={as}
      className={[inline ? 'inline' : 'block', className]
        .filter(Boolean)
        .join(' ')}
      htmlFor={as ? undefined : props.htmlFor}
      id={props.id}
    >
      {children}
      {/* Inputs mark themselves as required for screen readers */}
      {required && (
        <span aria-hidden="true" className="required-mark">
          *
        </span>
      )}
    </LabelStyle>
  );
}

InputLabel.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputLabel;
