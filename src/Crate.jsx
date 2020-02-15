import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UnconnectedCrate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRemoveRecord = async rid => {
    this.props.dispatch({ type: 'remove-from-crate', payload: rid });
  };

  handleToggleCrate = () => {
    this.props.dispatch({ type: 'toggle-crate' });
  };

  handleCheckout = () => {
    this.handleToggleCrate();
    this.props.history.push('/checkout');
  };

  render = () => {
    if (this.props.recordsInCrate.length === 0) {
      return (
        <>
          <div
            className={this.props.crateOpen ? 'crateOverlayWrapper crateOpen' : 'crateOverlayWrapper crateClosed'}
            onClick={this.handleToggleCrate}
          ></div>
          <div className={this.props.crateOpen ? 'crateOverlay showCrateOverlay' : 'crateOverlay hideCrateOverlay'}>
            <div className='crateItems'>
              <div className='crateClose'>
                <img
                  src='/imgs/icoClose.png'
                  className='icoClose'
                  onClick={this.handleToggleCrate}
                  title='Close Crate'
                />
              </div>
              <div className='crateEmpty'>Your Crate is Currently Empty</div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div
          className={this.props.crateOpen ? 'crateOverlayWrapper crateOpen' : 'crateOverlayWrapper crateClosed'}
          onClick={this.handleToggleCrate}
        ></div>
        <div className={this.props.crateOpen ? 'crateOverlay showCrateOverlay' : 'crateOverlay hideCrateOverlay'}>
          <div className='crateItems'>
            <div className='crateClose'>
              <img src='/imgs/icoClose.png' className='icoClose' onClick={this.handleToggleCrate} title='Close Crate' />
            </div>
            <div className='crateRecords'>
              {this.props.recordsInCrate.map(record => (
                <div className='crateRecord' key={record.recordTitle + '-' + record._id}>
                  <div className='crateRecordImg'>
                    <img className='recordCover' src={record.recordImgPath} />
                  </div>
                  <div className='crateRecordDetails'>
                    <div className='crateRecordContents'>
                      <p className='crateRecordArtist'>{record.recordArtist}</p>
                      <p className='recordTitle'>{record.recordTitle}</p>
                      <p className='crateRecordPrice'>${record.recordPrice}</p>
                    </div>
                    <div className='recordCTA'>
                      <button
                        className='btnPrimary btnRemoveRecord'
                        onClick={() => this.handleRemoveRecord(record._id)}
                      >
                        Remove Record
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='crateTotalWrapper'>
              <div className='crateTotalCopy'>Total:</div>
              <div className='crateTotalPrice'>
                $
                {Math.round(
                  (this.props.recordsInCrate.reduce((total, { recordPrice }) => total + Number(recordPrice), 0) +
                    Number.EPSILON) *
                    100
                ) / 100}
              </div>
            </div>
            <div className='recordCTA'>
              <button className='btnPrimary addToCrate' onClick={this.handleCheckout}>
                Checkout
              </button>
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
    menuOpen: state.menuOpen,
    crateOpen: state.crateOpen,
    recordsInCrate: state.recordsInCrate,
    crateCount: state.recordsInCrate.length
  };
};

let Crate = connect(mapStateToProps)(UnconnectedCrate);
export default withRouter(Crate);
