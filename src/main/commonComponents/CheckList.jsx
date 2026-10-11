import PropTypes from 'prop-types';
import styled from 'styled-components';

import InputLabel from './InputLabel';
import {fieldsetResetStyles} from './formFieldStyles';

const CheckListStyle = styled.fieldset`
  ${fieldsetResetStyles}

  .option {
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }

  input {
    flex-shrink: 0;
    height: 18px;
    margin: 2px 0 0;
    width: 18px;
  }
`;

// Checkboxes grouped under one label. The value is a Set of the checked
// option values.
function CheckList(props) {
  const {id, label, onChange, options, value: propValue} = props;

  return (
    <CheckListStyle className="check-list">
      {label && <InputLabel as="legend">{label}</InputLabel>}
      {options.map(({label: optionLabel, value: optionValue}) => (
        <label className="option" key={optionValue}>
          <input
            checked={propValue.has(optionValue)}
            id={`${id}-${optionValue}`}
            name={id}
            onChange={(event) => {
              const newValue = new Set(propValue);
              if (newValue.has(optionValue)) {
                newValue.delete(optionValue);
              } else {
                newValue.add(optionValue);
              }

              onChange(newValue, id, event);
            }}
            type="checkbox"
            value={optionValue}
          />
          <span>{optionLabel}</span>
        </label>
      ))}
    </CheckListStyle>
  );
}

CheckList.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.instanceOf(Set).isRequired,
};

export default CheckList;
