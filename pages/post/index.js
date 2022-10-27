import { getPost } from "../../script/localStorage.js";

const baseURL = 'https://m2-api-living.herokuapp.com/news/'

const renderPost = async () => {
    const postid = getPost()
    const divTitle = document.querySelector(".divTitle")
    const divPost = document.querySelector(".divPost")

    const data = await fetch (baseURL + postid, {
        method: 'GET'
    })
    const post = await data.json()
    //  console.log(post)

    divTitle.innerHTML = ''
    divTitle.insertAdjacentHTML('beforeend', `
        <h1> ${post.title} </h1>
        <p> ${post.description} </p>
    `)
    divPost.innerHTML = ''
    divPost.insertAdjacentHTML('beforeend', `
            <img src= ${post.image} alt="">
            <section class="secPost flex column gap16">
                <p> ${post.content} </p>
            </section>
    `)
}
renderPost()

const returnToHome = () => {
    const butHome = document.querySelector(".butHome")

    butHome.addEventListener('click', () => {
        //console.log('oi')
        window.location.replace('../../index.html')
    })
}
returnToHome()