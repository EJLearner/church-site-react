import React from 'react';
import styled from 'styled-components';

import {
  getLongDisplayDate,
  isBefore,
  startOfTomorrow,
  parseISO
} from '../utils/dateTimeUtils';
import {LOGICAL_COLORS, COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';

const PREACHERS = {
  G_YEARGIN: 'Rev. Dr. Grady A Yeargin, Jr.'
};

const orderedVideoData = [
  {
    audioLink: {},
    date: '2020-03-29',
    description:
      'A message from Psalms 27 that tells us what to do when we are fearful. Facing our fears requires waiting ' +
      'on the Lord.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 27:1; 13-14',
    title: 'Alleviating Our Anxious Fears',
    videoLink: 'https://www.youtube.com/embed/-bsGGeVUInM'
  },
  {
    audioLink: {},
    date: '2020-03-22',
    description:
      'Given that we are facing a pandemic in these times, there is hope. And not just hope, but an indestructible ' +
      'hope. It is indestructible because it is grounded and founded in our God.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:29-33',
    title: 'An Indestructible Hope',
    videoLink: 'https://www.youtube.com/embed/3sgm_bRfXuw'
  }
]
  .filter(({date}) => isBefore(parseISO(date), startOfTomorrow()))
  .sort((a, b) => a.date < b.date);

const StyleWrapper = styled.div`
  padding: 1em 0;
  color: ${COLORS.GRAY95};
  font-weight: bold;
  font-size: 14px;

  h2 {
    color: ${LOGICAL_COLORS.CT_PRIMARY};
  }

  .preacher-and-scripture {
    display: flex;

    label: {
    }

    .value {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
    }

    div {
      display: inline-block;
    }

    div:not(:first-child) {
      margin-left: 1em;
    }
  }

  .date {
    font-weight: bold;
    color: ${COLORS.GRAY95};
    line-height: 200%;
  }

  .main-video-div {
    margin-bottom: 32px;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .archive-videos {
    .archive-video-container {
      font-size: 12px;
      line-height: 180%;
      margin-bottom: 1em;
      display: flex;

      iframe {
        display: inline-block;
      }

      .label-value {
        display: inline-block;

        .value {
          color: ${LOGICAL_COLORS.CT_PRIMARY};
        }

        & + .label-value {
          margin-left: 20px;
        }
      }

      .video-info {
        margin-left: 32px;

        p {
          width: 600px;
        }
      }

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 0.5em;
        color: ${LOGICAL_COLORS.CT_PRIMARY};
      }
    }
  }
`;

function renderLabelValue(label, value) {
  return (
    <div className="label-value">
      <span className="label">{label}:</span>{' '}
      <span className="value">{value}</span>
    </div>
  );
}

function renderArchiveVideos(otherVideos) {
  return (
    <div className="archive-videos">
      {otherVideos.map(videoData => {
        const {
          date,
          title,
          videoLink,
          scripture,
          description,
          preacher
        } = videoData;

        return (
          <div className="archive-video-container" key={title}>
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              src={videoLink}
              title={title}
            />

            <div className="video-info">
              <h3>{title}</h3>
              {renderLabelValue('Preacher', preacher)}
              {renderLabelValue('Scripture', scripture)}
              <br />
              {getLongDisplayDate(date)}
              <br />
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderFilter() {
  return <div className="filter">{null}</div>;
}

function renderNewestVideo(videoData) {
  const {date, preacher, scripture, title, videoLink} = videoData;

  return (
    <div>
      <h2>{title}</h2>
      <div className="preacher-and-scripture">
        <div>
          <span className="label">Preacher:</span>{' '}
          <span className="value">{preacher}</span>
        </div>
        <div>
          <span className="label">Scripture:</span>{' '}
          <span className="value">{scripture}</span>
        </div>
      </div>
      <div className="date">{getLongDisplayDate(date)}</div>

      <div className="main-video-div">
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          src={videoLink}
          title={title}
        />
      </div>
    </div>
  );
}

const WatchPage = () => {
  const [newestVideo, ...otherVideos] = orderedVideoData;

  return (
    <StandardPageWrapper>
      <MainMenubar />

      <ContentAndSubCompassWrapper>
        <StyleWrapper>
          {renderNewestVideo(newestVideo)}
          {renderFilter()}
          {renderArchiveVideos(otherVideos)}
        </StyleWrapper>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default WatchPage;
