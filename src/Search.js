import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { searchStories } from './util/nytimes';

import StoryListItem from './StoryListItem';
import Pagination from './Pagination';

import './styles/Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { stories: [], isLoading: false };
    }

    componentDidUpdate(prevProps) {
        const { location: { search } } = this.props;

        if (prevProps.location.search === search) {
            return;
        }

        this.setState({ isLoading: true });

        const { q, page = 1 } = queryString.parse(search);

        searchStories(q, page)
            .then(resp => this.setState({ ...resp, isLoading: false }));
    }

    componentDidMount() {
        const { location: { search } } = this.props;
    
        this.setState({ isLoading: true });

        const { q, page = 1 } = queryString.parse(search);

        searchStories(q, page)
            .then(resp => this.setState({ ...resp, isLoading: false }));
    }

    render() {
        const { stories = [], meta: { hits, offset } = {}, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (!stories.length) {
            return <p>No search results.</p>;
        }

        const { location: { search } } = this.props;
        const { q, page } = queryString.parse(search);

        return (
            <div className="search">
                <h3><Link to="/top/home">Home</Link> &gt; Search</h3>

                <ul>
                    {stories.map(s =>
                    <li key={s.url}>
                        <StoryListItem 
                            title={s.title}
                            author={s.author}
                            time={s.time}
                            url={s.url} 
                            body={s.body}
                            img={s.img} />
                    </li>
                    )}
                </ul>

                <Pagination q={q} page={page} hits={hits} offset={offset} />
            </div>
        );
    }
}

export default withRouter(Search);
