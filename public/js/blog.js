// function for creating new comment 
const createNewComment = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#new-comment').value.trim();
    let blog_split = window.location.pathname;
    let blog_id = parseInt(blog_split.split('/')[2]); 
    console.log(blog_split, blog_id);

    if (text && blog_id) {
        const response = await fetch ('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ text, blog_id }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            document.location.reload();
        } else {
            alert('failed to add comment - please try again');
        }
    }
};

//Event Listeners 

document
    .querySelector('#submit-comment-btn')
    .addEventListener('click', createNewComment);