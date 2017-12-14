import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './Slider.css';

class Slider extends Component {
  constructor() {
    super();
    this.allPictures = [
      {
        altTag:
          'Christian Education Sunday 9/23/2018. Reception to follow after worship service',
        displayBeg: '2018-06-01',
        displayEnd: '2018-09-23',
        source: require('./christian-ed-home-ce-sunday.png')
      },
      {
        altTag: 'Christmas Eve Service: Sunday 24th December at 9am',
        displayBeg: '2017-11-25',
        displayEnd: '2017-12-25',
        source: require('./christian-ed-home-christmas-eve.png')
      },
      {
        altTag:
          'Celebrate Holy week with us: Psalm Sunday March 25, 2018 at 9am, ' +
          'Maunday Thursday March 29, 2018 at 7pm, Easter Service APril 1, 2018 at 9am',
        displayBeg: '2018-02-25',
        displayEnd: '2018-05-01',
        source: require('./christian-ed-home-holy-week.png')
      },
      {
        altTag: 'Christ Is Risen: Celebrate the Savior',
        annual: true,
        displayBeg: '2018-03-01',
        displayEnd: '2018-05-01',
        source: require('./christian-ed-home-christ-risen.png')
      },

      // TODO: this banner should link to the day or event page but they don't exist yet
      /*
      {
        altTag:
          'Leadership prayer servie: Every saturday before the first sunday',
        linkPath: '/vision/thevision',
        source: require('./christian-ed-home-leadership-prayer.png')
      },
      */
      {
        altTag:
          'o be a good father and mother requires that the parents defer many of ' +
          'their own needs and desires in favor of the needs of their children. As a ' +
          'consequence of this sacrifice, conscientious parents develop a nobility of ' +
          'character and learn to put into practice the selfless truths taught by the Savior Himself. Quote from Robert Faust' +
          'Mother’s Day Service May 13' +
          'Father’s Day Service June 17',
        displayBeg: '2018-02-25',
        displayEnd: '2018-05-01',
        source: require('./christian-ed-home-mothers-fathers.png')
      },
      {
        altTag: 'City Temple 2020 Vision',
        linkPath: '/vision/thevision',
        source: require('./christian-ed-home-banner-2020.png')
      },
      {
        altTag:
          'Bible Study - Every Tuesday at 7:30 PM and Every Saturday at Noon',
        source: require('./christian-ed-home-bible-study.png')
      }
    ];

    this.pictures = this.allPictures
      .filter(picture => {
        let {annual, displayBeg, displayEnd} = picture;

        if (annual) {
          const currentYear = moment().year();
          if (displayBeg) {
            displayBeg = moment(displayBeg).year(currentYear);
          }

          if (displayEnd) {
            displayEnd = moment(displayEnd).year(currentYear);
          }
        }

        if (moment().isBefore(displayBeg)) {
          return false;
        }

        if (moment().isAfter(displayEnd)) {
          return false;
        }

        return true;
      })
      .slice(0, 4);

    const moreThanOnePicture = _.size(this.pictures) > 1;
    const slideShowIsOn = moreThanOnePicture ? true : false;

    this.state = {
      slideIndex: 0,
      slideShowIsOn
    };

    this._renderSlideShowButtons = this._renderSlideShowButtons.bind(this);
    this._renderPictureSelectButtons = this._renderPictureSelectButtons.bind(
      this
    );
    this._renderSlideShowPictures = this._renderSlideShowPictures.bind(this);
  }

  componentDidMount() {
    window.onresize = this.savePictureHeight.bind(this);
    this.slideShow(this.state.slideShowIsOn);
  }

  componentWillUpdate(nextProps, nextState) {
    const slideShowTurnedOnOrOff =
      nextState.slideShowIsOn !== this.state.slideShowIsOn;
    if (slideShowTurnedOnOrOff || nextState.instantChange) {
      this.slideShow(nextState.slideShowIsOn);
    }
  }

  componentWillUnmount() {
    this.slideShow(false);
  }

  savePictureHeight() {
    if (_.size(this.pictures)) {
      const pictureHeight = this.slideShowImage.offsetHeight;
      this._sliderDiv.style.height = pictureHeight + 'px';
    }
  }

  slideShow(on) {
    const timePerSlide = 8000;
    // always reset the slideShow
    this.slideShowTimer && clearInterval(this.slideShowTimer);

    if (on) {
      this.slideShowTimer = setInterval(() => {
        this.setState({
          slideIndex: this.getNextNumber(
            this.state.slideIndex,
            _.size(this.pictures)
          ),
          instantChange: false
        });
      }, timePerSlide);
    }
  }

