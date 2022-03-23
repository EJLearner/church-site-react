import React from 'react';
import styled from 'styled-components';

import CalendarMonth from '../../../main/commonComponents/Calendar/CalendarMonth';

const MONTH_DIV_ID = 'ce-calendar-month';

const CalendarMonthWrapper = styled.div`
  #${MONTH_DIV_ID} {
    max-width: 100%;
  }
`;

function CeCalendarMonth() {
  return (
    <CalendarMonthWrapper>
      <CalendarMonth id={MONTH_DIV_ID} isCe />
    </CalendarMonthWrapper>
  );
}

export default CeCalendarMonth;
