import React, {useState} from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Textbox from '../common/components/Textbox';
import Button from '../ce/components/Reusable/Button/Button';
import Droplist from '../ce/components/Reusable/Droplist/Droplist';

const borderColor = 'gray';

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

const makePayment = (name, emailAddress, messageFromuser) => {};

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
  const object = {key: `amount-${index + 1}-type`};

  if (!index) {
    object.type = option.value;
  }

  return object;
});

const GivingPage = () => {
  const [userInfo, setUserInfo] = useState(initialDonationTypeInfo);
  const [amounts, setAmounts] = useState(initialDonationTypeInfo);

  const setUserInfoProp = (value, id) => {
    setUserInfo(currentUserInfo => ({...currentUserInfo, [id]: value}));
  };

  const setPaymentAmount = (value, index) => {
    setAmounts(currentPaymentInfo => {
      currentPaymentInfo[index].amount = value;

      return [...currentPaymentInfo];
    });
  };

  const setPaymentType = (value, index) => {
    setAmounts(currentPaymentInfo => {
      currentPaymentInfo[index].type = value;

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
          id={`amount-${currentNumber}-amount`}
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
        const droplistId = `amount-${currentNumber}-type`;
        return (
          <div key={index}>
            {renderPaymentAmount(index, true)}
            <Droplist
              id={droplistId}
              onChange={value => setPaymentType(value, index)}
              options={donationTypeOptions}
              value={paymentItem.type}
            />
          </div>
        );
      });
  };

  const addPaymentOption = () => {
    const unusedPaymentItemIndex = amounts.findIndex(amount => !amount.type);
    const usedTypes = amounts.map(amount => amount.type).filter(Boolean);
    const firstUnusedType = donationTypeOptions.find(
      option => !usedTypes.includes(option.value)
    )?.value;
    setPaymentType(firstUnusedType, unusedPaymentItemIndex);
  };

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
            {renderTextbox('first-name', 'First Name')}
            {renderTextbox('last-name', 'Last Name')}
            {renderTextbox('address', 'Street Address')}
            {renderTextbox('address-cont', 'Street Address cont.')}
            {renderTextbox('city', 'City')}
            {renderTextbox('state', 'State')}
            {renderTextbox('zip-code', 'Zipcode')}
            {renderTextbox('phone', 'Phone')}
            {renderTextbox('email', 'Email', true)}
            {renderTextbox('box', 'Box #')}
            {renderPaymentboxes(amounts)}
            <div>
              <Button onClick={() => addPaymentOption()}>
                Add another payment type
              </Button>
            </div>
            <div>
              <Button onClick={() => makePayment(amounts)}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </GivingPageStyledDiv>
  );
};

export default GivingPage;
