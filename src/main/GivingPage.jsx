import React, {useState} from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Textbox from '../common/components/Textbox';
import Button from '../ce/components/Reusable/Button/Button';
import Droplist from '../ce/components/Reusable/Droplist/Droplist';

const borderColor = 'gray';
const givingType = 'tithing';

const GivingPageStyledDiv = styled.div`
  .content-and-sub-compass {
    background-color: white;
    border: 1px solid ${borderColor};
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-sides {
    border-top: 1px solid ${borderColor};
    display: flex;
  }

  .side-times {
    font-size: 13.33px;
    padding: 1em;

    h2 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      margin-bottom: 0;
      font-size: 110%;
    }
  }

  .content {
    background-color: ${COLORS.WHITE};
    border-left: 1px solid ${borderColor};
    padding: 1em;
    width: 70%;

    h1 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      text-transform: uppercase;
    }
  }
`;

function renderLeftSideInfo() {
  return (
    <div className="side-times">
      <h2>Keep An Account</h2>
    </div>
  );
}

const donationTypeOptions = [
  {label: 'General Church Fund', value: 'general'},
  {label: 'Outreach', value: 'outreach'},
  {label: 'William Bryant Scholarship Fund', value: 'scholarship'},
  {label: 'Youth Ministry', value: 'youth'},
  {label: 'Sowing Seeds', value: 'seeds'}
];

const initialDonationTypeInfo = donationTypeOptions.map((option, index) => {
  return index ? {} : {type: option.value};
});

const getCurrentDroplistOptions = (selectedValue, amounts) => {
  return donationTypeOptions.filter(option => {
    const selectedByThisDroplist = option.value === selectedValue;
    const selectedValues = amounts.map(({type}) => type).filter(Boolean);
    const selectedByAnyDroplist = selectedValues.includes(option.value);

    return selectedByThisDroplist || !selectedByAnyDroplist;
  });
};

const GivingPage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [amounts, setAmounts] = useState(initialDonationTypeInfo);

  const setUserInfoProp = (value, id) => {
    setUserInfo(currentUserInfo => ({...currentUserInfo, [id]: value}));
  };

  const setPaymentInfo = (value, index, prop) => {
    setAmounts(currentPaymentInfo => {
      if (!currentPaymentInfo[index]) {
        currentPaymentInfo[index] = {};
      }
      currentPaymentInfo[index][prop] = value;

      return [...currentPaymentInfo];
    });
  };

  const setPaymentAmount = (value, index) => {
    setAmounts(currentPaymentInfo => {
      currentPaymentInfo[index].amount = value;

      return [...currentPaymentInfo];
    });
  };

  const renderTextbox = (id, label, required) => {
    return (
      <>
        <Textbox
          id={id}
          label={label}
          onChange={value => setUserInfoProp(value, id)}
          required={required}
          size={40}
          value={userInfo[id] ?? ''}
        />
        <br />
      </>
    );
  };

  const renderPaymentAmount = (index, required) => {
    const currentNumber = index + 1;

    return (
      <>
        <Textbox
          id={`amount_${currentNumber}`}
          label="Amount"
          onChange={value => setPaymentAmount(value, index)}
          required={required}
          size={40}
          value={amounts[index].amount ?? ''}
        />
        <br />
      </>
    );
  };

  const renderPaymentboxes = paymentInfo => {
    return paymentInfo
      .filter(paymentItem => paymentItem.type)
      .map((paymentItem, index) => {
        const currentNumber = index + 1;
        const droplistId = `item_name_${currentNumber}`;

        const dropListOptions = getCurrentDroplistOptions(
          paymentItem.type,
          amounts
        );

        return (
          <div key={index}>
            {renderPaymentAmount(index, true)}
            <Droplist
              id={droplistId}
              onChange={value => setPaymentInfo(value, index, 'type')}
              options={dropListOptions}
              value={paymentItem.type}
            />
          </div>
        );
      });
  };

  const addPaymentOption = (firstUnusedType, event) => {
    const unusedPaymentItemIndex = amounts.findIndex(amount => !amount.type);
    setPaymentInfo(firstUnusedType, unusedPaymentItemIndex, 'type');

    event.preventDefault();
  };

  const renderHiddenTextbox = (name, value) => {
    return <input name={name} type="hidden" value={value} />;
  };

  const usedTypes = amounts.map(amount => amount.type).filter(Boolean);
  const firstUnusedType = donationTypeOptions.find(
    option => !usedTypes.includes(option.value)
  )?.value;

  const renderTithingFields = () => {
    return (
      <>
        {renderPaymentboxes(amounts)}

        {Boolean(firstUnusedType) && (
          <div>
            <Button onClick={event => addPaymentOption(firstUnusedType, event)}>
              Add another payment type
            </Button>
          </div>
        )}
      </>
    );
  };

  const boxNum = userInfo.box;

  return (
    <GivingPageStyledDiv>
      <MainMenubar />
      <div className="content-and-sub-compass">
        <div className="compass">
          <AboveContentLinks pageTitle="Giving" />
        </div>
        <div className="content-and-sides">
          {renderLeftSideInfo()}
          <div className="content">
            <h1>Giving</h1>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              name="validform"
            >
              {renderTextbox('first_name', 'First Name')}
              {renderTextbox('last_name', 'Last Name')}
              {renderTextbox('address1', 'Street Address')}
              {renderTextbox('address2', 'Street Address cont.')}
              {renderTextbox('city', 'City')}
              {renderTextbox('state', 'State')}
              {renderTextbox('zip', 'Zipcode')}
              {renderTextbox('phone', 'Phone')}
              {renderTextbox('email', 'Email', true)}
              {renderTextbox('box', 'Box #')}
              {boxNum && renderHiddenTextbox('custom', `Box: ${boxNum}`)}
              {renderHiddenTextbox('business', 'giving@thecitytemple.org')}
              {renderHiddenTextbox('return', 'https://www.thecitytemple.org')}
              {renderHiddenTextbox('no_shipping', '1')}

              {givingType === 'tithing' && renderTithingFields()}
              <div>
                <input name="submit" type="submit" value="Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </GivingPageStyledDiv>
  );
};

export default GivingPage;
