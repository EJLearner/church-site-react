import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: 14px;
  display: block;
  margin-bottom: 0.5em;

  &.inline {
    display: inline;
    margin-right: 1em;
  }
`;

function InputLabel(props) {
  const {inline = false, children, required} = props;

  return (
    <LabelStyle
      className={inline ? 'inline' : 'block'}
      htmlFor={props.htmlFor}
      id={props.id}
    >
      {children}
      {required && '*'}
    </LabelStyle>
  );
}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputLabel;
