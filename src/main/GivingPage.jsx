import React, {useState} from 'react';
import styled from 'styled-components';

import routePaths from '../routePaths';
import {FONT_FAMILIES, COLORS} from '../utils/styleVariables';

import AboveContentLinks from './commonComponents/AboveContentLinks';
import Button from './commonComponents/Button/Button';
import ContentAndSides from './commonComponents/ContentAndSides';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import PlainButton from './commonComponents/PlainButton';
import Select from './commonComponents/Select';
import SelectState from './commonComponents/SelectState';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import Textbox from './commonComponents/Textbox';
import TopInfoBox from './commonComponents/TopInfoBox';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';

const AddAnotherTypeWrapper = styled.div`
  color: ${COLORS.GRAY180};
  font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
  margin-top: 15px;
`;

const givingType = 'tithing';

const USE_TEST_DATA = false;

const testUserInfo = {
  address1: 'My Address',
  address2: 'Address Line 2',
  city: 'City',
  email: 'test@somethwere.com',
  first_name: 'First',
  last_name: 'Last',
  night_phone_a: '4109440396',
  state: 'MD',
  zip: '21216'
};

const donationTypeOptions = [
  {label: 'Audio/Visual Ministry', value: 'audovisual'},
  {label: 'Tithes', value: 'tithes'},
  {label: 'General Offering', value: 'general'},
  {label: 'Benevolence', value: 'benevolence'},
  {label: 'Building Fund', value: 'building'},
  {label: 'Outreach', value: 'outreach'},
  {label: 'Missions', value: 'missions'},
  {label: 'Sunday School', value: 'sunday-school'},
  {label: 'Donation', value: 'donation'},
  {label: 'William Bryant Scholarship Fund', value: 'scholarship'},
  {label: 'Youth Ministry', value: 'youth'}
];

const initialDonationTypeInfo = donationTypeOptions.map((option, index) => {
  return index
    ? {}
    : {amount: USE_TEST_DATA ? '10.00' : undefined, type: option.value};
});

const getCurrentSelectOptions = (selectedValue, amounts) => {
  return donationTypeOptions.filter((option) => {
    const selectedByThisSelect = option.value === selectedValue;
    const selectedValues = amounts.map(({type}) => type).filter(Boolean);
    const selectedByAnySelect = selectedValues.includes(option.value);

    return selectedByThisSelect || !selectedByAnySelect;
  });
};

