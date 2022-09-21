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