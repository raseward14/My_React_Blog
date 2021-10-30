import React from 'react';
function UpvotesSection({ articleName, upvotes, setArticleInfo }) {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'POST'
        })
        const body = await result.json();
        console.log(body);
        setArticleInfo(body);
    };

    return (
        <div id='upvotes-section'>
            <button onClick={() => upvoteArticle()}>Upvote!</button>
            <p>This article has {upvotes} upvotes!</p> 
        </div>        
    );
};
export default UpvotesSection;