import React, { useState } from 'react';
function AddCommentForm() {
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async({ articleName }) => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: commentText }),
            header: {
                'Content-Type': 'application/json',
            }
        })
    };

    return (
        <div id='add-comment-form'>
            <label>
                Name:
                <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
                Comment:
                <textarea rows='4' cols='50' value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            </label>
            <button>Add Comment</button>
        </div>
    )
};
export default AddCommentForm;