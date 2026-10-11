import PropTypes from 'prop-types';

function RadioList(props) {
  const {options, onChange, id, value: propValue} = props;

  const onButtonChange = (event) => {
    return onChange(event.target.value, id, event);
  };

  return (
    <>
      {options.map(({label: optionLabel, value: optionValue}) => {
        return (
          <label key={optionValue}>
            {optionLabel}
            <input
              checked={propValue === optionValue}
              id={`${id}${optionValue}`}
              name={id}
              onChange={onButtonChange}
              type="radio"
              value={optionValue}
            />
          </label>
        );
      })}
    </>
  );
}

RadioList.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string,
};

export default RadioList;
