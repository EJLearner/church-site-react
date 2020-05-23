import TICKET_THUMB_SRC from '../../assets/main/images/anniversary-ticket-adult-thumb.png';
import CALENDAR_THUMB_SRC from '../../assets/main/images/calendar-thumb.png';
const SHIRT_50_ANNIVERSARY = '50th-anniversary-shirt';
const CALENDAR_2020 = 'jubilee-2020-calendar';
const TICKET_YOUTH_50_ANNIVERSARY = '50th-anniversary-banquest-ticket-child';
const TICKET_ADULT_50_ANNIVERSARY = '50th-anniversary-banquest-ticket-adult';

const STORE_ITEMS = {
  [SHIRT_50_ANNIVERSARY]: {
    thumbImageSource: TICKET_THUMB_SRC,
    id: SHIRT_50_ANNIVERSARY,
    label: 'Anniversary Commemorative T-Shirt'
  },
  [CALENDAR_2020]: {
    thumbImageSource: CALENDAR_THUMB_SRC,
    id: CALENDAR_2020,
    label: 'Jubilee Edition 2020 Calendar'
  },
  [TICKET_YOUTH_50_ANNIVERSARY]: {
    thumbImageSource: TICKET_THUMB_SRC,
    id: TICKET_YOUTH_50_ANNIVERSARY,
    label: '50th Anniversary Child Banquet Ticket'
  },
  [TICKET_ADULT_50_ANNIVERSARY]: {
    thumbImageSource: TICKET_THUMB_SRC,
    id: TICKET_ADULT_50_ANNIVERSARY,
    label: '50th Anniversary Adult Banquet Ticket'
  }
};

export {
  STORE_ITEMS,
  SHIRT_50_ANNIVERSARY,
  CALENDAR_2020,
  TICKET_YOUTH_50_ANNIVERSARY,
  TICKET_ADULT_50_ANNIVERSARY,
  TICKET_THUMB_SRC,
  CALENDAR_THUMB_SRC
};