  getNextNumber(currentNumber, length, reverse) {
    let nextNumber = currentNumber;
    const lastSlideIndex = length - 1;
    const firstSlideIndex = 0;
    const onLastSlide = nextNumber === lastSlideIndex;
    const onFirstSlide = nextNumber === firstSlideIndex;

    if (reverse) {
      nextNumber = onFirstSlide ? lastSlideIndex : --nextNumber;
    } else {
      nextNumber = onLastSlide ? firstSlideIndex : ++nextNumber;
    }

    return nextNumber;
  }

  showPicture(control) {
    const {slideIndex} = this.state;
    let newIndex;
    switch (control) {
      case 'next':
        newIndex = this.getNextNumber(slideIndex, _.size(this.pictures));
        break;
      case 'previous':
        newIndex = this.getNextNumber(slideIndex, _.size(this.pictures), true);
        break;
      default:
        if (
          typeof control === 'number' &&
          0 <= control &&
          control < _.size(this.pictures)
        ) {
          this.slideShow(this.state.slideShowIsOn);
          newIndex = control;
        }
    }

    if (newIndex !== slideIndex) {
      this.setState({
        slideIndex: newIndex,
        instantChange: true
      });
    }
  }

  toggleSlideShow() {
    this.setState({slideShowIsOn: !this.state.slideShowIsOn});
  }

  _renderPictureSelectButtons() {
    return this.pictures.map((picture, index) => {
      const isCurrentPicture = index === this.state.slideIndex;
      const currentOrHidden = isCurrentPicture ? 'current' : 'hidden';
      return (
        <button
          className={`picture-select-button fa-stack ${currentOrHidden}`}
          key={index}
          onClick={_.bind(this.showPicture, this, index)}
          type="button"
        >
          <i
            aria-label={`select picture ${index + 1}`}
            className="fa fa-circle fa-stack-2x"
          />
          <i className="fa fa-circle-o fa-stack-2x" />
        </button>
      );
    });
  }

  _renderSlideShowButtons() {
    let playPauseClassname;
    let playOrPauseLabel;
    if (this.state.slideShowIsOn) {
      playPauseClassname = 'fa fa-pause fa-stack-1x play-pause-icon';
      playOrPauseLabel = 'Pause the slide show';
    } else {
      playPauseClassname = 'fa fa-play fa-stack-1x play-pause-icon';
      playOrPauseLabel = 'Play the slide show';
    }

    return (
      <div className="slider-control-buttons">
        <button
          className="pic-control-button prev fa fa-angle-left"
          onClick={_.bind(this.showPicture, this, 'previous')}
          type="button"
        >
          <i className="fa fa-circle fa-stack-1x" />
          <i className="fa fa-angle-left fa-stack-1x white" />
        </button>
        <button
          className="pic-control-button next fa fa-angle-right"
          onClick={_.bind(this.showPicture, this, 'next')}
          type="button"
        >
          <i className="fa fa-circle fa-stack-1x" />
          <i className="fa fa-angle-right fa-stack-1x white" />
        </button>
        <div className="select-and-pause-controls">
          {this.props.showPictureSelectButtons
            ? this._renderPictureSelectButtons()
            : null}
          <button
            className="fa-stack"
            id="play-pause-button"
            onClick={this.toggleSlideShow.bind(this)}
            type="button"
          >
            <i className="fa fa-circle fa-stack-2x gray" />
            <i aria-label={playOrPauseLabel} className={playPauseClassname} />
          </button>
        </div>
      </div>
    );
  }

  _renderSlideShowPictures() {
    const picturesElements = this.pictures.map((picture, index) => {
      const {source, altTag, linkPath} = picture;
      const {slideIndex, instantChange} = this.state;
      const currentSlide = slideIndex === index;
      const currentSuffix = currentSlide ? ' current' : ' hidden';
      const instant = instantChange ? ' instant' : '';

      const renderedImage = (
        <img
          alt={altTag}
          onLoad={this.savePictureHeight.bind(this)}
          ref={node => {
            if (!this.slideShowImage) {
              this.slideShowImage = node;
            }
          }}
          src={source}
        />
      );

      return (
        <div className={'slide-picture' + currentSuffix + instant} key={index}>
          {linkPath ? (
            <Link to={linkPath}>{renderedImage}</Link>
          ) : (
            <div>{renderedImage}</div>
          )}
        </div>
      );
    });

    return <div className="slideshow">{picturesElements}</div>;
  }

  render() {
    const SlideShowButtons = this._renderSlideShowButtons;
    return (
      <div
        className="slider-chrsis"
        id="leftcontent"
        ref={node => (this._sliderDiv = node)}
      >
        {this.pictures.length > 1 ? <SlideShowButtons /> : null}
        {this._renderSlideShowPictures()}
      </div>
    );
  }
}

Slider.propTypes = {
  showPictureSelectButtons: PropTypes.bool
};

Slider.defaultProps = {
  showPictureSelectButtons: true
};

export default Slider;
