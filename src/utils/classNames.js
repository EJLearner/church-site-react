const classNames = function() {
  return [...arguments]
    .reduce((accumulator, current, index) => {
      if (current) {
        accumulator.push(current);
      }

      return accumulator;
    }, [])
    .join(' ');
};

export default classNames;
