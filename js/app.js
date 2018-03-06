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
    let output = " ";
    let personajeURL;

    let paintHTMLOne = dataFilms.forEach(movie => {
        let title = movie.title;
        //console.log(title);
        let id = movie.episode_id;
        //console.log(id);
        let characters = movie.characters;
        //console.log(characters);
        let listCast = " ";
        //let personajeURL;
        characters.forEach(person => {
            personajeURL = person;
            //console.log(personajeURL);
            listCast +=
            `<li>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">${person}</a>
            </li>`
        })

        output += `
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

    //
    //second petition
    $.ajax({
        url: personajeURL
    }).done(modalInformation);
}



//first ajax petition
$.ajax({
    url: "https://swapi.co/api/films/"
}).done(handleResponse);

//modal initialization
$(document).ready(function () {
    $('#modal1').modal();
});