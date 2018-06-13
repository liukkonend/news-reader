import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './styles/Nav.css';
import MenuItem from './MenuItem';

const menuItems = [
    { id: 1, label: "Home", link: "/top/home" },
    { id: 2, label: "World", link: "/top/world" },
    { id: 3, label: "U.S.", link: "/top/national" },
    { id: 4, label: "Politics", link: "/top/politics" },
    { id: 5, label: "N.Y.", link: "/top/nyregion" },
    { id: 6, label: "More", link: "/?more=1" }
];

class Nav extends Component {
  render() {
    const { props } = this; 
    const MenuItemWithRouter = withRouter(props => <MenuItem {...props}/>);

    return (
        <ul className="nav">
            {menuItems.map(mu => <MenuItemWithRouter key={mu.id} {...props} item={mu}/>)}
        </ul>
    );
  }
}

export default Nav;
