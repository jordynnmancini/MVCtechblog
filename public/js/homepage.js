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

// post request for a new blog 


// Event Listeners 
document
    .querySelector('#new-blog-btn')
    .addEventListener('click', openForm);

document
    .querySelector('#close-form-btn')
    .addEventListener('click', closeForm);


