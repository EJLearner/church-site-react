import React, {Component} from 'react';
import {Redirect} from 'react-router';

import _ from 'lodash';

import routePaths from '../../../routePaths';

import Button from '../Reusable/Button/Button';
import Text from '../Reusable/Text/Text';

import fieldValidators from '../RegistrationPages/fieldValidators';
import registrationUtils from '../RegistrationPages/registrationUtils';
import {post} from 'jquery';
import ErrorList from '../Common/ErrorList';
import PostSubmitStatusMessage from '../Common/PostSubmitStatusMessage';

class IdeaForm extends Component {
  constructor() {
    super();
    this.state = this._getFreshState();

    this._onChangeRadio = this._onChangeRadio.bind(this);
    this._onChangeTextInput = this._onChangeTextInput.bind(this);
    this._renderFormFields = this._renderFormFields.bind(this);
    this._setErrors = this._setErrors.bind(this);
    this._setPageState = this._setPageState.bind(this);
    this._submitData = this._submitData.bind(this);
  }

  _setPageState() {
    this.setState({showThanksMessage: true});
    setTimeout(() => {
      this.setState({redirect: true});
    }, 5000);
  }

  _getFreshState() {
    return {
      ideaType: '',
      ideaDesc: '',
      name: '',
      email: '',
      phone: '',

      errors: [],
      redirect: false
    };
  }

  _onChangeTextInput(value, id) {
    this.setState({[id]: value, postStatus: undefined});
  }

  _onChangeRadio(value, event) {
    this.setState({ideaType: value, postStatus: undefined});
  }

  _submitData() {
    const data = {
      ideaType: this.state.ideaType,
      ideaDesc: this.state.ideaDesc,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };

    post(
      '/ceIdeaFormProcess.php',
      data,
      responseError => {
        if (responseError.success) {
          this._postSubmitSuccess();
        } else {
          this.setState({
            postStatus: 'failure'
          });
        }
      },
      'json'
    ).fail(responseError => {
      this.setState({
        postStatus: 'failure',
        responseError
      });
    });
  }

  _setErrors() {
    const fieldInfo = [
      {
        fieldId: 'ideaType',
        label: 'Idea Type',
        fieldRules: [fieldValidators.isNotEmpty]
      },
      {
        fieldId: 'ideaDesc',
        label: 'Idea Description',
        fieldRules: [
          fieldValidators.isNotEmpty,
          fieldValidators.isAtLeastTwoCharacters
        ]
      },
      {
        fieldId: 'name',
        label: 'Name',
        fieldRules: [fieldValidators.isAtLeastTwoCharacters]
      },
      {
        fieldId: 'email',
        label: 'Email',
        fieldRules: [fieldValidators.isValidEmail]
      },
      {
        fieldId: 'phone',
        label: 'Phone Number',
        fieldRules: [fieldValidators.isPhoneNumber]
      }
    ];

    const errors = registrationUtils.getPageErrors(this.state, fieldInfo);
    if (!errors.length) {
      this._submitData();
    }

    this.setState({errors});
  }

  _postSubmitSuccess() {
    this._setPageState();
  }

  _renderFormFields() {
    return (
      <div>
        <p>
          <label htmlFor="institute">
            This idea is for:
            <span className="mandatory">*</span>
          </label>
          <br />

          <label>
            <input
              id="institute"
              name="idea"
              onChange={_.partial(this._onChangeRadio, 'institute')}
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
              onChange={_.partial(this._onChangeRadio, 'class')}
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
              onChange={_.partial(this._onChangeRadio, 'retreat')}
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
              onChange={_.partial(this._onChangeRadio, 'workshop')}
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
              onChange={_.partial(this._onChangeRadio, 'other')}
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
            id="ideaDesc"
            label="Describe your idea here"
            maxLength="1000"
            onChange={this._onChangeTextInput}
            required
            rows={5}
            size={50}
            textArea
            value={this.state.ideaDesc}
          />
        </div>

        <Text
          id="name"
          label="Contact Name:"
          maxLength="50"
          onChange={this._onChangeTextInput}
          size={40}
          type="text"
          value={this.state.name}
        />

        <Text
          id="email"
          label="Email:"
          maxLength="50"
          onChange={this._onChangeTextInput}
          size={40}
          type="email"
          value={this.state.email}
        />

        <Text
          id="phone"
          label="Contact Telephone:"
          maxLength="50"
          onChange={this._onChangeTextInput}
          size={40}
          type="tel"
          value={this.state.phone}
        />
        <br />

        <Button onClick={this._setErrors}>Submit</Button>
      </div>
    );
  }

  render() {
    const {
      errors,
      postStatus,
      redirect,
      showThanksMessage,
      responseError
    } = this.state;

    if (redirect) {
      return <Redirect push to={routePaths.CE_HOME} />;
    }

    const hasErrors = Boolean(errors.length);

    if (showThanksMessage) {
      return (
        <div className="registration-page">
          <h2>Thanks for submitting your idea!</h2>
          <p>
            You will be redirected to the home page in less than five seconds...
          </p>
        </div>
      );
    }

    return (
      <div className="registration-page">
        <h1>
          Tell Us What You <span>Think!</span>
        </h1>
        {hasErrors && <ErrorList errors={errors} />}
        {this._renderFormFields()}
        {Boolean(postStatus || hasErrors) && (
          <PostSubmitStatusMessage
            postStatus={postStatus}
            responseError={responseError}
          />
        )}
      </div>
    );
  }
}

export default IdeaForm;
