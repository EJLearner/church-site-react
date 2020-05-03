import React from 'react';

import calendarThumb from '../../assets/main/images/calendar-thumb.png';
import StoreItem from '../../common/components/StoreItem';

function StoreContent(props) {
  return (
    <div>
      <h2>Store</h2>
      <div>
        <StoreItem
          cost={25}
          id="calendar"
          imgSource={calendarThumb}
          name="Jubilee Edition 2020 Calendar"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default StoreContent;
