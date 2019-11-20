import React from 'react';
import './News.scss';
import NewsItem from "./NewsItem/NewsItem";


const News = () => {
    return (
        <div className='news'>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
        </div>
    )
}

export default News;