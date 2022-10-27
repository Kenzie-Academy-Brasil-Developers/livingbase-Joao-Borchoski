const baseURL = 'https://m2-api-living.herokuapp.com/news'

import { getPost, getFilter } from "../../script/localStorage.js"

let page = 0

const renderCard = async (currentPage) => {
    const cardsMain = document.getElementById("cardsMain")
    //cardsMain.innerHTML = ''

    const data = await fetch(baseURL + '?page=' + page, {
        method: 'GET'
    })
    const datajson = await data.json()
    //console.log(datajson)
    
    
    datajson.news.forEach((element) => {
        cardsMain.insertAdjacentHTML('beforeend', `
        <li class="card flex column gap16">
            <img src=${element.image} alt="">
            <h2>${element.title}</h2>
            <p> ${element.description} </p>
            <button id=${element.id} class="butPost">Acessar conteúdo</button>
        </li>
        `)
    });

    const butPost = document.querySelectorAll(".butPost")
    const buts = [...butPost]
    //console.log(buts)
    buts.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.id
            localStorage.setItem("post", JSON.stringify(id))
            //console.log(getPost())
            window.location.replace('./pages/post/index.html')
        })
    })

    const butsSections = document.querySelectorAll(".butSection")
    const butsSectionsArr = [...butsSections]

    butsSectionsArr.forEach(element => {
        element.addEventListener('click', async () => {
            cardsMain.innerHTML = ''
            const text = element.innerHTML
            if(text === 'Todos'){
                localStorage.setItem('filter', JSON.stringify(text))

                cardsMain.innerHTML = ''
                await renderCard()
            }else{
                localStorage.setItem('filter', JSON.stringify(text))

                cardsMain.innerHTML = ''
                await renderFiltered(getFilter())
            }
        })
    })
}
renderCard()


const renderFiltered = async (filter) => {
    const cardsMain = document.getElementById("cardsMain")
    cardsMain.innerHTML = ''
    let err = 0

    const data = await fetch(baseURL, {
        method: 'GET'
    })
    const datajson = await data.json()
    //console.log(datajson)
    datajson.news.forEach(element => {
        if(element.category === filter){
            cardsMain.insertAdjacentHTML('beforeend', `
                <li class="card flex column gap16">
                    <img src=${element.image} alt="">
                    <h2>${element.title}</h2>
                    <p> ${element.description} </p>
                    <button id=${element.id} class="butPost">Acessar conteúdo</button>
                </li>
            `)
        }
    })

    const butPost = document.querySelectorAll(".butPost")
    const buts = [...butPost]
    //console.log(buts)
    buts.forEach(element => {
        element.addEventListener("click", () => {
            const id = element.id
            localStorage.setItem("post", JSON.stringify(id))
            //console.log(getPost())
            window.location.replace('./pages/post/index.html')
        })
    })
}

const observer = () => {
    const divObservadora = document.querySelector(".divObservadora")
    const observer = new IntersectionObserver((entries) => {
        if(entries.some((entry) => entry.isIntersecting)){
            if(!getFilter() || getFilter() === 'Todos'){
                page ++
                renderCard(page)
            }
        }
    })
    
    observer.observe(divObservadora)
}
observer()
