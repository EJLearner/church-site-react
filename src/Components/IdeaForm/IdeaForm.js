import React, {Component} from 'react';
import LeftLinks from '../Reusable/LeftLinks/LeftLinks';
import Text from '../Reusable/Text/Text';

class IdeaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {ideadesc: '', name: '', email: '', phone: ''};

    this._onChangeInput = this._onChangeInput.bind(this);
    // this._renderFormFields = this._renderFormFields.bind(this);
    // this._setErrors = this._setErrors.bind(this);
    // this._submitData = this._submitData.bind(this);
  }

  _onChangeInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  render() {
    return (
      <div id="ce-page-left-content">
        <h1>
          Tell Us What You <span>Think!</span>
        </h1>
        <LeftLinks />
        <div className="ce-page-right-content">
          <p>
            <label htmlFor="institute">
              This idea is for:<span className="mandatory">*</span>
            </label>
            <br />
            <input type="radio" id="institute" value="institute" required />
            <label htmlFor="institute">Institute/Seminar</label>
            <br />

            <input type="radio" id="class" value="class" required />
            <label htmlFor="class">Class</label>
            <br />

            <input type="radio" id="retreat" value="retreat" required />
            <label htmlFor="retreat">Retreat</label>
            <br />

            <input type="radio" id="workshop" value="workshop" required />
            <label htmlFor="workshop">Workshop</label>
            <br />

            <input type="radio" id="other" value="other" required />
            <label htmlFor="other">Other</label>
          </p>

          <Text
            cols="41"
            id="ideadesc"
            label={'Describe your idea here'}
            maxLength="1000"
            onChange={this._onChangeInput}
            required
            rows="5"
            value={this.state.ideadesc}
          />

          <Text
            id="name"
            label="Contact Name:"
            maxLength="50"
            onChange={this._onChangeInput}
            size={40}
            type="text"
            value={this.state.name}
          />

          <Text
            id="email"
            label="Email:"
            maxLength="50"
            onChange={this._onChangeInput}
            size={40}
            type="email"
            value={this.state.email}
          />

          <Text
            id="phone"
            label="Contact Telephone:"
            maxLength="50"
            onChange={this._onChangeInput}
            size={40}
            type="tel"
            value={this.state.phone}
          />
          <br />

          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }
}

export default IdeaForm;
