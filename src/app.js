import axios from 'axios'

let pageResultArray = ''
let amountOnPage = 20
let prev = ''
let next = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
let current = ``

const card = document.getElementById('card')

let prevBtn = document.getElementById('prev')
let nextBtn = document.getElementById('next')
prevBtn.addEventListener('click', showPrev)
nextBtn.addEventListener('click', showNext)

let min = document.getElementById('min')
let plus = document.getElementById('plus')
min.addEventListener('click', subtract)
plus.addEventListener('click', add)

async function getPokemonPage(url) {
    try {
        current = `${url.substring(0, url.indexOf('&'))}&limit=${amountOnPage}`
        console.log(current)
        const {data} = await axios.get(current)
        pageResultArray = data.results
        prev = data.previous===null ? current: data.previous
        next = data.next===null ? current: data.next
        printPage()

    } catch (e) {
        console.log(e)
    }
}

showNext()

function showPrev() {

    getPokemonPage(prev)
}

function showNext() {
    getPokemonPage(next)
}

function printPage() {

    card.innerHTML = ''
    pageResultArray.map((pokemon) => printCard(pokemon.url)
    )

}

async function printCard(pokemonUrl) {
    let img=''
    try {
        const {data} = await axios.get(pokemonUrl)
        img = data.sprites.front_default
    } catch (e) {
        console.log(e)
    }
    card.innerHTML += `<img src=${img} alt="pokemon" width="100" height="100">`
}

function subtract() {
    if (amountOnPage > 1) amountOnPage--
    getPokemonPage(current)
}

function add() {
    if (amountOnPage < 20) amountOnPage++
    getPokemonPage(current)
}