import React, {useState} from 'react';
import styled from 'styled-components';

import {WIDTHS, COLORS, LOGICAL_COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import AboveContentLinks from './commonComponents/AboveContentLinks';
import Textbox from '../common/components/Textbox';
import Button from '../ce/components/Reusable/Button/Button';
import Droplist from '../ce/components/Reusable/Droplist/Droplist';
import SelectState from '../common/components/SelectState';
import TopInfoBox from './commonComponents/TopInfoBox';
import PlainButton from './commonComponents/PlainButton';

const givingType = 'tithing';

const GivingPageStyledDiv = styled.div`
  .content-and-sub-compass {
    background-color: white;
    margin: 0 ${WIDTHS.SIDE_CONTENT_PADDING};
    padding: 0 1em;
  }

  .content-and-sides {
    border-top: 1px solid ${LOGICAL_COLORS.GENERAL_PAGE_BORDER_COLOR};
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content {
    background-color: ${COLORS.WHITE};
    margin: 0 auto;
    padding: 1em;

    h1 {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
      margin-top: 0;
      text-transform: uppercase;
    }
  }
`;

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
  {label: 'General Church Fund', value: 'general'},
  {label: 'Outreach', value: 'outreach'},
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
          <div>
            <br />
            <PlainButton
              onClick={event => addPaymentOption(firstUnusedType, event)}
            >
              + Add another donation type
            </PlainButton>
          </div>
        )}
      </>
    );
  };

  const boxNum = userInfo.box;

  return (
    <GivingPageStyledDiv>
      <MainMenubar />
      <TopInfoBox>
        <h1>Giving</h1>
        <p>
          <i>
            “You can’t beat God’s giving, no matter how you try. For just as
            sure as you are living and the Lord is in heaven on high; the more
            you give, the more He gives to you. But keep on giving because it’s
            really true, that you can’t beat God’s giving, no matter how you
            try.”
          </i>
        </p>
        <p>
          When Abram gave the king of Salem, Melchizedek, a tenth of his
          possessions, he did it not to invoke God’s blessing, but in response
          to God’s blessings. The generosity we show God and the spirit in which
          we give are reflections of the gratitude we have for all He has done
          for us. Tithes and offerings also have the very practical purpose of
          providing a source of income for the church to operate and fulfill its
          missions. City Temple thanks you for your open-hearted generosity and
          contributions to its kingdom-building efforts.
        </p>
      </TopInfoBox>
      <div className="content-and-sub-compass">
        <div className="compass">
          <AboveContentLinks pageTitle="Giving" />
        </div>
        <div className="content-and-sides">
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
              {renderStateSelect('state')}
              {renderTextbox('zip', 'Zipcode')}
              {renderTextbox('night_phone_a', 'Phone')}
              {renderTextbox('email', 'Email', {required: true, type: 'email'})}
              {renderTextbox('box', 'Box #')}
              {boxNum && renderHiddenTextbox('custom', `Box: ${boxNum}`)}
              {renderHiddenTextbox('business', 'giving@thecitytemple.org')}
              {renderHiddenTextbox('return', 'https://www.thecitytemple.org')}
              {renderHiddenTextbox(
                'cancel_return',
                'https://www.thecitytemple.org'
              )}
              {renderHiddenTextbox('no_shipping', '1')}

              {givingType === 'tithing' && renderTithingFields()}
              <div>
                <br />
                <Button name="submit" type="submit" value="Continue">
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GivingPageStyledDiv>
  );
};

export default GivingPage;
