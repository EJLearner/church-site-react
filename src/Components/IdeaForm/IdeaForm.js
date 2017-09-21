import React, {Component} from 'react';

class IdeaForm extends Component {
  render() {
    return (
      <div>
        <div id="leftcontent">
          <h1>
            Tell Us What You <span>Think!</span>
          </h1>
        </div>
        <div id="leftform">
          <p>
            <label htmlFor="institute">
              This idea is for:<span className="mandatory">*</span>
            </label>
            <br />
            <input
              type="radio"
              name="ideatype"
              id="institute"
              value="institute"
              required
            />
            <label htmlFor="institute">Institute/Seminar</label>
            <br />

            <input
              type="radio"
              name="ideatype"
              id="class"
              value="class"
              required
            />
            <label htmlFor="class">Class</label>
            <br />

            <input
              type="radio"
              name="ideatype"
              id="retreat"
              value="retreat"
              required
            />
            <label htmlFor="retreat">Retreat</label>
            <br />

            <input
              type="radio"
              name="ideatype"
              id="workshop"
              value="workshop"
              required
            />
            <label htmlFor="workshop">Workshop</label>
            <br />

            <input
              type="radio"
              name="ideatype"
              id="other"
              value="other"
              required
            />
            <label htmlFor="other">Other</label>
          </p>

          <p>
            <label htmlFor="ideadesc">
              Describe your idea here:<span className="mandatory">*</span>
            </label>
            <br />
            <textarea
              className="ideatextbox"
              name="ideadesc"
              id="ideadesc"
              rows="5"
              cols="41"
              maxLength="1000"
              required
            />
          </p>

          <p>
            <label htmlFor="name">Contact Name:</label>
            <br />
            <input
              type="text"
              className="smalltextbox"
              name="name"
              id="name"
              size="40"
              maxLength="50"
            />
          </p>

          <p>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              className="smalltextbox"
              name="email"
              id="email"
              size="40"
              maxLength="50"
            />
          </p>

          <p>
            <label htmlFor="phone">Contact Telephone:</label>
            <br />
            <input
              type="tel"
              className="smalltextbox"
              name="phone"
              id="phone"
              size="40"
              maxLength="50"
            />
          </p>

          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }
}

export default IdeaForm;
