import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UnconnectedManageListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount = () => {
    this.getRecordsBySeller();
  };

  getRecordsBySeller = async () => {
    const data = new FormData();
    data.append('name', this.props.name);
    const response = await fetch('/getrecordsbyseller', {
      method: 'POST',
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    body = body.reverse();
    this.setState({ records: body });
  };

  handleRemoveRecord = async rid => {
    const confirm = window.confirm('Are you sure you want to remove this record?');
    if (!confirm) return;
    const data = new FormData();
    data.append('rid', rid);
    data.append('username', this.props.username);
    const response = await fetch('/removerecord', {
      method: 'POST',
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      return window.alert('Failed to delete record.');
    }
    this.getRecordsBySeller();
  };

  render = () => {
    if (!this.props.name) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>No seller found.</h2>
          </div>
        </>
      );
    }
    if (!this.props.name) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>Loading records to manage...</h2>
          </div>
        </>
      );
    }
    if (this.state.records.length === 0) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>No records available to manage.</h2>
          </div>
        </>
      );
    }
    return (
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>
            Manage listings <span className='lowercase'>for</span> '<span className='goldText'>{this.props.name}</span>'
          </h2>
          <div className='recordsWrapper'>
            {this.state.records.map(record => (
              <div className='recordWrapper' key={record.recordTitle + '-' + record._id}>
                <div className='recordImg'>
                  <Link to={'/records/' + record._id}>
                    <img className='recordCover' src={record.recordImgPath} />
                  </Link>
                  <div className='recordOverlay'>
                    <div className='recordOverlayText'>
                      <Link to={'/records/' + record._id}>
                        View More Details <br />
                        <img src='/imgs/icoPlus.png' />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='recordDetails'>
                  <p className='recordArtist'>{record.recordArtist}</p>
                  <p className='recordTitle'>
                    <Link to={'/records/' + record._id}>{record.recordTitle}</Link>
                  </p>
                  <p className='recordPrice'>${record.recordPrice}</p>
                </div>
                <div className='recordCTA'>
                  <button className='btnPrimary addToCrate' onClick={() => this.handleRemoveRecord(record._id)}>
                    Remove Record
                  </button>
                </div>
              </div>
            ))}
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

let ManageListings = connect(mapStateToProps)(UnconnectedManageListings);
export default ManageListings;
