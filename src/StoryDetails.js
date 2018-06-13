import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import FriendlyDate from './FriendlyDate';

import './styles/StoryDetails.css';

class StoryDetails extends Component {
  render() {
    const { title, url, author, time, img } = this.props.location.state;

    return (
            <div className="story-details">
                <h3><Link to="/top/home">Home</Link> &gt; Search</h3>

                <h1>{title}</h1>

                <div>
                    <span className="story-meta-author">{author}</span>{' '}
                    <FriendlyDate className="story-meta-time" dateString={time} />
                </div>

                <div className="story-content">
                    <div className="story-image"><img src={img} alt={title} /></div>
                    <div className="story-body"><iframe src={url} title={title} width="600" height="800" /></div>
                </div>
            </div>
    );
  }
}

export default withRouter(StoryDetails);
