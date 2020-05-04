import React from 'react';
import styled from 'styled-components';

import anniversaryTicketThumb from '../../assets/main/images/anniversary-ticket-adult-thumb.png';
import calendarThumb from '../../assets/main/images/calendar-thumb.png';
import StoreItem from '../../common/components/StoreItem';

const StoreContentStyle = styled.div`
  .store-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

function StoreContent(props) {
  return (
    <StoreContentStyle>
      <h2>Store</h2>
      <div className="store-items">
        <StoreItem
          cost={25}
          id="jubilee-2020-calendar"
          imgSource={calendarThumb}
          name="Jubilee Edition 2020 Calendar"
          onClick={() => {}}
        />
        <StoreItem
          cost={15}
          id="50th-anniversary-shirt"
          imgSource={anniversaryTicketThumb}
          name="Anniversary Commemorative T-Shirt"
          onClick={() => {}}
        />
        <StoreItem
          cost={100}
          id="50th-anniversary-banquest-ticket-adult"
          imgSource={anniversaryTicketThumb}
          name="50th Anniversary Adult Banquet Ticket"
          onClick={() => {}}
        />
        <StoreItem
          cost={50}
          id="50th-anniversary-banquest-ticket-child"
          imgSource={anniversaryTicketThumb}
          name="50th Anniversary Child Banquet Ticket"
          onClick={() => {}}
        />
      </div>
    </StoreContentStyle>
  );
}

export default StoreContent;
