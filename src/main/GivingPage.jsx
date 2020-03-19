import React, {useState} from 'react';
import Textbox from '../common/components/Textbox';
import Button from '../ce/components/Reusable/Button/Button';
import Droplist from '../ce/components/Reusable/Droplist/Droplist';
import SelectState from '../common/components/SelectState';
import PlainButton from './commonComponents/PlainButton';
import routePaths from '../routePaths';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';
import TopInfoBoxWrapper from './commonComponents/TopInfoBoxWrapper';
import MainMenubar from './MainMenubar';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import TopInfoBox from './commonComponents/TopInfoBox';
import ContentLeftSide from './commonComponents/ContentLeftSide';
import ContentWrapper from './commonComponents/ContentWrapper';
import ContentRightSide from './commonComponents/ContentRightSide';
import ContentAndSides from './commonComponents/ContentAndSides';

import styled from 'styled-components';
import {FONT_FAMILIES, COLORS} from '../utils/styleVariables';

const AddAnotherTypeWrapper = styled.div`
  color: ${COLORS.GRAY180};
  font-family: ${FONT_FAMILIES.CENTURY_GOTHIC};
  margin-top: 15px;
`;

const givingType = 'tithing';

const USE_TEST_DATA = false;

const testUserInfo = {
  first_name: 'First',
  last_name: 'Last',
  address1: 'My Address',
  address2: 'Address Line 2',
  city: 'City',
  night_phone_a: '4109440396',
  state: 'MD',
  zip: '21216',
  email: 'test@somethwere.com'
};

const donationTypeOptions = [
  {label: 'Tithes', value: 'tithes'},
  {label: 'General Offering', value: 'general'},
  {label: 'Benevolence', value: 'benevolence'},
  {label: 'Building Fund', value: 'building'},
  {label: 'Outreach', value: 'outreach'},
  {label: 'Missions', value: 'missions'},
  {label: 'Donation', value: 'donation'},
  {label: 'William Bryant Scholarship Fund', value: 'scholarship'},
  {label: 'Youth Ministry', value: 'youth'},
  {label: 'Sowing Seeds', value: 'seeds'}
];

const initialDonationTypeInfo = donationTypeOptions.map((option, index) => {
  return index
    ? {}
    : {type: option.value, amount: USE_TEST_DATA ? '10.00' : undefined};
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
  const [userInfo, setUserInfo] = useState(USE_TEST_DATA ? testUserInfo : {});
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

  const renderStateSelect = id => {
    return (
      <>
        <SelectState
          id={id}
          onChange={value => setUserInfoProp(value, id)}
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
          onChange={value => setUserInfoProp(value, id)}
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
          <div className="" key={index}>
            {renderPaymentAmount(index, true)}
            <Droplist
              id={droplistId}
              label="Giving Type"
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
        {renderHiddenTextbox('cmd', '_cart')}
        {renderHiddenTextbox('upload', '1')}
        {renderPaymentboxes(amounts)}

        {Boolean(firstUnusedType) && (
          <AddAnotherTypeWrapper>
            <PlainButton
              className="add-another"
              onClick={event => addPaymentOption(firstUnusedType, event)}
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
        When Abram gave the king of Salem, Melchizedek, a tenth of his
        possessions, he did it not to invoke God’s blessing, but in response to
        God’s blessings. The generosity we show God and the spirit in which we
        give are reflections of the gratitude we have for all He has done for
        us. Tithes and offerings also have the very practical purpose of
        providing a source of income for the church to operate and fulfill its
        missions. City Temple thanks you for your open-hearted generosity and
        contributions to its kingdom-building efforts.
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
      <MainMenubar />
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