const GivingPage = () => {
  const [userInfo, setUserInfo] = useState(USE_TEST_DATA ? testUserInfo : {});
  const [amounts, setAmounts] = useState(initialDonationTypeInfo);

  const setUserInfoProp = (value, id) => {
    setUserInfo((currentUserInfo) => ({...currentUserInfo, [id]: value}));
  };

  const setPaymentInfo = (value, index, prop) => {
    setAmounts((currentPaymentInfo) => {
      if (!currentPaymentInfo[index]) {
        currentPaymentInfo[index] = {};
      }
      currentPaymentInfo[index][prop] = value;

      return [...currentPaymentInfo];
    });
  };

  const setPaymentAmount = (value, index) => {
    setAmounts((currentPaymentInfo) => {
      currentPaymentInfo[index].amount = value;

      return [...currentPaymentInfo];
    });
  };

  const renderStateSelect = (id) => {
    return (
      <>
        <SelectState
          id={id}
          onChange={(value) => setUserInfoProp(value, id)}
          value={userInfo[id] ?? ''}
        />
        <br />
      </>
    );
  };

  const renderTextbox = (id, label, options = {}) => {
    const {type, required} = options;

    return (
      <>
        <Textbox
          id={id}
          label={label}
          onChange={(value) => setUserInfoProp(value, id)}
          required={required}
          size={40}
          type={type}
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
          onChange={(value) => setPaymentAmount(value, index)}
          required={required}
          size={40}
          value={amounts[index].amount ?? ''}
        />
        <br />
      </>
    );
  };

  const renderPaymentboxes = (paymentInfo) => {
    return paymentInfo
      .filter((paymentItem) => paymentItem.type)
      .map((paymentItem, index) => {
        const currentNumber = index + 1;
        const droplistId = `item_name_${currentNumber}`;

        const dropListOptions = getCurrentSelectOptions(
          paymentItem.type,
          amounts
        );

        return (
          <div className="" key={index}>
            {renderPaymentAmount(index, true)}
            <Select
              id={droplistId}
              label="Giving Type"
              onChange={(value) => setPaymentInfo(value, index, 'type')}
              options={dropListOptions}
              value={paymentItem.type}
            />
          </div>
        );
      });
  };

  const addPaymentOption = (firstUnusedType, event) => {
    const unusedPaymentItemIndex = amounts.findIndex((amount) => !amount.type);
    setPaymentInfo(firstUnusedType, unusedPaymentItemIndex, 'type');

    event.preventDefault();
  };

  const renderHiddenTextbox = (name, value) => {
    return <input name={name} type="hidden" value={value} />;
  };

  const usedTypes = amounts.map((amount) => amount.type).filter(Boolean);
  const firstUnusedType = donationTypeOptions.find(
    (option) => !usedTypes.includes(option.value)
  )?.value;

  const renderTithingFields = () => {
    return (
      <>
        {renderHiddenTextbox('cmd', '_cart')}
        {renderHiddenTextbox('upload', '1')}
        {renderPaymentboxes(amounts)}

        {Boolean(firstUnusedType) && (
          <AddAnotherTypeWrapper>
            <PlainButton
              className="add-another"
              onClick={(event) => addPaymentOption(firstUnusedType, event)}
            >
              + Add another donation type
            </PlainButton>
          </AddAnotherTypeWrapper>
        )}
      </>
    );
  };

  const boxNum = userInfo.box;

  const topInfoBoxContent = (
    <>
      <h1>Giving</h1>
      <p>
        <i>
          “You can’t beat God’s giving, no matter how you try. For just as sure
          as you are living and the Lord is in heaven on high; the more you
          give, the more He gives to you. But keep on giving because it’s really
          true, that you can’t beat God’s giving, no matter how you try.”
        </i>
      </p>
      <p>
        We thank you for remaining faithful in your giving. You can place your
        offering by completing the form below, by mailing your offering to The
        City Temple of Baltimore (Baptist), 317 Dolphin Street, Baltimore, MD
        21217, or by using cash tag $citytemple317 through CashApp. For City
        Temple church members, if you choose the CashApp option, please remember
        to include your envelope number in the memo line.
      </p>
    </>
  );

  const givingPageContent = (
    <>
      <h2>Giving</h2>
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
        {renderStateSelect('state')}
        {renderTextbox('zip', 'Zipcode')}
        {renderTextbox('night_phone_a', 'Phone')}
        {renderTextbox('email', 'Email', {required: true, type: 'email'})}
        {renderTextbox('box', 'Box #')}
        {boxNum && renderHiddenTextbox('custom', `Box: ${boxNum}`)}
        {renderHiddenTextbox('business', 'giving@thecitytemple.org')}
        {renderHiddenTextbox('return', 'https://www.thecitytemple.org')}
        {renderHiddenTextbox('cancel_return', 'https://www.thecitytemple.org')}
        {renderHiddenTextbox('no_shipping', '1')}

        {givingType === 'tithing' && renderTithingFields()}
        <div>
          <br />
          <Button name="submit" type="submit" value="Continue">
            Continue
          </Button>
        </div>
      </form>
    </>
  );

  return (
    <StandardPageWrapper>
      <TopInfoBoxWrapper>
        <TopInfoBox>{topInfoBoxContent}</TopInfoBox>
      </TopInfoBoxWrapper>
      <ContentAndSubCompassWrapper>
        <AboveContentLinks
          pagePath={routePaths.MAIN_GIVING}
          pageTitle="Giving"
        />
        <ContentAndSides>
          <ContentLeftSide>
            <div />
          </ContentLeftSide>
          <ContentWrapper>{givingPageContent}</ContentWrapper>
          <ContentRightSide />
        </ContentAndSides>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default GivingPage;
