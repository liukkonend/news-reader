import moment from 'moment';

function encodeQueryString(obj) {
    return Object.keys(obj)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
                .join('&')
}

function getImage(m, field, value) {
    const image = m.multimedia.find(e => e[field] === value);
    if (image) {
        return image.url;
    }

    return null;
}

const topStoriesBaseUrl = 'https://api.nytimes.com/svc/topstories/v2/';
const searchBaseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchTopStories = (section) => {
    const params = {
        'api-key': apiKey
    };

    return fetch(`${topStoriesBaseUrl}${section}.json?${encodeQueryString(params)}`, {
        method: 'GET'
    })
    .then(resp => resp.json())
    .then(resp => resp.results)
    .then(results => {
        return results.map(s => ({ 
            title: s.title, 
            author: s.byline, 
            time: s.published_date, 
            body: s.abstract, 
            url: s.url,
            img: getImage(s, 'format', 'thumbLarge')
        }));
    });
};

export const searchStories = (q, page = 1) => {
    const params = {
        'api-key': apiKey,
        q,
        fl: 'byline,pub_date,headline,web_url,snippet,multimedia',
        begin_date: moment().subtract(7,'d').format('YYYYMMDD'),
        end_date: moment().format('YYYYMMDD'),
        page: parseInt(page,10) - 1
    };

    return fetch(`${searchBaseUrl}?${encodeQueryString(params)}`, {
        method: 'GET'
    })
    .then(resp => resp.json())
    .then(resp => resp.response)
    .then(resp => {
        const { docs, meta } = resp;
        const stories = docs.map(s => {
            const img = getImage(s, 'subtype', 'articleInline');
            return { 
                title: s.headline.main,
                author: s.byline.original, 
                time: s.pub_date, 
                body: s.snippet, 
                url: s.web_url,
                img: img ? `https://static01.nyt.com/${img}` : undefined
            }; 
        });

        return { stories, meta };
    });
};