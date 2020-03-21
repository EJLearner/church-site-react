import React from 'react';
import styled from 'styled-components';

import constants from '../utils/constants';
import dateTimeUtils from '../utils/dateTimeUtils';
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
    date: '2019-06-17',
    description:
      'A one to two line blurb will go here to explain the point of the sermon',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 3:16',
    title: 'The Providence of Faith',
    videoLink: 'https://www.youtube.com/embed/QdzviEfS4EI'
  },
  {
    audioLink: {},
    date: '2019-04-17',
    description:
      'A one to two line blurb will go here to explain the point of the sermon',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 3:16',
    title: 'The Providence of Faith',
    videoLink: 'https://www.youtube.com/embed/QdzviEfS4EI'
  },
  {
    audioLink: {},
    date: '2019-08-17',
    description:
      'A one to two line blurb will go here to explain the point of the sermon',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 3:16',
    title: 'The Providence of Faith',
    videoLink: 'https://www.youtube.com/embed/QdzviEfS4EI'
  }
].sort((a, b) => a.date > b.date);

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

  .video-div {
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
`;

function renderAllVideos() {
  return <div className="all-videos">{null}</div>;
}

function renderFilter() {
  return <div className="filter">{null}</div>;
}

function renderNewestVideo(videoData) {
  const {date, preacher, scripture, title, videoLink} = videoData;

  const jsSermonDate = dateTimeUtils.parseISO(date);
  const sermonDate = dateTimeUtils.format(
    jsSermonDate,
    constants.DATE_FNS_DISPLAY_DATE_FORMAT
  );

  return (
    <div className="newest-video">
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
      <div className="date">{sermonDate}</div>

      <div className="video-div">
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          src={videoLink}
          title="Artscape to Organscape"
        />
      </div>
    </div>
  );
}

const WatchPage = () => {
  const newestVideo = orderedVideoData[0];

  return (
    <StandardPageWrapper>
      <MainMenubar />

      <ContentAndSubCompassWrapper>
        <StyleWrapper>
          {renderNewestVideo(newestVideo)}
          {renderFilter()}
          {renderAllVideos()}
        </StyleWrapper>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default WatchPage;
