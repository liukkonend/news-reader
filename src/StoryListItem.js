import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FriendlyDate from './FriendlyDate';

import './styles/StoryListItem.css';

class StoryListItem extends Component {
  render() {
    const { title, author, time, body, img } = this.props;

    return (
            <div className="story-list-item">
                <div>
                        {img && <img src={img} alt={title} />}
                </div>
                <div className="story-meta">
                    <div>
                        <Link to={{ pathname: `/story/${encodeURIComponent(title)}`, state: this.props }}>
                            <h3>{title}</h3>
                        </Link>
                        <div className="story-body">{body}</div>
                        <div>
                            <span className="story-meta-author">{author}</span>{' '}
                            <FriendlyDate className="story-meta-time" dateString={time} />
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}

export default StoryListItem;
