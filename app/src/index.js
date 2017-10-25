import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
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
    this.fetchResults = debounce(this.fetchResults.bind(this), 250);
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
    evt.persist();
    this.fetchResults(evt);
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
      this.setState({ results: [] });
    }
  }
  render() {
    const { value, isLoading, results = [], width } = this.state;
    const isMobile = width <= 500;
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
              {value &&
              results && (
                <Results data={results} query={value} isMobile={isMobile} />
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
            {value &&
            results && (
              <Results data={results} query={value} isMobile={isMobile} />
            )}
          </Select>
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
