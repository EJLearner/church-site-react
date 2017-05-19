import React, {Component} from 'react';
import _ from 'lodash';

class Slider extends Component {
  constructor() {
    super();
    this.pictures = undefined;
    this.pictureSelectButtons = undefined;
    this.slideCount = undefined;
    this.slideShowTimer = undefined;
    this.playPauseButton = undefined;
    // this.slideShow = this.slideShow.bind(this);

    this.state = {
      slideIndex: 0,
      slideShowIsOn: true
    }
  }

  componentDidMount() {
    window.onload = this.savePictureHeight.bind(this);
    window.onresize = this.savePictureHeight.bind(this);

    this.pictures = document.getElementsByClassName('slide-picture');
    this.slideCount = _.size(this.pictures);

    var moreThanOnePicture = this.slideCount > 1;
    if (moreThanOnePicture) {
      this.setState({slideShowIsOn: true});
      this.slideShow(this.state.slideShowIsOn);
      var firstSelectButton = document.getElementsByClassName('picture-select-button')[0];
      var selectAndPauseControlsDiv = document.getElementsByClassName('select-and-pause-controls')[0];
      this.playPauseButton = document.getElementById('play-pause-button');
      [].forEach.call(this.pictures, (picture, index) => {
        if (index) {
          var newSelectButton = firstSelectButton.cloneNode(true);
          newSelectButton.onclick=this.showPicture.bind(this, index);
          selectAndPauseControlsDiv.insertBefore(newSelectButton, this.playPauseButton);
        }
      });

      firstSelectButton.className += ' current';

      this.pictureSelectButtons = document.getElementsByClassName('picture-select-button');
    } else {
      var sliderControlButtons = document.getElementsByClassName('slider-control-buttons')[0];
      sliderControlButtons.className += ' hide';
    }
  }

  savePictureHeight() {
    if (this.slideCount) {
      var pictureHeight = this.pictures[0].querySelectorAll('img').item(0).offsetHeight;
      var sliderContainer = document.getElementById('slider-chris');
      sliderContainer.style.height = pictureHeight + 'px';
    }
  }

  slideShow(on) {
    // always reset the slideShow
    this.slideShowTimer && clearInterval(this.slideShowTimer);
    if (on) {
      this.slideShowTimer = setInterval(
        () => {
          this.setState({slideIndex: this.getNextNumber(this.state.slideIndex, this.slideCount)});
          console.log('calling set picture automaticlaly');
          this.setPictureAndButtonClasses(this.state.slideIndex, true);
        },
        3000
      );
    }
  }

  setPictureAndButtonClasses(displayIndex, automaticSlide) {
    // want the slideShow timer to reset if picture changed by user button press
    if (!automaticSlide) {
      this.slideShow(this.state.slideShowIsOn);
    }

    [].forEach.call(this.pictures, (picture, index) => {
      if (index === displayIndex) {
        picture.className = 'slide-picture current';
        this.pictureSelectButtons[index].className='picture-select-button fa-stack current';
      } else {
        picture.className = 'slide-picture hidden';
        this.pictureSelectButtons[index].className='picture-select-button fa-stack hidden';
      }

      // user initiated picture changes should have instant class that doesn't do transition
      // things currently get messy when transitioning random clicks
      picture.className += automaticSlide ? '' : ' instant';
    });
  };

  getNextNumber(currentNumber, length, reverse) {
    var nextNumber = currentNumber;
    var lastSlideIndex = length - 1;
    var firstSlideIndex = 0;
    var onLastSlide = currentNumber === lastSlideIndex;
    var onFirstSlide = currentNumber === firstSlideIndex;

    if (reverse) {
      currentNumber = onFirstSlide ? lastSlideIndex : --currentNumber;
    } else {
      currentNumber = onLastSlide ? firstSlideIndex : ++currentNumber;
    }

    return currentNumber
  }

  showPicture(control) {
    console.log('inside showPicture, control = ', control)
    switch(control) {
      case 'next':
        this.setState({slideIndex: this.getNextNumber(this.state.slideIndex, this.slideCount)});
        break;
      case 'previous':
        this.setState({slideIndex: this.getNextNumber(this.state.slideIndex, this.slideCount, true)});
        break;
      default:
        console.log('inside default');
        if (typeof(control) === 'number' && 0 <= control && control < this.slideCount) {
          this.slideShow(this.state.slideShowIsOn);
          console.log('setting state')
          this.setState({slideIndex: control});
        }
    }
    this.setPictureAndButtonClasses(this.state.slideIndex);
  }

  toggleSlideShow() {
    this.setState({slideShowIsOn: !this.state.slideShowIsOn});
    this.slideShow(this.state.slideShowIsOn);
    var playPauseClassname;
    if (this.state.slideShowIsOn) {
      playPauseClassname = 'fa fa-pause-circle-o fa-stack-2x play-pause-icon';
    } else {
      playPauseClassname = 'fa fa-play-circle-o fa-stack-2x play-pause-icon';
    }
    this.playPauseButton.getElementsByClassName('play-pause-icon')[0].className = playPauseClassname;
  }

  _renderslideShowButtons() {
    return (
      <div className='slider-control-buttons'>
        <button
          type='button'
          className='pic-control-button prev fa fa-chevron-circle-left'
          onClick={_.bind(this.showPicture, this, 'previous')}
        >
            <i className='fa fa-circle fa-stack-1x black'></i>
            <i className='fa fa-chevron-circle-left fa-stack-1x'></i>
        </button>
        <button
          type='button'
          className='pic-control-button next fa fa-chevron-circle-right'
          onClick={_.bind(this.showPicture, this, 'next')}
        >
            <i className='fa fa-circle fa-stack-1x black'></i>
            <i className='fa fa-chevron-circle-right fa-stack-1x'></i>
        </button>
        <div className='select-and-pause-controls'>
          <button
            type='button'
            className='picture-select-button fa-stack'
            onClick={_.bind(this.showPicture, this, 0)}
          >
            <i className='fa fa-circle fa-stack-2x'></i>
            <i className='fa fa-circle-o fa-stack-2x'></i>
          </button>
          <button
            id='play-pause-button'
            type='button'
            className='fa-stack'
            onClick={this.toggleSlideShow.bind(this)}
          >
            <i className='fa fa-circle fa-stack-2x white'></i>
            <i className='fa fa-pause-circle-o fa-stack-2x play-pause-icon'></i>
          </button>
        </div>
      </div>
    );
  }


  _renderSlideShowPictures() {
    const pictures = [
      {
        source: require('./christian-ed-home-banner-VBS-temp.png'),
        altTag: 'Banner for City Temple Vacation Bible School. July 10-14 6:30 pm-8:00 pm'
      }, {
        source: require('./christian-ed-home-banner-2020-temp.png'),
        altTag: 'City Temple 2020 Vision'
      }
    ]

    const picturesElements = pictures.map((picture, index) => {
      const {source, altTag, link} = picture;
      const currentSlide = this.state.slideIndex === index;
      const currentSuffix = currentSlide ? ' current' : '';
      return (
        <div
          key={index}
          className={'slide-picture' + currentSuffix}
        >
          <img src={source} alt={altTag} />
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
    <div id='slider-chris'>
      {this._renderslideShowButtons()}
      {this._renderSlideShowPictures()}
    </div>
    );
  }
}

export default Slider;
