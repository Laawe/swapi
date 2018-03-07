//html
let container = document.getElementById("container");

//function second request
function modalInformation(artist){
    //console.log(artist);
    let name = document.getElementById("name");
    let height = document.getElementById("height");
    let mass = document.getElementById("mass");
    let hair = document.getElementById("hair");
    let skin = document.getElementById("skin");

    name.innerText = artist.name;
    height.innerText = artist.height;
    mass.innerText = artist.mass;
    hair.innerText = artist.hair_color;
    skin.innerText= artist.skin_color;

}


//function first request
function handleResponse(films) {
    let dataFilms = films.results;
    let output = " "; //template general de las películas
    let listCast = " "; //template donde va cada uno de los url(con dataset)
    let paintHTMLOne = dataFilms.forEach(movie => {
        let title = movie.title;
        let id = movie.episode_id;
        let characters = movie.characters;
        
        characters.forEach(person => {
            listCast +=
            `
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">
            <li class="cast-list" data-url="${person}">${person}</li>
            </a>
            `
        })

        output += `<div class="col s12 m6 offset-m4" data-url="">
        <div class="col s12 m6 offset-m4">Name: ${title}</div>
        <div class="col s12 m6 offset-m4">Episode ID: ${id}</div>
        <br>
        <div class="col s12 m6 offset-m4">
        <ul>${listCast}</ul>
        </div>
        `
    })
    let structure = document.createElement("div");
    structure.classList.add("col");
    structure.classList.add("canvas")
    structure.innerHTML = output;
    container.appendChild(structure);
    //new
    let htmlCollection = document.getElementsByClassName("cast-list");
    eventList(htmlCollection);
    //
}

const eventList = (htmlCollection) => { //n
    //console.log(htmlCollection);
    let listCharacters = Array.from(htmlCollection);
    //console.log(listCharacters);
    listCharacters.forEach(li =>{
        li.addEventListener("click", dataCast);
    })
}

const dataCast = (e) => { //n
    e.preventDefault;
    let url = e.target.dataset.url;
    console.log(url);
    //second petition
    $.ajax({
        url: url
    }).done(modalInformation);
}

//first ajax petition
$.ajax({
    url: "https://swapi.co/api/films/"
}).done(handleResponse);

//modal initialization
$('.modal').modal();
