import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

class Slider extends Component {
  constructor() {
    super();
    this.pictures = [
      {
        source: require('./christian-ed-home-banner-VBS-temp.png'),
        altTag: 'Banner for City Temple Vacation Bible School. July 10-14 6:30 pm-8:00 pm'
      }, {
        source: require('./christian-ed-home-banner-2020-temp.png'),
        altTag: 'City Temple 2020 Vision'
      }
    ]

    const moreThanOnePicture = _.size(this.pictures) > 1;
    const slideShowIsOn = moreThanOnePicture ? true : false;

    this.state = {
      slideIndex: 0,
      slideShowIsOn
    }
  }

  componentDidMount() {
    window.onresize = this.savePictureHeight.bind(this);
    this.slideShow(this.state.slideShowIsOn);
  }

  componentWillUpdate(nextProps, nextState) {
    const slideShowTurnedOnOrOff = nextState.slideShowIsOn !== this.state.slideShowIsOn;
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
      this.sliderDiv.style.height = pictureHeight + 'px';
    }
  }

  slideShow(on) {
    const timePerSlide = 8000;
    // always reset the slideShow
    this.slideShowTimer && clearInterval(this.slideShowTimer);

    if (on) {
      this.slideShowTimer = setInterval(
        () => {
          this.setState({
            slideIndex: this.getNextNumber(this.state.slideIndex, _.size(this.pictures)),
            instantChange: false
          });
        },
        timePerSlide
      );
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

    return nextNumber
  }

  showPicture(control) {
    const {slideIndex} = this.state;
    let newIndex;
    switch(control) {
      case 'next':

        newIndex = this.getNextNumber(slideIndex, _.size(this.pictures));
        break;
      case 'previous':
        newIndex = this.getNextNumber(slideIndex, _.size(this.pictures), true);
        break;
      default:
        if (typeof(control) === 'number' && 0 <= control && control < _.size(this.pictures)) {
          this.slideShow(this.state.slideShowIsOn);
          newIndex = control;
        }
    }

    if (newIndex !== slideIndex) {
      this.setState({
        slideIndex: newIndex,
        instantChange: true
      })
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
          type='button'
        >
          <i className='fa fa-circle fa-stack-2x' aria-label={`select picture ${index + 1}`}></i>
          <i className='fa fa-circle-o fa-stack-2x'></i>
        </button>
      );
    });
  }

  _renderslideShowButtons() {

    let playPauseClassname;
    let playOrPauseLabel;
    if (this.state.slideShowIsOn) {
      playPauseClassname = 'fa fa-pause fa-stack-1x play-pause-icon';
      playOrPauseLabel = 'Pause the slide show'
    } else {
      playPauseClassname = 'fa fa-play fa-stack-1x play-pause-icon';
      playOrPauseLabel = 'Play the slide show'
    }

    return (
      <div className='slider-control-buttons'>
        <button
          type='button'
          className='pic-control-button prev fa fa-angle-left'
          onClick={_.bind(this.showPicture, this, 'previous')}
        >
            <i className='fa fa-circle fa-stack-1x'></i>
            <i className='fa fa-angle-left fa-stack-1x white'></i>
        </button>
        <button
          type='button'
          className='pic-control-button next fa fa-angle-right'
          onClick={_.bind(this.showPicture, this, 'next')}
        >
            <i className='fa fa-circle fa-stack-1x'></i>
            <i className='fa fa-angle-right fa-stack-1x white'></i>
        </button>
        <div className='select-and-pause-controls'>
          {this.props.showPictureSelectButtons ? this._renderPictureSelectButtons() : null}
          <button
            id='play-pause-button'
            type='button'
            className='fa-stack'
            onClick={this.toggleSlideShow.bind(this)}
          >
            <i className='fa fa-circle fa-stack-2x gray'></i>
            <i className={playPauseClassname} aria-label={playOrPauseLabel}></i>
          </button>
        </div>
      </div>
    );
  }


  _renderSlideShowPictures() {
    const picturesElements = this.pictures.map((picture, index) => {
      const {source, altTag, link} = picture;
      const {slideIndex, instantChange} = this.state;
      const currentSlide = slideIndex === index;
      const currentSuffix = currentSlide ? ' current' : ' hidden';
      const instant = instantChange ? ' instant' : '';

      return (
        <div
          key={index}
          className={'slide-picture' + currentSuffix + instant}
        >
          <img
            alt={altTag}
            href={link}
            onLoad={this.savePictureHeight.bind(this)}
            ref={(node) => {
              if (!this.slideShowImage) {
                this.slideShowImage = node;
              }
            }}
            src={source}
          />
        </div>
      );
    });

    return (
      <div className='slideshow'>
        {picturesElements}
      </div>
    );
  }

  render() {
    return (
    <div
      id="leftcontent"
      className='slider-chris'
      ref={(node) => this.sliderDiv = node}
    >
      {this.pictures.length > 1 ? this._renderslideShowButtons() : null}
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
}

export default Slider;
