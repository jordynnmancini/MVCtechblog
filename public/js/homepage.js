// show & hide form to create a blog 
function openForm() {
    document
        .querySelector('#form-container')
        .classList.remove('hidden');
};

function closeForm() {
    document
        .querySelector('#form-container')
        .classList.add('hidden');
};

// create a new blog 
const createNewBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input-home').value.trim(); 
    const text = document.querySelector('#text-input-home').value.trim();

    
    if (title && text) {
        const response = await fetch('/api/blog', {
          method: 'POST',
          body: JSON.stringify({ title, text }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.reload(); 
        } else {
          alert('Failed to create blog post');
        }
    }
};


// Event Listeners 
document
    .querySelector('#new-blog-btn')
    .addEventListener('click', openForm);

document
    .querySelector('#close-form-btn')
    .addEventListener('click', closeForm);

document
    .querySelector('#submit-blog-home')
    .addEventListener('click', createNewBlog);


