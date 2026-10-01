import PropTypes from 'prop-types';

function CheckList(props) {
  const {options, onChange, id, value: propValue} = props;

  return (
    <>
      {options.map(({label: optionLabel, value: optionValue}) => {
        return (
          <div key={optionValue}>
            <label>
              <input
                checked={propValue.has(optionValue)}
                id={`${id}${optionValue}`}
                name={id}
                onChange={() => {
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
              {optionLabel}
            </label>
          </div>
        );
      })}
    </>
  );
}

CheckList.propTypes = {
  id: PropTypes.string.isRequired,
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
