import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const PrevPage = ({ q, prevPage }) => {
    const Content = () => <span>&lt;&lt;</span>;

    if (prevPage > 0) {
        return (
            <Link to={{ pathname: '/search', search: queryString.stringify({ q, page: prevPage }) }}>
                <Content />
            </Link>
        );
    }

    return (
        <Content />
    );
};

const NextPage = ({ q, nextPage, hits, offset }) => {
    const Content = () => <span>&gt;&gt;</span>;

    if (hits - offset > 10) {
        return (
            <Link to={{ pathname: '/search', search: queryString.stringify({ q, page: nextPage }) }}>
                <Content />
            </Link>
        );
    }

    return (
        <Content />
    );
};

class Pagination extends Component {
    getAdjacentPageNumbers(page) {
        const parsedPage = parseInt(page, 10);
        if (!isNaN(parsedPage)) {
            return [Math.max(0, parsedPage - 1), parsedPage + 1];
        }

        return [0,2];
    }

    render() {
        const { q, page, hits, offset } = this.props;
        const [prevPage, nextPage] = this.getAdjacentPageNumbers(page);
        
        return (
            <div className="pagination">
                <PrevPage q={q} prevPage={prevPage} />
                &nbsp;...&nbsp;
                <NextPage q={q} nextPage={nextPage} hits={hits} offset={offset} />
            </div>
        );
    }
}

export default Pagination;
