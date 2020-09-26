import PropTypes from 'prop-types';
import React from 'react';

import Button from '../ce/components/Reusable/Button/Button';
import Textbox from '../common/components/Textbox';

function WatchPageFilter({
  ids,
  searchInfo,
  setSearchInfo,
  onFilterClick,
  onResetClick
}) {
  const updateTextbox = (newValue, id) => {
    setSearchInfo({
      ...searchInfo,
      [id]: newValue
    });
  };

  return (
    <div className="filter">
      <Textbox
        id={ids.titleSearchId}
        label="Sermon Title"
        onChange={updateTextbox}
        onEnter={onFilterClick}
        value={searchInfo[ids.titleSearchId]}
      />
      <Textbox
        id={ids.preacherSearchId}
        label="Preacher"
        onChange={updateTextbox}
        onEnter={onFilterClick}
        value={searchInfo[ids.preacherSearchId]}
      />
      <Textbox
        id={ids.dateSearchId}
        label="Date"
        onChange={updateTextbox}
        onEnter={onFilterClick}
        placeholder="mm/dd/yyyy"
        value={searchInfo[ids.dateSearchId]}
      />
      <Textbox
        id={ids.scriptureSearchId}
        label="Scripture"
        onChange={updateTextbox}
        onEnter={onFilterClick}
        value={searchInfo[ids.scriptureSearchId]}
      />
      <Button onClick={onFilterClick}>Filter</Button>
      <Button onClick={onResetClick}>Clear</Button>
    </div>
  );
}

WatchPageFilter.propTypes = {
  ids: PropTypes.shape({
    titleSearchId: PropTypes.string.isRequired,
    preacherSearchId: PropTypes.string.isRequired,
    dateSearchId: PropTypes.string.isRequired,
    scriptureSearchId: PropTypes.string.isRequired
  }).isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired,
  searchInfo: PropTypes.object.isRequired,
  setSearchInfo: PropTypes.func.isRequired
};

export default WatchPageFilter;
