import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

class UnconnectedSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      searchTerms: '',
      searchResults: []
    };
  }

  componentDidMount = () => {
    this.getSearchResults();
  };

  // componentDidUpdate = () => {
  //   this.getSearchResults();
  // };

  getSearchResults = async () => {
    console.log('getting search results');
    const response = await fetch('/getrecords');
    let body = await response.text();
    body = JSON.parse(body);
    body = body.reverse();
    const searchQuery = queryString.parse(this.props.location.search);
    const searchTerms = searchQuery.query.toLowerCase();
    const searchResults = body.filter(record => {
      if (
        record.recordArtist.toLowerCase().includes(searchTerms) ||
        record.recordTitle.toLowerCase().includes(searchTerms) ||
        record.recordDescription.toLowerCase().includes(searchTerms)
      ) {
        return record;
      }
    });
    console.log('search results:', searchResults);
    this.setState({ ...this.state, records: body, searchTerms: searchTerms, searchResults: searchResults });
  };

  render = () => {
    if (this.state.searchResults.length === 0) {
      return (
        <>
          <div className='bodyWrapper'>
            <h2 className='h2-heading'>
              No Results Found <span className='lowercase'>for</span> '
              <span className='goldText'>{this.state.searchTerms}</span>'
            </h2>
          </div>
        </>
      );
    }
    return (
      <>
        <div className='bodyWrapper'>
          <h2 className='h2-heading'>
            Search Results <span className='lowercase'>for</span> '
            <span className='goldText'>{this.state.searchTerms}</span>'
          </h2>
          <div className='recordsWrapper'>
            {this.state.searchResults.map(record => (
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
                  <button className='btnPrimary addToCrate' onClick={() => this.handleAddToCrate(record)}>
                    Add to Crate
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

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
