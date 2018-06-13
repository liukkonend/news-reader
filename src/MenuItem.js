import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends Component {

  render() {
    const { item: { label, link }, location : { pathname, search }} = this.props;

    return (
        <li className={link === `${pathname}${search}` ? "selected" : undefined }>
            <Link to={link}>{label}</Link>
        </li>
    );
  }
}

export default MenuItem;
