import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UnconnectedSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount = () => {
    this.getRecordsBySeller();
  };

  handleAddToCrate = record => {
    console.log('adding record to crate:', record);
    this.props.dispatch({ type: 'add-to-crate', payload: record });
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
            <h2 className='h2-heading'>Loading records by seller...</h2>
          </div>
        </>
      );
    }
    if (!this.state.records.length === 0) {
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>No records available from this seller.</h2>
        </div>
      </>;
    }
    return (
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>
            Records For Sale <span className='lowercase'>by</span> '<span className='goldText'>{this.props.name}</span>'
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
                  <button className={this.getClasses(record._id)} onClick={() => this.handleAddToCrate(record)}>
                    {this.getCopy(record._id)}
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

let Seller = connect(mapStateToProps)(UnconnectedSeller);
export default Seller;
