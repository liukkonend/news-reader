import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FriendlyDate from './FriendlyDate';

import './styles/StoryHeadline.css';

class StoryHeadline extends Component {
  render() {
    const { title, author, time, body, img } = this.props;

    return (
            <div className="story-headline">
                <div className="story-meta">
                    <div>
                        <Link to={{ pathname: `/story/${encodeURIComponent(title)}`, state: this.props }}>
                            <h3>{title}</h3>
                        </Link>
                        <div>
                            <span className="story-meta-author">{author}</span>{' '}
                            <FriendlyDate className="story-meta-time" dateString={time} />
                        </div>
                    </div>
                    <div>
                        <img src={img} alt={title} />
                    </div>
                </div>
                <div className="story-body">{body}</div>
            </div>
    );
  }
}

export default StoryHeadline;
