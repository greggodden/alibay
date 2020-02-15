import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class UnconnectedSellARecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordArtistInput: '',
      recordTitleInput: '',
      recordGenreInput: '',
      recordFormatInput: '',
      recordSpeedInput: '',
      recordConditionInput: '',
      recordDescriptionInput: '',
      recordPriceInput: '',
      recordCoverInput: '',
      redirectToListings: false
    };
  }

  handleRecordArtistChange = event => {
    this.setState({ recordArtistInput: event.target.value });
  };

  handleRecordTitleChange = event => {
    this.setState({ recordTitleInput: event.target.value });
  };

  handleRecordGenreChange = event => {
    this.setState({ recordGenreInput: event.target.value });
  };

  handleRecordFormatChange = event => {
    this.setState({ recordFormatInput: event.target.value });
  };

  handleRecordSpeedChange = event => {
    this.setState({ recordSpeedInput: event.target.value });
  };

  handleRecordConditionChange = event => {
    this.setState({ recordConditionInput: event.target.value });
  };

  handleRecordDescriptionChange = event => {
    this.setState({ recordDescriptionInput: event.target.value });
  };

  handleRecordPriceChange = event => {
    this.setState({ recordPriceInput: event.target.value });
  };

  handleRecordCoverChange = event => {
    this.setState({ recordCoverInput: event.target.files[0] });
  };

  handleRecordSubmit = async event => {
    event.preventDefault();
    if (!this.state.recordArtistInput) {
      return window.alert('Please provide an Artist/Group Name');
    }
    if (!this.state.recordTitleInput) {
      return window.alert('Please provide a Record Title');
    }
    if (!this.state.recordGenreInput) {
      return window.alert('Please select a Genre');
    }
    if (!this.state.recordFormatInput) {
      return window.alert('Please select a Format');
    }
    if (!this.state.recordSpeedInput) {
      return window.alert('Please select a Speed');
    }
    if (!this.state.recordConditionInput) {
      return window.alert('Please select a Condition');
    }
    if (!this.state.recordDescriptionInput) {
      return window.alert('Please provide a Description');
    }
    if (!this.state.recordPriceInput) {
      return window.alert('Please provide a Price');
    }
    if (!this.state.recordCoverInput) {
      return window.alert('Please upload a Record Image');
    }
    const username = this.props.username;
    const data = new FormData();
    data.append('username', username);
    data.append('recordArtist', this.state.recordArtistInput);
    data.append('recordTitle', this.state.recordTitleInput);
    data.append('recordGenre', this.state.recordGenreInput);
    data.append('recordFormat', this.state.recordFormatInput);
    data.append('recordSpeed', this.state.recordSpeedInput);
    data.append('recordCondition', this.state.recordConditionInput);
    data.append('recordDescription', this.state.recordDescriptionInput);
    data.append('recordPrice', this.state.recordPriceInput);
    data.append('recordCover', this.state.recordCoverInput);
    const response = await fetch('/sellarecord', {
      method: 'POST',
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      console.log('failed to sell record');
      window.alert(body.message);
      this.setState({
        username: '',
        recordArtist: '',
        recordTitle: '',
        recordGenre: '',
        recordFormat: '',
        recordSpeed: '',
        recordCondition: '',
        recordDescription: '',
        recordPrice: '',
        recordCover: ''
      });
      return;
    }
    console.log('record listed for sale successfully');
    window.alert(
      'Congratulations! ' +
        this.state.recordTitleInput +
        ' by ' +
        this.state.recordArtistInput +
        ' has been listed on 33 1/3 Records for $' +
        this.state.recordPriceInput
    );
    this.props.history.push('/');
  };

  render = () => {
    return (
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>Sell A Record</h2>
          <div className='formWrapper'>
            <div className='formImage'></div>
            <div className='formSellARecord'>
              <form onSubmit={this.handleRecordSubmit} id='sellarecord' encType='multipart/form-data'>
                <div className='formContents'>
                  <input
                    className='formInput'
                    type='text'
                    onChange={this.handleRecordArtistChange}
                    placeholder='Artist/Group Name'
                    value={this.state.recordArtistInput}
                    required
                  />
                  <input
                    className='formInput'
                    type='text'
                    onChange={this.handleRecordTitleChange}
                    placeholder='Record Title'
                    value={this.state.recordTitleInput}
                    required
                  />
                  <select
                    className='formInput'
                    name='recordGenre'
                    form='sellarecord'
                    onChange={this.handleRecordGenreChange}
                    value={this.state.recordGenreInput}
                    required
                  >
                    <option value='' selected disabled hidden>
                      Genre
                    </option>
                    <option value='rock-and-roll'>Rock &amp; Roll</option>
                    <option value='heavy-metal'>Heavy Metal</option>
                    <option value='alternative'>Alternative</option>
                    <option value='punk'>Punk</option>
                    <option value='indie'>Indie</option>
                    <option value='country'>Country</option>
                    <option value='rap'>Rap/Hip-Hop</option>
                    <option value='randb'>R&amp;B</option>
                    <option value='classical'>Classical</option>
                    <option value='other'>Other</option>
                  </select>
                  <select
                    className='formInput'
                    name='recordFormat'
                    form='sellarecord'
                    onChange={this.handleRecordFormatChange}
                    value={this.state.recordFormInput}
                    required
                  >
                    <option value='' selected disabled hidden>
                      Format
                    </option>
                    <option value='lp'>LP</option>
                    <option value='ep'>EP</option>
                    <option value='single'>Single</option>
                  </select>
                  <select
                    className='formInput'
                    name='recordSpeed'
                    form='sellarecord'
                    onChange={this.handleRecordSpeedChange}
                    value={this.state.recordSpeedInput}
                    required
                  >
                    <option value='' selected disabled hidden>
                      Speed
                    </option>
                    <option value='3313'>33 1/3 RPM</option>
                    <option value='45'>45 RPM</option>
                    <option value='78'>78 RPM</option>
                  </select>
                  <select
                    className='formInput'
                    name='recordCondition'
                    form='sellarecord'
                    onChange={this.handleRecordConditionChange}
                    value={this.state.recordConditionInput}
                    required
                  >
                    <option value='' selected disabled hidden>
                      Condition
                    </option>
                    <option value='mint'>Mint</option>
                    <option value='near-mint'>Near Mint</option>
                    <option value='very-good'>Very Good</option>
                    <option value='good'>Good</option>
                    <option value='poor'>Poor</option>
                  </select>
                  <textarea
                    className='formInput'
                    onChange={this.handleRecordDescriptionChange}
                    placeholder='Description'
                    value={this.state.recordDescriptionInput}
                    rows='4'
                    columns='50'
                    required
                  />
                  <input
                    className='formInput'
                    type='text'
                    onChange={this.handleRecordPriceChange}
                    placeholder='Price'
                    value={this.state.recordPriceInput}
                    required
                  />
                  <label for='recordCover' className='formRecordLabel'>
                    Cover Art
                    <input
                      className='formInput'
                      type='file'
                      id='recordCover'
                      name='recordCover'
                      accept='image/*'
                      onChange={this.handleRecordCoverChange}
                      required
                    />
                  </label>
                </div>
                <button className='btnPrimary formSubmit' type='submit' value='sell record'>
                  Sell Record
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => {
  return {
    username: state.username,
    loggedIn: state.loggedIn,
    recordsInCrate: state.recordsInCrate,
    crateCount: state.recordsInCrate.length
  };
};

let SellARecord = connect(mapStateToProps)(UnconnectedSellARecord);
export default SellARecord;
