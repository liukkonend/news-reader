import React from 'react';
import moment from 'moment';

export default ({ dateString, className }) => {
    const timeString = moment(dateString).format('h:mm A');
    return <span className={className}>{timeString} EST</span>;
};