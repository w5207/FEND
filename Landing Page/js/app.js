/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Define Global Variables
let sectionList = document.querySelectorAll('[data-nav]');

let navList = document.getElementById('navbar__list');

// Build the nav
for (const section of sectionList) {
  let nav = document.createElement('a');
  nav.innerHTML = section.id.charAt(0).toUpperCase()+section.id.slice(1);
  nav.href = '#'+section.id;
  navList.appendChild(nav);
}

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function() {
  for (let i = 0; i < sectionList.length; i++) {
    // 5 here is an error range I set
    if (window.scrollY >= sectionList[i].offsetTop-5 && window.scrollY < sectionList[i].offsetTop+sectionList[i].offsetHeight-5) {
      sectionList[i].classList.add('active');
      navList.children[i].classList.add('active');
    } else {
      sectionList[i].classList.remove('active');
      navList.children[i].classList.remove('active');
    }
  }
})

