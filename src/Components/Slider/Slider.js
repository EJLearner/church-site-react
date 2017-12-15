import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './Slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);

    const moreThanOnePicture = _.size(this.props.pictures) > 1;
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
    if (_.size(this.props.pictures)) {
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
            _.size(this.props.pictures)
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
        newIndex = this.getNextNumber(slideIndex, _.size(this.props.pictures));
        break;
      case 'previous':
        newIndex = this.getNextNumber(
          slideIndex,
          _.size(this.props.pictures),
          true
        );
        break;
      default:
        if (
          typeof control === 'number' &&
          0 <= control &&
          control < _.size(this.props.pictures)
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
    return this.props.pictures.map((picture, index) => {
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
    const picturesElements = this.props.pictures.map((picture, index) => {
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
    const SlideShowPictures = this._renderSlideShowPictures;

    return (
      <div
        className="slider-chris"
        id="leftcontent"
        ref={node => (this._sliderDiv = node)}
      >
        {this.props.pictures.length > 1 ? <SlideShowButtons /> : null}
        <SlideShowPictures />
      </div>
    );
  }
}

Slider.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      altTag: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired
    })
  ).isRequired,
  showPictureSelectButtons: PropTypes.bool
};

Slider.defaultProps = {
  showPictureSelectButtons: true
};

export default Slider;
