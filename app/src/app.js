import React, { Component } from 'react';
import logo from './marvel-logo.png';
import debounce from 'just-debounce-it';
import { fetchCharactersWithName } from './helpers';
import Select from './select';
import Results from './results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLoading: false,
      results: [],
      width: window.innerWidth
    };
    // debounce so that fetchResults are not called on every input change
    this.debouncedFetchResults = debounce(this.fetchResults.bind(this), 250);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }
  componentWillMount() {
    window.addEventListener(
      'resize',
      debounce(this.handleWindowSizeChange, 500)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

  handleChange(evt) {
    this.setState({ value: evt.target.value });
    // persisting event to send to debounced fetchResults
    evt.persist();
    this.debouncedFetchResults(evt);
  }
  handleResultsClick(name) {
    console.log(name);
  }
  fetchResults(evt) {
    const { value } = evt.target;

    if (value && value.length > 0) {
      this.setState({ isLoading: true });
      fetchCharactersWithName(value).then(results =>
        this.setState({
          results: results,
          isLoading: false
        })
      );
    } else {
      const { results } = this.state;
      if (results.length > 0) this.setState({ results: [] });
    }
  }
  render() {
    const { value, isLoading, results = [], width } = this.state,
      isMobile = width <= 500,
      // flag to decide whether to show results or not
      displayResults = value && results && !isLoading;
    return (
      <div>
        <header className="header">
          <div className="marvel-logo">
            <img alt="Marvel Logo" src={logo} />
          </div>
          {!isMobile && (
            <Select
              value={value}
              isLoading={isLoading}
              handleChange={evt => this.handleChange(evt)}
            >
              {displayResults && (
                <Results
                  data={results}
                  query={value}
                  isMobile={isMobile}
                  handleResultsClick={name => handleResultsClick(name)}
                />
              )}
            </Select>
          )}
        </header>
        {isMobile && (
          <Select
            value={value}
            isLoading={isLoading}
            handleChange={evt => this.handleChange(evt)}
          >
            {displayResults && (
              <Results
                data={results}
                query={value}
                isMobile={isMobile}
                handleResultsClick={name => handleResultsClick(name)}
              />
            )}
          </Select>
        )}
      </div>
    );
  }
}

export default App;
