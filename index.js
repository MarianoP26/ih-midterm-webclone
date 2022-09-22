let currentProjectNumber = window.location.search.split('?')[1];

let url = "https://jsonplaceholder.typicode.com";

let imageProject = document.querySelector(".prj-image");
let headingProject = document.querySelectorAll(".project-titlei");
let descProject = document.querySelectorAll(".project-description");

let projectContainer = document.querySelectorAll('.collection-item');
let otherProjects = document.querySelectorAll('.collection-item-otherproject');

let projectTitle = document.querySelector('.project-titlep');
let projectText = document.querySelector('.project-body');

 const fetchPosts = () => {
  let urlToFetch = currentProjectNumber ? `${url}/posts?_start=${currentProjectNumber}&_limit=3` : `${url}/posts?_start=0&_limit=3`;
  fetch(urlToFetch).then(res => res.json()).then(posts => {
    posts.forEach((post, index) => {
      headingProject[index].innerText = post.title;
      descProject[index].innerText = post.body;
    })
  }).catch(error => console.log(error));
}

const setProject = () => {
  if (currentProjectNumber) {
    imageProject.style.display = 'block';
    fetch(`${url}/posts/${currentProjectNumber}`).then(response => response.json()).then(post => {
      projectTitle.innerText = post.title;
      projectText.innerText = post.body;
    })
    .catch(error => console.log(error));
  } else {
    imageProject.style.display = 'none';
  }
}

const addHrefs = () => {

  let urlToFetch = currentProjectNumber ? `${url}/posts?_start=${currentProjectNumber}&_limit=3` : `${url}/posts?_start=0&_limit=3`;

  fetch(urlToFetch).then(res => res.json()).then(posts => {
    for(let i = 0; i < posts.length; i++) {
      if(projectContainer.length > 0) {
        projectContainer[i].setAttribute('href',`projects.html?${posts[i].id}`);
      }
      if(otherProjects.length > 0) {
        otherProjects[i].setAttribute('href',`projects.html?${posts[i].id}`);
      }
    }
  }).catch(error => console.log(error));
}





fetchPosts();
addHrefs();
setProject();



const menu = document.querySelector('.w-nav-button');
const menuLinks = document.querySelector('.navbar__menu');


const mobileMenu = () =>{
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
  console.log('hay');
}

const hideMobileMenu = () =>{
  const menuBars = document.querySelector('.is-active');
  if(window.innerWidth <= 768 && menuBars){
      menu.classList.toggle('is-active');
      menuLinks.classList.remove('active');
  }
}

menuLinks.addEventListener('click', hideMobileMenu);

menu.addEventListener('click', mobileMenu);

//Contact 

let form = document.querySelector('.email-form');
let postUrl = "http://localhost:8000/messages";

const postData = (event) => {
  event.preventDefault();

  let data = {name: document.querySelector("#name"), 
    email: document.querySelector('#name-2'),
    phone: document.querySelector('#name-3'),
    message: document.querySelector('#field')};
  
  let onSuccess = document.querySelector('.w-form-done');
  let onFail = document.querySelector('.w-form-fail');

  fetch(postUrl, {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)}
  ).then(results => results.json()).then(
    onSuccess.style.visibility = 'visible'
  ).catch(error => {
    onFail.style.visibility = 'visible';
    console.log(error)});
}

form.addEventListener('submit', postData);