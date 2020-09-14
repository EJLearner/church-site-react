import React, {useState} from 'react';
import styled from 'styled-components';

import {currentVideoData} from '../stores/messageVideos';
import {getLongDisplayDate} from '../utils/dateTimeUtils';
import {LOGICAL_COLORS, COLORS} from '../utils/styleVariables';

import MainMenubar from './MainMenubar';
import ContentAndSubCompassWrapper from './commonComponents/ContentAndSubCompassWrapper';
import PlainButton from './commonComponents/PlainButton';
import StandardPageWrapper from './commonComponents/StandardPageWrapper';

const INITIAL_VIDEO_SHOW_COUNT = 10;

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

  .show-more {
    display: flex;
    justify-content: center;

    button {
      color: black;
      display: block;
      text-align: center;
    }

    i {
      color: ${LOGICAL_COLORS.CT_PRIMARY};
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
      {otherVideos.map((videoData) => {
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
        {preacher && (
          <div>
            <span className="label">Preacher:</span>{' '}
            <span className="value">{preacher}</span>
          </div>
        )}
        {scripture && (
          <div>
            <span className="label">Scripture:</span>{' '}
            <span className="value">{scripture}</span>
          </div>
        )}
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

function renderShowMore(setArchiveVideoShowCount, archiveVideoShowCount) {
  return (
    <div className="show-more">
      <PlainButton
        onClick={() => setArchiveVideoShowCount(archiveVideoShowCount + 10)}
      >
        <i className="fa fa-angle-double-down" /> Show More Videos{' '}
        <i className="fa fa-angle-double-down" />
      </PlainButton>
    </div>
  );
}

const WatchPage = () => {
  const [archiveVideoShowCount, setArchiveVideoShowCount] = useState(
    INITIAL_VIDEO_SHOW_COUNT
  );
  const [newestVideo, ...otherVideos] = currentVideoData;

  const filteredVideos = otherVideos.slice(0, archiveVideoShowCount);
  const renderShowMoreContent = otherVideos.length >= archiveVideoShowCount;

  return (
    <StandardPageWrapper>
      <MainMenubar />

      <ContentAndSubCompassWrapper>
        <StyleWrapper>
          {renderNewestVideo(newestVideo)}
          {renderFilter()}
          {renderArchiveVideos(filteredVideos)}
          {renderShowMoreContent &&
            renderShowMore(setArchiveVideoShowCount, archiveVideoShowCount)}
        </StyleWrapper>
      </ContentAndSubCompassWrapper>
    </StandardPageWrapper>
  );
};

export default WatchPage;
