import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UnconnectedRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: undefined
    };
  }

  componentDidMount = () => {
    this.getRecordDetails();
  };

  handleAddToCrate = record => {
    this.props.dispatch({ type: 'add-to-crate', payload: record });
  };

  getRecordDetails = async () => {
    const data = new FormData();
    data.append('rid', this.props.rid);
    const response = await fetch('/getrecorddetails', {
      method: 'POST',
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ record: body.payload });
  };

  getClasses = rid => {
    if (this.props.recordsInCrate.some(record => record._id === rid)) return 'btnPrimary addToCrate disabled';
    return 'btnPrimary addToCrate';
  };

  getCopy = rid => {
    if (!this.props.recordsInCrate.length || !this.props.recordsInCrate.some(record => record._id === rid))
      return 'Add to Crate';
    return 'Record in Crate';
  };

  render = () => {
    if (!this.props.rid) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>No record found.</h2>
          </div>
        </>
      );
    }
    if (!this.state.record) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>Loading record details...</h2>
          </div>
        </>
      );
    }
    return (
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>
            Record Details <span className='lowercase'>for</span> '
            <span className='goldText'>{this.state.record.recordTitle}</span>'
          </h2>
          <div className='recordDetailsWrapper'>
            <div className='recordDetailsImageContainer'>
              <img className='recordDetailsImage' src={this.state.record.recordImgPath} />
            </div>
            <div className='recordDetailsContainer'>
              <div>
                <div className='recordDetailsArtist'>{this.state.record.recordArtist}</div>
                <div className='recordDetailsTitle'>{this.state.record.recordTitle}</div>
              </div>
              <div className='recordDetailsInfo'>
                <div className='recordDetailsInfoHeading'>Genre</div>
                <div className='recordDetailsInfoContent'>{this.state.record.recordGenre}</div>
                <div className='recordDetailsInfoHeading'>Format</div>
                <div className='recordDetailsInfoContent'>{this.state.record.recordFormat}</div>
                <div className='recordDetailsInfoHeading'>Speed</div>
                <div className='recordDetailsInfoContent'>{this.state.record.recordSpeed}</div>
                <div className='recordDetailsInfoHeading'>Description</div>

                <div className='recordDetailsInfoContent'>{this.state.record.recordDescription}</div>
              </div>
              <div className='recordDetailsCTA'>
                <div className='recordDetailsCTAInfoContainer'>
                  <div className='recordDetailsCTAInfo'>
                    <div className='recordDetailsInfoHeading'>Seller</div>
                    <div className='recordDetailsInfoContent'>
                      <Link to={'/seller/' + this.state.record.recordSoldBy}>{this.state.record.recordSoldBy}</Link>
                    </div>
                  </div>
                  <div className='recordDetailsCTAInfo'>
                    <div className='recordDetailsInfoHeading'>Condition</div>
                    <div className='recordDetailsInfoContent'>{this.state.record.recordCondition}</div>
                  </div>
                  <div className='recordDetailsCTAInfo'>
                    <div className='recordDetailsInfoHeading'>Price</div>
                    <div className='recordDetailsPrice'>${this.state.record.recordPrice}</div>
                  </div>
                </div>
                <div className='recordCTA'>
                  <button
                    className={this.getClasses(this.state.record._id)}
                    onClick={() => this.handleAddToCrate(this.state.record)}
                  >
                    {this.getCopy(this.state.record._id)}
                  </button>
                </div>
              </div>
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

let Record = connect(mapStateToProps)(UnconnectedRecord);
export default Record;
