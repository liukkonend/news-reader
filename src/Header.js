import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles/Header.css';
import searchIcon from './search-icon.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    const { history } = this.props;

    e.preventDefault();

    history.push(`/search?q=${encodeURIComponent(this.state.value)}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <header className="header">
            <div className="header-left">&nbsp;</div>
            <h1 className="title">THE TIMES</h1>
            <div className="header-right">
                <div className="search-icon"><img src={searchIcon} alt="Search Icon" width="25"/></div>
                <input type="text" onChange={this.handleChange} value={this.state.value} placeholder="Search" />
            </div>
      </header>
      </form>
    );
  }
}

export default withRouter(Header);
