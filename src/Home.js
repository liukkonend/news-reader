import React, { Component } from 'react';
import StoryHeadline from './StoryHeadline';
import StoryListItem from './StoryListItem';

import { fetchTopStories } from './util/nytimes';

import './styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { stories: [], isLoading: false };
    }

    componentDidUpdate(prevProps) {
        const { match: { params : { section }} } = this.props;

        if (prevProps.match.params.section === section) {
            return;
        }

        this.setState({ isLoading: true });

        fetchTopStories(section)
            .then(stories => this.setState({ stories, isLoading: false }));
    }

    componentDidMount() {
        const { match: { params : { section }} } = this.props;
    
        this.setState({ isLoading: true });

        fetchTopStories(section)
            .then(stories => this.setState({ stories, isLoading: false }));
    }

    render() {
        const { stories, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const topStory = stories[0] || {};
        const secondStory = stories[1] || {};
        const thirdStory = stories[2] || {};
        const restStories = stories.slice(3);

        return (
            <div className="home">
                <h1>Top Stories</h1>

                <div className="top-stories">
                    <div>
                        <StoryHeadline 
                            title={topStory.title} 
                            url={topStory.url}
                            author={topStory.author} 
                            time={topStory.time} 
                            body={topStory.body}
                            img={topStory.img} />
                    </div>

                    <div>
                            <StoryHeadline 
                                title={secondStory.title} 
                                url={secondStory.url}
                                author={secondStory.author} 
                                time={secondStory.time}
                                img={secondStory.img} />

                            <StoryHeadline 
                                title={thirdStory.title} 
                                url={thirdStory.url}
                                author={thirdStory.author} 
                                time={thirdStory.time}
                                img={thirdStory.img} />
                    </div>

                    
                </div>

                <ul>
                    {restStories.map(s =>
                    <li key={s.url}>
                        <StoryListItem 
                            title={s.title}
                            url={s.url}
                            author={s.author} 
                            time={s.time}
                            body={s.body}
                            img={s.img} />
                    </li>
                    )}
                </ul>
                
            </div>
        );
    }
}

export default Home;
