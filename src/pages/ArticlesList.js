import React from 'react';
import articleContent from './article-content';
import { Link } from 'react-router-dom'

function ArticlesList() {
    return (
        <>
        <h1>Articles List</h1>
        {articleContent.map((article, key) => (
            <Link key={key} to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
            </Link>
        ))}
        </>
    );
};

export default ArticlesList;