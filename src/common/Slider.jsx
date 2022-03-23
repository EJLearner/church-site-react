import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Slider.css';

const NEXT_SLIDE_CONTROL = 'next';
const PREVIOUS_SLIDE_CONTROL = 'previous';

class Slider extends Component {
  static propTypes = {
    pictures: PropTypes.arrayOf(
      PropTypes.shape({
        altTag: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired
      })
    ).isRequired,
    showPictureSelectButtons: PropTypes.bool
  };

  static defaultProps = {
    showPictureSelectButtons: true
  };

  constructor(props) {
    super(props);

    const moreThanOnePicture = this.props.pictures.length > 1;
    const slideShowIsOn = moreThanOnePicture ? true : false;

    this.state = {
      slideIndex: 0,
      slideShowIsOn
    };
  }

  componentDidMount() {
    window.addEventListener('onresize', this.savePictureHeight);
    this.slideShow(this.state.slideShowIsOn);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const slideShowTurnedOnOrOff =
      nextState.slideShowIsOn !== this.state.slideShowIsOn;
    if (slideShowTurnedOnOrOff || nextState.instantChange) {
      this.slideShow(nextState.slideShowIsOn);
    }
  }

  componentWillUnmount() {
    this.slideShow(false);
    window.removeEventListener('onresize', this.savePictureHeight);
  }

  savePictureHeight = () => {
    if (this.props.pictures.length) {
      const pictureHeight = this.slideShowImage.offsetHeight;
      this.sliderDiv.style.height = `${pictureHeight}px`;
    }
  };

  slideShow(isOn) {
    const timePerSlide = 8000;
    // always reset the slideShow
    if (this.slideShowTimer) {
      clearInterval(this.slideShowTimer);
    }

    if (isOn) {
      this.slideShowTimer = setInterval(() => {
        this.setState({
          slideIndex: this.getNextSlideIndex(
            this.state.slideIndex,
            this.props.pictures.length
          ),
          instantChange: false
        });
      }, timePerSlide);
    }
  }

  getNextSlideIndex(currentSlideIndex, length, reverse) {
    let nextSlideIndex = currentSlideIndex;
    const lastSlideIndex = length - 1;
    const firstSlideIndex = 0;
    const onLastSlide = nextSlideIndex === lastSlideIndex;
    const onFirstSlide = nextSlideIndex === firstSlideIndex;

    if (reverse) {
      nextSlideIndex = onFirstSlide ? lastSlideIndex : --nextSlideIndex;
    } else {
      nextSlideIndex = onLastSlide ? firstSlideIndex : ++nextSlideIndex;
    }

    return nextSlideIndex;
  }

  showPicture(control) {
    const {slideIndex} = this.state;
    const slidesCount = this.props.pictures.length;

    let newIndex;
    switch (control) {
      case NEXT_SLIDE_CONTROL:
        newIndex = this.getNextSlideIndex(slideIndex, slidesCount);
        break;
      case PREVIOUS_SLIDE_CONTROL:
        newIndex = this.getNextSlideIndex(slideIndex, slidesCount, true);
        break;
      default:
        this.slideShow(this.state.slideShowIsOn);
        newIndex = control;
    }

    if (newIndex !== slideIndex) {
      this.setState({
        slideIndex: newIndex,
        instantChange: true
      });
    }
  }

  toggleSlideShow = () => {
    this.setState({slideShowIsOn: !this.state.slideShowIsOn});
  };

  renderPictureSelectButtons() {
    return this.props.pictures.map((picture, index) => {
      const isCurrentPicture = index === this.state.slideIndex;
      const currentOrHidden = isCurrentPicture ? 'current' : 'hidden';
      return (
        <button
          className={`picture-select-button fa-stack ${currentOrHidden}`}
          key={index}
          onClick={() => this.showPicture(index)}
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

  renderSlideShowButtons() {
    const {showPictureSelectButtons} = this.props;

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
          onClick={() => this.showPicture(PREVIOUS_SLIDE_CONTROL)}
          type="button"
        >
          <i className="fa fa-circle fa-stack-1x" />
          <i className="fa fa-angle-left fa-stack-1x white" />
        </button>
        <button
          className="pic-control-button next fa fa-angle-right"
          onClick={() => this.showPicture(NEXT_SLIDE_CONTROL)}
          type="button"
        >
          <i className="fa fa-circle fa-stack-1x" />
          <i className="fa fa-angle-right fa-stack-1x white" />
        </button>
        <div className="select-and-pause-controls">
          {showPictureSelectButtons && this.renderPictureSelectButtons()}
          <button
            className="fa-stack"
            id="play-pause-button"
            onClick={this.toggleSlideShow}
            type="button"
          >
            <i className="fa fa-circle fa-stack-2x gray" />
            <i aria-label={playOrPauseLabel} className={playPauseClassname} />
          </button>
        </div>
      </div>
    );
  }

  renderSlideShowPictures() {
    const picturesElements = this.props.pictures.map((picture, index) => {
      const {source, altTag, linkPath} = picture;
      const {slideIndex, instantChange} = this.state;
      const currentSlide = slideIndex === index;
      const currentSuffix = currentSlide ? ' current' : ' hidden';
      const instant = instantChange ? ' instant' : '';

      const renderedImage = (
        <img
          alt={altTag}
          onLoad={this.savePictureHeight}
          ref={(node) => {
            if (!this.slideShowImage) {
              this.slideShowImage = node;
            }
          }}
          src={source}
        />
      );

      let wrappedImage;
      if (linkPath) {
        wrappedImage = <Link to={linkPath}>{renderedImage}</Link>;
      } else {
        wrappedImage = <div>{renderedImage}</div>;
      }

      return (
        <div className={`slide-picture${currentSuffix}${instant}`} key={index}>
          {wrappedImage}
        </div>
      );
    });

    return <div className="slideshow">{picturesElements}</div>;
  }

  render() {
    return (
      <div
        className="slider-chris"
        id="leftcontent"
        ref={(node) => (this.sliderDiv = node)}
      >
        {this.props.pictures.length > 1 && this.renderSlideShowButtons()}
        {this.renderSlideShowPictures()}
      </div>
    );
  }
}

export default Slider;
