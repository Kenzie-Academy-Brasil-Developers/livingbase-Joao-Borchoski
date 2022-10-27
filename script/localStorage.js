function getPost () {
    const post = JSON.parse(localStorage.getItem('post')) || ''

    return post
}

function getFilter () {
    const filter = JSON.parse(localStorage.getItem('filter')) || ''

    return filter
}

export {
    getPost,
    getFilter,
}