import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import bottomButtonsImage from '../assets/main/images/voting-banner.png';
import {getDaysUntilDate} from '../utils/dateTimeUtils';
import {LOGICAL_COLORS, FONT_FAMILIES} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';

const BACKGROUND_BLUE = 'rgb(4, 41, 75)';
const VOTE_AND_IT_BLUE = 'rgb(107, 151, 192)';
const DOES_BLUE = 'rgb(206, 221, 234)';
const TOP_LINE_H1_SIZE = '120px';
const REST_H1_SIZE = '96px';

const VotingInfoStyles = styled.div`
  background-color: ${BACKGROUND_BLUE};
  color: ${LOGICAL_COLORS.CT_TEXT_ON_DARK};
  padding: 2em 4em;
  font-size: 16px;

  h1 {
    text-transform: uppercase;
    font-size: ${REST_H1_SIZE};
    margin: 0;
    color: white;

    .vote {
      color: ${VOTE_AND_IT_BLUE};
      display: block;
      font-size: ${TOP_LINE_H1_SIZE};
    }

    .it {
      color: ${VOTE_AND_IT_BLUE};
    }

    .does {
      color: ${DOES_BLUE};
    }
  }

  h2 {
    font-size: 18px;
    font-weight: normal;
    line-height: 150%;

    .here-are-rules {
      color: #8e131b;
    }
  }

  .questions-and-answers {
    padding: 0 32px;
  }

  .closing {
    font-weight: bold;
    line-height: 150%;
    text-align: center;
  }

  img {
    display: block;
    margin: auto;
    width: 90%;
  }

  a {
    color: ${VOTE_AND_IT_BLUE};

    &:visited {
      color: ${DOES_BLUE};
    }
  }
`;

const QAndAStyle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  line-height: 150%;
  padding: 1.5em;
  width: 49%;

  .question::before,
  .answer::before {
    font-family: ${FONT_FAMILIES.CAMBRIA};
    font-size: 24px;
  }

  .question::before {
    content: 'Q: ';
  }

  .question {
    font-weight: bold;
  }

  .answer::before {
    font-weight: bold;
    content: 'A: ';
  }
`;

function QandA({question, answer}) {
  return (
    <QAndAStyle>
      <div className="question">{question}</div>
      <span className="answer">{answer}</span>
    </QAndAStyle>
  );
}

QandA.propTypes = {
  answer: PropTypes.node.isRequired,
  question: PropTypes.node.isRequired
};

const VotingInformationPage = () => {
  const daysUntilElectionDate = getDaysUntilDate('2020-11-03');
  const daysUntilRegistrationDeadline = getDaysUntilDate('2020-10-13');

  return (
    <StandardPageWrapper>
      <MainMenubar />
      <ContentAndSubCompassWrapper padding={false}>
        <VotingInfoStyles>
          <h1>
            <span className="vote">Vote.</span>
            <span className="it">It</span> <span className="does">does</span>{' '}
            matter.
          </h1>
          <h2>
            Read on for everything you need to know about mail-in and early in
            person voting, including the first day you can cast your ballot in
            the 2020 Election.{' '}
            <span className="here-are-rules">
              Here are the rules for voting in the state of Maryland.
            </span>
          </h2>
          <div className="questions-and-answers">
            <QandA
              answer={
                <>
                  You have {daysUntilRegistrationDeadline} days left to register
                  online. The deadline is Tuesday, Oct. 13.
                  <br />
                  There are {daysUntilElectionDate} days left until Election
                  Day, Tuesday, Nov. 3.
                </>
              }
              question="When is the deadline to register to vote?"
            />
            <QandA
              answer={
                <>
                  Online and by mail: Tuesday, Oct. 13.
                  <br />
                  In person: Tuesday, Nov. 3 (Election Day).
                  <br />
                </>
              }
              question="What are the deadlines for all ways to register in Maryland?"
            />
            <QandA
              answer="Yes."
              question="Can I register to vote and cast my ballot on the same day?"
            />
            <QandA answer="Yes." question="Can I vote without a photo ID?" />
            <QandA
              answer="Yes, you can vote by mail without an excuse."
              question="Can I vote by mail without an excuse?"
            />
            <QandA
              answer="Your request must be received (not just mailed) by Tuesday, October 20, 2020"
              question="When is the deadline to request a mail-in ballot?"
            />
            <QandA
              answer={
                'Ballots must be postmarked by Tuesday, Nov. 3 (Election Day) and received by ' +
                'Friday, Nov. 13.'
              }
              question="When do I need to mail my ballot by?"
            />
            <QandA
              answer="Yes."
              question="Can I vote without a notary or witness?"
            />
            <QandA answer="Yes." question="Can I use COVID-19 as an excuse?" />
            <QandA
              answer="Yes."
              question="After I vote by mail, can I track my ballot?"
            />
            <QandA
              answer="Yes, both by early absentee and early in-person voting."
              question="Can I vote in person before Election Day?"
            />
            <QandA
              answer="Thursday, Oct. 22."
              question="When is the first day I can vote early in person?"
            />
            <QandA
              answer="Thursday, Oct. 29."
              question="When is the last day I can vote early in person?"
            />
          </div>
          <p className="closing">
            The above information was provided online by the NBC News Network on
            August 17, 2020. You can find further information regarding voting
            and voter registration at{' '}
            <a
              href="https://www.vote.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.vote.org
            </a>{' '}
            Hopefully, you will find this information helpful.
          </p>
          <img alt="Vote Decorative Buttons" src={bottomButtonsImage} />
        </VotingInfoStyles>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default VotingInformationPage;
