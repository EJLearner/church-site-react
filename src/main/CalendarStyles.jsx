import styled from 'styled-components';
import {LOGICAL_COLORS, WIDTHS} from '../utils/styleVariables';

const CalendarStyles = styled.div`
  .calendar-page {
    padding: 1em ${WIDTHS.SIDE_CONTENT_PADDING};

    h1 {
      color: ${LOGICAL_COLORS.CT_PRIMARY}
      font-family: $century-gothic;
      font-weight: normal;
    }
  }



  #calendar-div {
    margin: 0 auto;
    padding: 0 1em 1em 1em;
  }

  .controls-and-title {
    align-items: center;
    display: flex;
    justify-content: space-between;

    .drop-downs {
      width: 300px;
    }

    .month-arrows {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .month-arrows h2 {
      font-weight: normal;
      margin: 0.8em 1em;
      width: 150px;
      text-align: center;
    }

    .empty-space {
      width: 300px;
    }
    button {
      // would rather use "initial" but that doesn't work for IE11
      background-color: $standard-background;
      border: none;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .month-calendar-table {
    border-collapse: collapse;
    box-sizing: border-box;
    width: 100%;

    th,
    td {
      border: 3px solid $standard-background;
      padding: 5px;
    }

    th {
      font-weight: normal;
    }

    td.other-month {
      color: $gray180;
    }

    td {
      background-color: $peach;
      height: 75px;
      width: 150px;
    }

    td > div {
      width: 100%;
      height: 100%;
      padding: 5px;
    }

    td > div .date-area {
      padding-bottom: 8px;
    }

    td > div .events-area {
      font-size: 11px;
      height: 38px;
      overflow-y: auto;
    }
  }

  .year-calendar-content {
    margin: auto;

    h2 {
      font-weight: normal;
      text-align: center;
      margin-bottom: 0;
    }
  }

  .year-calendar-months-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .yearly-calendar-month-wrapper {
    margin: 1em;
  }
`;

export default CalendarStyles;
