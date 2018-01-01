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
      <div id="ce-page">
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

            <label>
              <input
                id="institute"
                name="idea"
                required
                type="radio"
                value="institute"
              />
              Institute/Seminar
            </label>
            <br />

            <label>
              <input
                id="class"
                name="idea"
                required
                type="radio"
                value="class"
              />
              Class
            </label>
            <br />

            <label>
              <input
                id="retreat"
                name="idea"
                required
                type="radio"
                value="retreat"
              />
              Retreat
            </label>
            <br />

            <label>
              <input
                id="workshop"
                name="idea"
                required
                type="radio"
                value="workshop"
              />
              Workshop
            </label>
            <br />

            <label>
              <input
                id="other"
                name="idea"
                required
                type="radio"
                value="other"
              />
              Other
            </label>
          </p>

          <div>
            <Text
              cols="41"
              id="ideadesc"
              label="Describe your idea here"
              maxLength="1000"
              onChange={this._onChangeInput}
              required
              rows={5}
              size={50}
              textArea
              value={this.state.ideadesc}
            />
          </div>

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
